'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function foo() {
  return 'foo';
}

function _foo() {
  return 'bar';
}
function bar() {
  return _foo();
}
function demo() {
  return [foo(), bar()];
};