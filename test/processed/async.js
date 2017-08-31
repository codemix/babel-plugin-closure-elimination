"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _ref$2(_context) {
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

function _ref() {
  return regeneratorRuntime.async(_ref$2, null, this);
}

function asyncF() {
  return _ref;
}

function demo() {
  return asyncF()() instanceof Promise;
}