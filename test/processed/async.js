"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _callee$2(_context) {
  while (1) {
    switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(1);

      case 2:
      case "end":
        return _context.stop();
    }
  }
}

function _callee2() {
  return regeneratorRuntime.async(_callee$2, null, this);
}

function asyncF() {
  return _callee2;
}

function demo() {
  return asyncF()() instanceof Promise;
}