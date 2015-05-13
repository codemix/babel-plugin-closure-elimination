import Plugin from '../src';
import fs from 'fs';
import {parse, transform, traverse, types as t} from 'babel';


function load (basename: string): string {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  return fs.readFileSync(filename, 'utf8');
}

function collectPositions (ast: Object): Object {
  const collected = {};
  traverse(ast, {
    enter (node: Object, parent: Object) {
      if (this.isFunction()) {
        collected[JSON.stringify(node.loc)] = extractPath(this.scope);
      }
    }
  });
  return collected;
}

function countHoisted (oldAst: Object, newAst: Object): number {
  const oldPositions = collectPositions(oldAst);
  const newPositions = collectPositions(newAst);
  let total = 0;
  const keys = Object.keys(oldPositions);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (oldPositions[key] !== newPositions[key]) {
      total++;
    }
  }
  return total;
}

function runTest (basename: string, numberToRemove: number): void {
  const source = load(basename);
  const transformedNaked = transform(source, {stage: 0});
  //console.log(transformedNaked.code);
  const transformedWithPlugin = transform(source, {stage: 0, plugins: [Plugin]});
  //console.log(transformedWithPlugin.code);
  const diff = countHoisted(transformedNaked.ast, transformedWithPlugin.ast);
  diff.should.equal(numberToRemove);
}

function eliminate (basename: string, numberToRemove: number): void {
  it(`should eliminate ${numberToRemove} closure(s) from "${basename}"`, function () {
    runTest(basename, numberToRemove);
  });
}

eliminate.only = function (basename: string, numberToRemove: number): void {
  it.only(`should eliminate ${numberToRemove} closure(s) from "${basename}"`, function () {
    try {
      runTest(basename, numberToRemove);
    }
    catch (e) {
      if (e.name !== 'AssertionError') {
        console.error(e.stack);
      }
      throw e;
    }
  });
};

function extractPath (scope) {
  const parts = [];
  do {
    parts.unshift(scope.block.type);
  }
  while (scope = scope.parent);
  return parts.join(' ');
}

describe('Closure Elimination', function () {
  eliminate("simple", 1);
  eliminate("twice", 2);
  eliminate("complex", 14);
  eliminate("inner-1", 2);
  eliminate("no-hoist", 0);
  eliminate("inner-2", 3);
  eliminate("nope", 0);
  eliminate("arrow-this", 1);
  eliminate("arrow-this-nested", 2);
  eliminate("class", 1);
  eliminate("declaration", 2);
  eliminate("shadow-declaration", 2);
  eliminate("iife", 0);
  eliminate("class-compiled", 3);
  eliminate("class-complex", 2);
});

