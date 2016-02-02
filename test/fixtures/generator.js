function generateF() {
  return function *(arg) {
    yield arg;
    yield 1;
    yield 2;
    yield 3;
  };
}

export default function demo() {
  return Array.from(generateF()('foo'));
}