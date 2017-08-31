"use strict";

function _ref(item) {
  return item + 1;
}

function nestedHoistable() {
  return 12345;
}
function demo(input) {
  return input.map(_ref).map(item => {
    return wat => wat + 2 + this.id + nestedHoistable();
  });
}