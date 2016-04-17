function foo() {
  var s = 1;

  function bar() {
    var s;
    s = 3;

    var func = () => {
      s = 2;
      return s;
    };
    var refFunc = () => "yo";
    return [s, func(), refFunc(), s];
  }
  return bar().concat(s);
}

export default function demo() {
  return foo();
}