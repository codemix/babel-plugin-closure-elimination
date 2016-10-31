export default function demo() {
  var foo = 'bar';
  function baz() {
    return (1, eval)('"bar"');
  }
  return baz();
}