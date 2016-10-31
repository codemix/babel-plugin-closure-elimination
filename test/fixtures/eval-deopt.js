export default function demo() {
  var foo = 'bar';
  function baz() {
    return eval('foo');
  }
  return baz();
}