"use strict";

function add1(input) {
  return input + 1;
}
function add2(input) {
  return input + 2;
}
function demo(input) {
  return input.map(add1).map(add2);
}