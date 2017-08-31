'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function baz() {
  return (1, eval)('"bar"');
}
function demo() {
  var foo = 'bar';return baz();
}