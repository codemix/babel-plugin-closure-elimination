'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(generator);

function demo() {
  var iterator = generator();
  return iterator.next().value()();
}
function generator() {
  var value, fn;

  function _ref() {
    return [value, 'bar'];
  }

  function _fn() {
    return _ref;
  }

  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = 'foo'; //bug, when used this variable

          fn = _fn;
          _context.next = 4;
          return fn;

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}