function demo (input) {
  return input.map(item => item + 1).map(item => item + 2 + this.id);
}