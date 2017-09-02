'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = demo;
function demo() {
    if (true) {
        var bar = 'bar';

        function _foo() {
            return bar;
        }

        if (true) {
            var foo = _foo;
            return foo();
        }
    }
};