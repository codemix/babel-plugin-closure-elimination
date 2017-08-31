"use strict";

var foo = 123;

function _ref(item) {
  var total = 23;
  if (true) {
    var wat = "yes";
    console.log(wat().length);
  }
  return item + 1 + total;
}

function demo(input) {
  var bar = 456;
  return input.map(_ref);
}