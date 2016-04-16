import Plugin from '../src';
import fs from 'fs';
import {parse, transform, traverse, types as t} from 'babel-core';


function load (basename) {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  return fs.readFileSync(filename, 'utf8');
}

function collectPositions (ast: Object): Object {
  const collected = {};
  traverse(ast, {
    enter (path) {
      const node = path.node;
      if (path.isFunction()) {
        if(node.loc) {
          collected[JSON.stringify(node.loc)] = extractPath(path.scope);
        }
      }
    }
  });
  return collected;
}

function countHoisted (oldAst, newAst) {
  const oldPositions = collectPositions(oldAst);
  const newPositions = collectPositions(newAst);
  let total = 0;
  const keys = Object.keys(oldPositions);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if(!newPositions[key]) {
      throw new Error('some missed function');
    }
    if (oldPositions[key] !== newPositions[key]) {
      total++;
    }
  }
  return total;
}

function runTest (basename, numberToRemove, expectedResult) {
  const source = load(basename);
  const transformedNaked = transform(
    source,
    {
      presets: ["es2015"],
      plugins: [
        "transform-flow-strip-types",
        "syntax-async-functions",
        "transform-regenerator"
      ]
    }
  );
  //console.log(transformedNaked.code);
  const transformedWithPlugin = transform(
    source,
    {
      presets: ["es2015"],
      plugins: [
        Plugin,
        "transform-flow-strip-types",
        "syntax-async-functions",
        "transform-regenerator"
      ]
    });
  //console.log(transformedWithPlugin.code);
  const diff = countHoisted(transformedNaked.ast, transformedWithPlugin.ast);
  diff.should.equal(numberToRemove);
  if (expectedResult) {
    const context = {
      exports: {}
    };
    const loaded = new Function('module', 'exports', transformedWithPlugin.code);
    loaded(context, context.exports);
    const result = typeof context.exports.default === 'function' ? context.exports.default() : context.exports.default;
    result.should.eql(expectedResult);
  }
}

function eliminate (basename, numberToRemove, result) {
  it(`should eliminate ${numberToRemove} closure(s) from "${basename}"`, function () {
    runTest(basename, numberToRemove, result);
  });
}

eliminate.only = function (basename: string, numberToRemove: number, result) {
  it.only(`should eliminate ${numberToRemove} closure(s) from "${basename}"`, function () {
    try {
      runTest(basename, numberToRemove, result);
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
  eliminate("class-complex", 3);
  eliminate("extended-class-from-outer-parent", 2, [["foo", String.prototype.indexOf], ["bar", String.prototype.indexOf]]);
  eliminate("extended-class-from-known-class", 2, [["base", "foo"], ["base", "bar"]]);
  eliminate("generator", 1, ["foo", 1, 2, 3]);
  eliminate("async", 1, true);
  eliminate("create-class", 1);
});

