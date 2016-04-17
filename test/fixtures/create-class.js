function createClass() {
  var C = class {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }

    f() {
      return () => 'yo';
    }
  };

  return C;
}