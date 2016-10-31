export default function createClass() {
  var C = class {
    constructor(a) {
      this.a = a;
    }

    f() {
      return [(() => 'foo')(), this.a];
    }
  };

  return new C('bar').f();
}