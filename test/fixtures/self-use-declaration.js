export default function demo() {
  var fact = function factorial(num) {
    if(num === 1) {
      return num;
    }
    return num * factorial(num - 1);
  };
  return fact(3);
}