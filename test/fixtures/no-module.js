exports.default = (function() {
    function foo() {
        return function bar() {
            return 'baz';
        };
    }
    return foo()();
})();