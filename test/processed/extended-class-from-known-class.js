'use strict';

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

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _ref() {
  return 'base';
}

var Base = function Base() {
  _classCallCheck(this, Base);

  this.base = _ref;
};

function _foo() {
  return [this.base(), "foo"];
}

var Demo1 = function (_Base) {
  _inherits(Demo1, _Base);

  function Demo1() {
    _classCallCheck(this, Demo1);

    return _possibleConstructorReturn(this, (Demo1.__proto__ || Object.getPrototypeOf(Demo1)).apply(this, arguments));
  }

  _createClass(Demo1, [{
    key: 'foo',
    value: _foo
  }]);

  return Demo1;
}(Base);

function _ref2() {
  return 'bar';
}

function _foo2() {
  return [this.base(), this.bar()];
}

var Demo2 = function (_Base) {
  _inherits(Demo2, _Base);

  function Demo2() {
    _classCallCheck(this, Demo2);

    var _this = _possibleConstructorReturn(this, (Demo2.__proto__ || Object.getPrototypeOf(Demo2)).call(this));

    _this.bar = _ref2;
    return _this;
  }

  _createClass(Demo2, [{
    key: 'foo',
    value: _foo2
  }]);

  return Demo2;
}(Base);

function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}