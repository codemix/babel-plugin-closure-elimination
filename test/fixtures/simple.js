const foo = 123;
function demo (input: Array<number>): Array<number> {
  const bar = 456;
  return input.map(item => {
    let total = 23;
    if (true) {
      let wat = "yes";
      console.log(wat().length);
    }
    return item + 1 + total;
  });
}