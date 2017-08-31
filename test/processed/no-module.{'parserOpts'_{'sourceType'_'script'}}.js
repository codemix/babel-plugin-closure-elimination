'use strict';

exports.default = function () {
    function _bar() {
        return 'baz';
    }

    function foo() {
        return _bar;
    }
    return foo()();
}();