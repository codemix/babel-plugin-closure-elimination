"use strict";

var input = [[[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]];

function _ref(cell) {
  return cell + 1;
}

function _ref2(cell) {
  return cell % 2 === 1;
}

function _ref3(a, b) {
  return a + b;
}

function _ref4(row) {
  return row.map(_ref).filter(_ref2).reduce(_ref3, 0);
}

function _ref5(a, b) {
  return a + b;
}

function _ref6(col) {
  return col.map(_ref4).reduce(_ref5, 0);
}

function _ref7(a, b) {
  return a + b;
}

function demo(input) {
  return input.map(_ref6).reduce(_ref7, 0);
}

function _ref8(cell) {
  return cell + 1;
}

function _ref9(cell) {
  return cell % 2 === 1;
}

function _ref10(a, b) {
  return a + b;
}

function _ref11(row) {
  return _.reduce(_.filter(_.map(row, _ref8), _ref9), _ref10, 0);
}

function _ref12(a, b) {
  return a + b;
}

function _ref13(col) {
  return _.reduce(_.map(col, _ref11), _ref12, 0);
}

function _ref14(a, b) {
  return a + b;
}

function demoLodash(input) {
  return _.reduce(_.map(input, _ref13), _ref14, 0);
}