"use strict";

function add1() {
  return "nope";
}

function _add(input) {
  return input + 1;
}
function add2(input) {
  return input + 2;
}
function demo(input) {
  return input.map(_add).map(add2);
}