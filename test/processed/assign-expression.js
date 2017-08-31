"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref() {
  return "yo";
}

function bar() {
  var s;
  s = 3;

  var func = function func() {
    s = 2;
    return s;
  };
  var refFunc = _ref;
  return [s, func(), refFunc(), s];
}
function foo() {
  var s = 1;return bar().concat(s);
}

function demo() {
  return foo();
}