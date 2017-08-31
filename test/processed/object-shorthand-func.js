"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _func() {
  return 1;
}

function _func2() {
  return 2;
}

function _func3() {
  return 3;
}

function shorthand() {
  var obj = {
    func1: _func,
    func2: _func2,
    func3: _func3
  };
  return obj;
}

function demo() {
  var _shorthand = shorthand(),
      func1 = _shorthand.func1,
      func2 = _shorthand.func2,
      func3 = _shorthand.func3;

  return [func1(), func2(), func3()];
}