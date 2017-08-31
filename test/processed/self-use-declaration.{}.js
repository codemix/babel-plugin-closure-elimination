"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _factorial(num) {
  if (num === 1) {
    return num;
  }
  return num * _factorial(num - 1);
}

function _fact(num) {
  if (num === 1) {
    return num;
  }
  return num * _fact(num - 1);
}

function demo() {
  var fact = _factorial;
  var fact2 = _fact;
  return [fact(3), fact2(3)];
}