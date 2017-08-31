"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = demo;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(symbolicateStackTrace);

function symbolicateStackTrace(stack) {
  var foundInternalSource;

  function _ref(frame) {
    return foundInternalSource++;
  }

  return regeneratorRuntime.wrap(function symbolicateStackTrace$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (!stack) {
          _context.next = 3;
          break;
        }

        foundInternalSource = 0;
        return _context.abrupt("return", stack.map(_ref));

      case 3:
      case "end":
        return _context.stop();
    }
  }, _marked, this);
}

function demo() {
  return symbolicateStackTrace([1, 2]).next().value;
}