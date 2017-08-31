'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(_ref);

function _ref(arg) {
  return regeneratorRuntime.wrap(function _ref$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return arg;

        case 2:
          _context.next = 4;
          return 1;

        case 4:
          _context.next = 6;
          return 2;

        case 6:
          _context.next = 8;
          return 3;

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function generateF() {
  return _ref;
}

function demo() {
  return Array.from(generateF()('foo'));
}