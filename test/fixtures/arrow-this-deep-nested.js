export default function demo () {
  return (function foo() {
    return (() => {
      return (function bar() {
          return (() => this.bar)();
        }).call({bar: 222});
    })();
  }).call({foo: 111});
}