function foo1() {
  var s;
  (function() {
    function bar() {
      s = 1;
    }
    bar();
  })();
  return s;
}
export default function demo() {
  return [foo1()];
}