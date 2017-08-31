"use strict";

function _ref(item) {
  return item + 1;
}

function demo(input) {
  var _this = this;

  return input.map(_ref).map(function (item) {
    return item + 2 + _this.id;
  });
}