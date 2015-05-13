function add1 () {
  return "nope";
}

function demo (input: Array<number>): Array<number> {
  function add1 (input: number): number {
    return input + 1;
  }
  function add2 (input: number): number {
    return input + 2;
  }
  return input.map(add1).map(add2);
}