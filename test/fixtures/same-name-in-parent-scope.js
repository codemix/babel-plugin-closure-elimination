export default function demo() {
  function foo() {
    return 'foo';
  }
  function bar() {
    function foo() {
      return 'bar';
    }
    return foo();
  }
  return [foo(), bar()];
};
