function shorthand() {
  var obj = {
    func1: () => 1,
    func2() {
      return 2;
    },
    func3() {
      return 3;
    }
  }
  return obj;
}

export default function demo() {
  var { func1, func2, func3 } = shorthand();
  return [func1(), func2(), func3()];
}