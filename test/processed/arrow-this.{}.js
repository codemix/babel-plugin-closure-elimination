"use strict";

function _ref(item) {
  return item + 1;
}

function demo(input) {
  return input.map(_ref).map(item => item + 2 + this.id);
}