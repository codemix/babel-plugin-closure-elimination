'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

function _callee2(arg) {
  return regeneratorRuntime.wrap(function _callee$(_context) {
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
  }, _callee2, this);
}

function generateF() {
  return (/*#__PURE__*/regeneratorRuntime.mark(_callee2)
  );
}

function demo() {
  return Array.from(generateF()('foo'));
}