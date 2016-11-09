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
    path.scope.crawl();// sibling plugins may not update scope of auto-generated functions
    const parentScopes = getAllParentScopes(path.scope),
      parentBindings = path.scope.parent.getAllBindings();
    for (let id in parentBindings) {
      const parentBinding = parentBindings[id],
        idx = parentScopes.indexOf(parentBinding.scope);
      if (idx === -1) {
        continue;
      }
      let hasUsageOfBinding = []
        .concat(parentBinding.referencePaths)
        .concat(parentBinding.constantViolations)
        .some(hasInPath);
      if (hasUsageOfBinding) {
        parentScopes.splice(idx + 1, Infinity);
      }
    }
    return parentScopes
      .filter(({path}) => !path.isProgram() || path.node.sourceType === 'module')
      .filter(scope => scope !== path.scope.parent)
      .pop();
    function hasInPath(subPath) {
      while (subPath = subPath.parentPath) {
        if (subPath === path) {
          return true;
        }
      }
    }
  }

  function getAllParentScopes(scope) {
    var scopes = [];
    while (scope = scope.parent) {
      scopes.push(scope);
    }
    return scopes;
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
