'use strict';
export default function demo() {
  // scope for ArrowFunction with SequenceExpression
  let tmp;
  let foo = (foo) => (
    tmp,
    () => (
      () => [foo, 'bar']
    )
  );

  // scope for ForStatement
  let bar;
  for(let i = 0; i < 2; i++) {
    bar = () => 'bar' + i;
  }

  return [
    foo('foo')()(),//['foo', 'bar']
    bar()//'bar1'
  ];
};
