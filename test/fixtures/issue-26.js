export default function demo() {
  var iterator = generator();
  return iterator.next().value()();
}
function* generator() {
  let value = 'foo';//bug, when used this variable
  const fn = () =>
    (() =>[value, 'bar']);
  yield fn;
}