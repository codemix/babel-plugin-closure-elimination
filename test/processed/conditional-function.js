'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref() {
  return 'a1';
}

function _ref2() {
  return 'a2';
}

function arrow(isFirst) {
  return isFirst ? _ref : _ref2;
}

function _ref3() {
  return 'e1';
}

function _ref4() {
  return 'e2';
}

function expr(isFirst) {
  return isFirst ? _ref3 : _ref4;
}

function demo() {
  return [arrow(true)(), arrow(false)(), expr(true)(), expr(false)()];
}