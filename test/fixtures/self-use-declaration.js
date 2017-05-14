export default function demo() {
  var fact = function factorial(num) {
    if(num === 1) {
      return num;
    }
    return num * factorial(num - 1);
  };
  var fact2 = function fact2(num) {
    if(num === 1) {
      return num;
    }
    return num * fact2(num - 1);
  };
  return [fact(3), fact2(3)];
}