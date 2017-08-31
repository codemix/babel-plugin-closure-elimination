'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClass;

function _ref() {
  return 'foo';
}

function createClass() {
  var C = class {
    constructor(a) {
      this.a = a;
    }

    f() {
      return [_ref(), this.a];
    }
  };

  return new C('bar').f();
}