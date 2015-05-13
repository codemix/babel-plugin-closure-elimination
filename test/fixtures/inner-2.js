function demo (input: Array<number>): Array<number> {
  return function blah () {
    return function foo () {
      return input.map(item => item + 1).map(item => item + 2);
    };
  };
}