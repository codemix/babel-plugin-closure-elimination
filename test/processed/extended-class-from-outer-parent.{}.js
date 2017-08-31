"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref() {
  return "foo";
}

class Demo1 extends Date {
  foo() {
    var tmp = _ref;
    return [tmp(), this.getDate];
  }
}

function _ref2() {
  return "bar";
}

class Demo2 extends Date {
  constructor() {
    super();
    this.bar = _ref2;
  }
  foo() {
    return [this.bar(), this.getDate];
  }
}
function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}