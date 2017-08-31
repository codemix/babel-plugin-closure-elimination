"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;
function foo1() {
  var s;

  function bar() {
    s = 1;
  }
  (function () {
    bar();
  })();
  return s;
}
function demo() {
  return [foo1()];
}