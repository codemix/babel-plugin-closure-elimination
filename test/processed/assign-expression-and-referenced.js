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
  bar();
  return s;
}

function foo2() {
  var s;
  function bar() {
    s = 1;
  }
  function baz() {
    return s;
  }
  bar();
  return [s, baz()];
}

function foo3() {
  var s = 123;
  function baz() {
    return s;
  }
  return [baz()];
}

function demo() {
  return [foo1(), foo2(), foo3()];
}