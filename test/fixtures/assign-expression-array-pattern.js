function foo() {
  var s = 1;

  function bar() {
    [s] = [2]
  }
  bar()
  return s;
}

export default function demo() {
  return foo();
}
