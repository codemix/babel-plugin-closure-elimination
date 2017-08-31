'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;
function demo() {
  var foo = 'bar';
  function baz() {
    return eval('foo');
  }
  return baz();
}