"use strict";

function _ref(item) {
  return item + 1;
}

function nestedHoistable() {
  return 12345;
}
function demo(input) {
  var _this = this;

  return input.map(_ref).map(function (item) {
    return function (wat) {
      return wat + 2 + _this.id + nestedHoistable();
    };
  });
}