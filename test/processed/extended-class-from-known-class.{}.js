'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref() {
  return 'base';
}

class Base {
  constructor() {
    this.base = _ref;
  }
}
class Demo1 extends Base {
  foo() {
    return [this.base(), "foo"];
  }
}

function _ref2() {
  return 'bar';
}

class Demo2 extends Base {
  constructor() {
    super();
    this.bar = _ref2;
  }
  foo() {
    return [this.base(), this.bar()];
  }
}
function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}