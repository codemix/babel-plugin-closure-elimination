import 'babel-polyfill';
/**
 * # Closure Eliminator
 */

const $boundArrowFunction = Symbol('boundArrowFunction');
const $usedEval = Symbol('usedEval');

export default function build(babel: Object): Object {
  const {types: t} = babel;

  return {
    visitor: {
      Function: {
        exit (path) {
          const {node} = path;
          if (path.node._hoisted) {
            return;
          }
          if (path.isClassMethod() || path.isObjectMethod() || node[$boundArrowFunction] || node[$usedEval]) {
            return;
          }
          if (path.findParent(({node}) => node._generated || node._compact)) {
            path.skip();
            return;
          }
          const bestParentScope = getHighestCompatibleHoistedScope(path);
          if (bestParentScope) {
            const attachPath = getAttachmentPosition(bestParentScope.path, path);
            if (attachPath) {
              // _logAllProgram(path, 'before');// debug
              moveToNewPosition(path, attachPath);
              // _logAllProgram(path, 'after');// debug
            }
          }
        }
      },
      ThisExpression: {
        enter(path) {
          var parentFunctions = path.getAncestry()
              .filter(path=>path.isFunction()),
            nearestNoArrowFunction = parentFunctions
              .findIndex(path => path.type !== 'ArrowFunctionExpression');
          parentFunctions.slice(0, nearestNoArrowFunction)
            .forEach(parentArrow => {
              parentArrow.node[$boundArrowFunction] = true;
            });
        }
      },
      Identifier: {
        enter(path) {
          if (path.node.name === 'eval' && path.parentPath.type === 'CallExpression') {
            path.getAncestry()
              .filter(path=>path.isFunction())
              .forEach(parentArrow => {
                parentArrow.node[$usedEval] = true;
              });
          }
        }
      }
    }
  };

  function getHighestCompatibleHoistedScope(path) {
    const scope = getNearestScopeWithLocalUsedVars(path, path.scope.getProgramParent().path.node.sourceType !== 'module');
    if(scope !== path.scope.parent) {
      return scope;
    }
  }


  function getNearestScopeWithLocalUsedVars(path, disableRoot = false) {
    let scope = path.scope,
      rootScope = path.scope.getProgramParent();
    scope.crawl();
    do {
      scope = scope.parent;
      scope.crawl();
      const bindings = scope.getAllBindings();
      for(const id in bindings) {
        if(!scope.hasOwnBinding(id)) {
          break;
        }
        const references = []
            .concat(bindings[id].referencePaths)
            .concat(bindings[id].constantViolations),
          usedReferences = references
            .filter((refPath) => refPath.isDescendant(path))
        ;
        if(usedReferences.length) {
          return scope;
        }
      }
      if(disableRoot && scope.parent === rootScope) {
        return scope;
      }
    } while(scope.parent);
    return scope;
  }

  function getAttachmentPosition(bestParent, prevPath) {
    const prevParents = prevPath.getAncestry(),
      bestParentIdx = prevParents.indexOf(bestParent);
    if (-1 === bestParentIdx) {
      throw new Error('Possible parent not really in ancestry');
    }
    return prevParents
      .slice(1, bestParentIdx)
      .reverse()
      .find(
        path => (path.parentPath.isBlockStatement() || path.parentPath.isProgram()) &&
          path.parentPath.scope !== prevPath.parentPath.scope
      );
  }

  function moveToNewPosition(path, attachPath) {
    const {node, scope} = path,
      newScope = attachPath.parentPath.scope;
    if (node.type === 'FunctionDeclaration') {
      if (newScope.bindings[node.id.name]) {
        const uid = newScope.generateUidIdentifierBasedOnNode(node.id);
        scope.rename(node.id.name, uid.name);
      }
      scope.moveBindingTo(node.id.name, newScope);
      node._hoisted = true;
      attachPath.insertBefore([node]);
      path.remove();
    } else {
      const uid = path.parentPath.scope.generateUidIdentifierBasedOnNode(node.id),
        replacement = t.functionDeclaration(
          uid,
          node.params,
          normalizeFunctionBody(node.body)
        );
      if (node.id && node.id.name) {
        // fix for auto-generated named expression function, when node.id duplicated in AST in outer VariableDeclaration
        node.id = t.cloneDeep(node.id);
        scope.crawl();

        scope.rename(node.id.name, uid.name);
        scope.moveBindingTo(node.id.name, newScope);
      }
      replacement.loc = node.loc;
      replacement.generator = node.generator;
      replacement.async = node.async;
      replacement._hoisted = true;
      const declarePath = attachPath.insertBefore([replacement])[0];
      path.replaceWith(t.identifier(uid.name));
      if (!newScope.bindings[uid.name]) {
        newScope.registerDeclaration(declarePath);
      }
      newScope.bindings[uid.name].reference(path);
    }
  }

  /**
   * Normalize a function body so that it is always a BlockStatement.
   */
  function normalizeFunctionBody(node: Object): Object {
    if (node.type !== 'BlockStatement') {
      return t.blockStatement([
        t.returnStatement(node)
      ]);
    }
    else {
      return node;
    }
  }

  function _logAllProgram(path, label) {
    var rootNode = path.getAncestry().pop().node;
    console.error(label);
    console.error(require('babel-generator').default(rootNode).code);
    console.error('\n=======================================================\n');
  }
}
