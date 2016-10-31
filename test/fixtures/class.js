export default function demo() {
  class Demo {
    constructor (url) {
      this.url = url;
    }

    foo () {
      return (() => "bar")();
    }
  }
  return new Demo().foo();
}