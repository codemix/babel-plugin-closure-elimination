function demo (input: Array<number>): Array<Function> {
  return input.map(item => item + 1).map(item => {
    function nestedHoistable () {
      return 12345;
    }
    return wat => wat + 2 + this.id + nestedHoistable();
  });
}