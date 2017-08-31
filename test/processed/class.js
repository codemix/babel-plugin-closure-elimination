"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

exports.default = demo;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _ref() {
  return "bar";
}

function _foo() {
  return _ref();
}

function demo() {
  var Demo = function () {
    function Demo(url) {
      _classCallCheck(this, Demo);

      this.url = url;
    }

    _createClass(Demo, [{
      key: "foo",
      value: _foo
    }]);

    return Demo;
  }();

  return new Demo().foo();
}