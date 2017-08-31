"use strict";

var foo = 123;
function demo(input) {
  var bar = 456;
  return input.map(function (item) {
    var total = 23;
    return item + 1 + total + bar;
  });
}