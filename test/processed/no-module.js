'use strict';

function _bar() {
    return 'baz';
}

function foo() {
    return _bar;
}
exports.default = function () {
    return foo()();
}();