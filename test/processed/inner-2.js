"use strict";

function _ref(item) {
  return item + 1;
}

function _ref2(item) {
  return item + 2;
}

function demo(input) {
  function _foo() {
    return input.map(_ref).map(_ref2);
  }

  return function blah() {
    return _foo;
  };
}