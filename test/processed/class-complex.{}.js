"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref(item) {
  return item + 1;
}

function _ref2(item) {
  return item + 1;
}

function demo() {
  class Demo {
    constructor(items) {
      this.items = items;
    }

    someMethod() {
      return this.items.map(_ref).map(_ref2);
    }
  }
  return new Demo([0, 1, 2]).someMethod();
}