/**
 * # Closure Eliminator
 */

// Do not use Symbol here. class constructor/body missed Symbol-props
const $classConstructor = '__classConstructor';
const $classMethod = '__classMethod';
const $objectMethod = '__objectMethod';
const $bindedArrowFunction = '__bindedArrowFunction';

export default function build(babel:Object):Object {
  const {types: t} = babel;

  return {
    visitor: {
      ObjectExpression: {
        enter(path) {
          path.traverse({
            ObjectMethod: {
              enter({node}) {
                node[$objectMethod] = node.body[$objectMethod] = true;
              }
            }
          });
        }
      },
      Class: {
        enter(path) {
          const node = path.node;
          node[$classConstructor] = node.body[$classConstructor] = true;
          path.traverse({
            ClassMethod: {
              enter({node}) {
                node[$classMethod] = node.body[$classMethod] = true;
              }
            }
          });
        }
      },
      ThisExpression: {
        enter(path) {
          debugger;
          var parentArrow = path;
          while (parentArrow = parentArrow.findParent(node=>node.type === 'ArrowFunctionExpression')) {
            parentArrow.node[$bindedArrowFunction] = true;
          }
        }
      },
      Function: {
        exit (path) {
          const node = path.node,
            scope = path.scope;
          if (node[$classConstructor] || node.body[$classConstructor] || node[$classMethod] || node[$objectMethod] || node[$bindedArrowFunction]) {
            return;
          }
          if (path.findParent(({node}) => node._generated || node._compact)) {
            path.skip();
            return;
          }
          var parentScopes = getAllParentScopes(path.scope),
            parentBindings = path.scope.parent.getAllBindings();

          for (let i in parentBindings) {
            let hasUsageOfBinding = []
              .concat(parentBindings[i].referencePaths)
              .concat(parentBindings[i].constantViolations)
              .some(subPath => subPath.getAncestry().indexOf(path) !== -1);
            if (hasUsageOfBinding) {
              let idx = parentScopes.indexOf(parentBindings[i].scope);
              if (idx !== -1) {
                parentScopes.splice(idx + 1, Infinity);
              }
            }
          }
          const bestParentScope = parentScopes.pop();

          if (bestParentScope !== path.scope.parent) {
            const bestParent = bestParentScope.path;
            let attachPathes;
            if (bestParent.isFunction()) {
              attachPathes = bestParent.get('body.body');
            } else if (bestParent.isProgram()) {
              attachPathes = bestParent.get('body');
            } else if (bestParent.isBlockStatement()) {
              attachPathes = bestParent.get('body');
            }
            let parents = path.getAncestry(),
              attachPath = attachPathes.find(x => parents.indexOf(x) !== -1);

            if (node.type === 'FunctionDeclaration') {
              let uid = bestParentScope.generateUidIdentifierBasedOnNode(node.id);
              scope.rename(node.id.name, uid.name);
              scope.moveBindingTo(uid.name, bestParentScope);

              node._hoisted = true;
              attachPath.insertBefore([node]);
              path.remove();
            }
            else {
              const uid = node.id ?
                path.parentPath.scope.generateUidIdentifierBasedOnNode(node.id) :
                path.scope.generateUidIdentifier("ref");
              const replacement = t.functionDeclaration(
                uid,
                node.params,
                normalizeFunctionBody(node.body)
              );
              replacement.loc = node.loc;
              replacement.generator = node.generator;
              replacement.async = node.async;
              replacement._hoisted = true;

              attachPath.insertBefore([replacement]);
              path.replaceWith(t.identifier(uid.name));
              bestParentScope.crawl();
            }
          }
        }
      }
    }
  };

  function getAllParentScopes(scope) {
    var scopes = [];
    while (scope = scope.parent) {
      scopes.push(scope);
    }
    return scopes;
  }


  /**
   * Normalize a function body so that it is always a BlockStatement.
   */
  function normalizeFunctionBody(node:Object):Object {
    if (node.type !== 'BlockStatement') {
      return t.blockStatement([
        t.returnStatement(node)
      ]);
    }
    else {
      return node;
    }
  }
}
