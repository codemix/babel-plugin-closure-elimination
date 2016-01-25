"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * # Closure Eliminator
 */
function build(babel) {
  var t = babel.types;
  var traverse = babel.traverse;

  var referenceVisitor = {
    enter: function enter(path, state) {
      var node = path.node,
          scope = path.scope;
      if (!path.isJSXIdentifier() && path.isIdentifier()) {
        // direct references that we need to track to hoist this to the highest scope we can
        if (path.isReferenced()) {
          var bindingInfo = scope.getBinding(node.name);

          // this binding isn't accessible from the parent scope so we can safely ignore it
          // eg. it's in a closure etc
          if (bindingInfo !== state.scope.getBinding(node.name)) {
            return;
          }

          if (bindingInfo && bindingInfo.constant) {
            state.bindings[node.name] = bindingInfo;
          } else if (scope.getAllBindings()[node.name]) {
            state.foundIncompatible = true;
            path.stop();
          }
        }
      }
    }
  };

  var PathHoister = function () {
    function PathHoister(path, scope) {
      _classCallCheck(this, PathHoister);

      this.foundIncompatible = false;
      this.bindings = {};
      this.scope = scope;
      this.scopes = [];
      this.path = path;
    }

    _createClass(PathHoister, [{
      key: "isCompatibleScope",
      value: function isCompatibleScope(scope) {
        for (var key in this.bindings) {
          var binding = this.bindings[key];
          if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: "getCompatibleScopes",
      value: function getCompatibleScopes() {
        var checkScope = this.path.scope;
        do {
          if (this.isCompatibleScope(checkScope)) {
            this.scopes.push(checkScope);
          } else {
            break;
          }
        } while (checkScope = checkScope.parent);
      }
    }, {
      key: "getAttachmentPath",
      value: function getAttachmentPath() {
        var scopes = this.scopes;

        var scope = scopes.pop();

        if (scope.path.isFunction()) {
          if (this.hasNonParamBindings()) {
            // can't be attached to this scope
            return this.getNextScopeStatementParent();
          } else {
            // needs to be attached to the body
            return scope.path.get("body").get("body")[0];
          }
        } else if (scope.path.isProgram()) {
          return this.getNextScopeStatementParent();
        }
      }
    }, {
      key: "getNextScopeStatementParent",
      value: function getNextScopeStatementParent() {
        var scope = this.scopes.pop();
        if (scope) {
          return scope.path.getStatementParent();
        }
      }
    }, {
      key: "hasNonParamBindings",
      value: function hasNonParamBindings() {
        for (var name in this.bindings) {
          var binding = this.bindings[name];
          if (binding.kind !== "param") {
            return true;
          }
        }
        return false;
      }
    }, {
      key: "run",
      value: function run() {
        var node = this.path.node;
        if (node._hoisted) return;
        node._hoisted = true;

        this.path.traverse(referenceVisitor, this);
        if (this.foundIncompatible) return;

        this.getCompatibleScopes();

        var path = this.getAttachmentPath();
        if (!path || this.path.scope === path.scope || this.path.parentPath === path || this.scope.block === path.parentPath.scope.block) {
          return;
        }

        if (node.type === 'FunctionDeclaration') {
          var uid = this.path.parentPath.scope.generateUidIdentifierBasedOnNode(node.id);
          this.path.parentPath.scope.rename(node.id.name, uid.name);
          path.insertBefore([node]);
          this.path.remove();
        } else {
          var uid = path.scope.generateUidIdentifier("ref");
          var replacement = t.functionDeclaration(uid, node.params, normalizeFunctionBody(node.body));
          replacement._hoisted = true;

          path.insertBefore([replacement]);
          this.path.replaceWith(uid);
        }
      }
    }]);

    return PathHoister;
  }();

  return {
    visitor: {
      Function: {
        enter: function enter(path) {
          var node = path.node,
              scope = path.scope,
              parent = path.parentPath.node,
              parentScope = scope.parent.getFunctionParent();
          if (parent.type === 'Program' || parentScope.block.type === 'Program' || parent.type === 'CallExpression' && parent.callee === node) {
            return;
          }
          if (node.type === 'ArrowFunctionExpression') {
            var isCompatible = true;
            path.traverse({
              enter: function enter(subPath) {
                var node = subPath.node;
                if (node.type === 'ThisExpression') {
                  isCompatible = false;
                  subPath.stop();
                } else if (subPath.isFunction() && node.type !== 'ArrowFunctionExpression') {
                  subPath.skip();
                }
              }
            });
            if (!isCompatible) {
              return;
            }
          }
          var hoister = new PathHoister(path, path.parentPath.scope);
          hoister.run();
        }
      }
    }
  };

  /**
   * Normalize a function body so that it is always a BlockStatement.
   */
  function normalizeFunctionBody(node) {
    if (node.type !== 'BlockStatement') {
      return t.blockStatement([t.returnStatement(node)]);
    } else {
      return node;
    }
  }
}