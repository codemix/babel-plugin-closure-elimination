'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;
function demo() {
  var iterator = generator();
  return iterator.next().value()();
}
function* generator() {
  let value = 'foo'; //bug, when used this variable

  function _ref() {
    return [value, 'bar'];
  }

  const fn = () => _ref;
  yield fn;
}