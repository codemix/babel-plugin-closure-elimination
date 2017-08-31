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

function _ref(item) {
  return item + 1;
}

function _ref2(item) {
  return item + 1;
}

function _someMethod() {
  return this.items.map(_ref).map(_ref2);
}

function demo() {
  var Demo = function () {
    function Demo(items) {
      _classCallCheck(this, Demo);

      this.items = items;
    }

    _createClass(Demo, [{
      key: "someMethod",
      value: _someMethod
    }]);

    return Demo;
  }();

  return new Demo([0, 1, 2]).someMethod();
}