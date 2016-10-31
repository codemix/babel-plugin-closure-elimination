export default function demo() {
  class Demo {
    constructor (items) {
      this.items = items;
    }

    someMethod () {
      return this.items.map(item => item + 1).map(item => item + 1);
    }
  }
  return new Demo([0, 1, 2]).someMethod();
}

