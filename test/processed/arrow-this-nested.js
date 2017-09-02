"use strict";

function _ref(item) {
  return item + 1;
}

function nestedHoistable() {
  return 12345;
}
function demo(input) {
  var _this = this;

  function _ref2(wat) {
    return wat + 2 + _this.id + nestedHoistable();
  }

  return input.map(_ref).map(function (item) {
    return _ref2;
  });
}