"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;
function foo() {
  var s = 1;

  function bar() {
    s = 2;
  }
  bar();
  return s;
}

function demo() {
  return foo();
}