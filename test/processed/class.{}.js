"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref() {
  return "bar";
}

function demo() {
  class Demo {
    constructor(url) {
      this.url = url;
    }

    foo() {
      return _ref();
    }
  }
  return new Demo().foo();
}