"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _bar() {
  var _this = this;

  return function () {
    return _this.bar;
  }();
}

function _ref() {
  return _bar.call({ bar: 222 });
}

function _foo() {
  return _ref();
}

function demo() {
  return _foo.call({ foo: 111 });
}