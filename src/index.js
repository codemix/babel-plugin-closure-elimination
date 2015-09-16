/**
 * # Closure Eliminator
 */
export default function build (babel: Object): Object {
  const {Transformer, types: t, traverse} = babel;

  const referenceVisitor = {
    enter (node, parent, scope, state) {
      if (!this.isJSXIdentifier() && this.isIdentifier()) {
        // direct references that we need to track to hoist this to the highest scope we can
        if (this.isReferenced()) {
          const bindingInfo = scope.getBinding(node.name);

          // this binding isn't accessible from the parent scope so we can safely ignore it
          // eg. it's in a closure etc
          if (bindingInfo !== state.scope.getBinding(node.name)) {
            return;
          }

          if (bindingInfo && bindingInfo.constant) {
            state.bindings[node.name] = bindingInfo;
          }
          else if (scope.getAllBindings()[node.name]) {
            state.foundIncompatible = true;
            this.stop();
          }
        }
      }
    }
  };

  class PathHoister {
    constructor(path, scope) {
      this.foundIncompatible = false;
      this.bindings          = {};
      this.scope             = scope;
      this.scopes            = [];
      this.path              = path;
    }

    isCompatibleScope(scope) {
      for (let key in this.bindings) {
        const binding = this.bindings[key];
        if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
          return false;
        }
      }
      return true;
    }

    getCompatibleScopes() {
      let checkScope = this.path.scope;
      do {
        if (this.isCompatibleScope(checkScope)) {
          this.scopes.push(checkScope);
        } else {
          break;
        }
      } while(checkScope = checkScope.parent);
    }

    getAttachmentPath() {
      const scopes = this.scopes;

      const scope = scopes.pop();

      if (scope.path.isFunction()) {
        if (this.hasNonParamBindings()) {
          // can't be attached to this scope
          return this.getNextScopeStatementParent();
        }
        else {
          // needs to be attached to the body
          return scope.path.get("body").get("body")[0];
        }
      }
      else if (scope.path.isProgram()) {
        return this.getNextScopeStatementParent();
      }
    }

    getNextScopeStatementParent() {
      const scope = this.scopes.pop();
      if (scope) {
        return scope.path.getStatementParent();
      }
    }

    hasNonParamBindings() {
      for (let name in this.bindings) {
        const binding = this.bindings[name];
        if (binding.kind !== "param") {
          return true;
        }
      }
      return false;
    }

    run() {
      const node = this.path.node;
      if (node._hoisted) return;
      node._hoisted = true;

      this.path.traverse(referenceVisitor, this);
      if (this.foundIncompatible) return;

      this.getCompatibleScopes();

      const path = this.getAttachmentPath();
      if (
        !path ||
        this.path.scope === path.scope ||
        this.path.parentPath === path  ||
        this.scope.block === path.parentPath.scope.block
      ) {
        return;
      }

      if (node.type === 'FunctionDeclaration') {
        let uid = this.path.parentPath.scope.generateUidIdentifierBasedOnNode(node.id);
        this.path.parentPath.scope.rename(node.id.name, uid.name);
        path.insertBefore([node]);
        this.path.dangerouslyRemove();
      }
      else {
        const uid = path.scope.generateUidIdentifier("ref");
        const replacement = t.functionDeclaration(
          uid,
          node.params,
          normalizeFunctionBody(node.body)
        );
        replacement._hoisted = true;

        path.insertBefore([replacement]);
        this.path.replaceWith(uid);
      }
    }
  }


  return new Transformer("closure-elimination", {
    Function: {
      enter (node, parent, scope) {
        const parentScope = scope.parent.getFunctionParent();
        if (
          parent.type === 'Program' ||
          parentScope.block.type === 'Program' ||
          (parent.type === 'CallExpression' && parent.callee === node)
        ) {
          return;
        }
        if (node.type === 'ArrowFunctionExpression') {
          let isCompatible = true;
          this.traverse({
            enter (node) {
              if (node.type === 'ThisExpression') {
                isCompatible = false;
                this.stop();
              }
              else if (this.isFunction() && node.type !== 'ArrowFunctionExpression') {
                this.skip();
              }
            }
          });
          if (!isCompatible) {
            return;
          }
        }
        const hoister = new PathHoister(this, this.parentPath.scope);
        hoister.run();
      }
    }
  });


  /**
   * Normalize a function body so that it is always a BlockStatement.
   */
  function normalizeFunctionBody (node: Object): Object {
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
