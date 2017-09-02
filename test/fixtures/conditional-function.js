function arrow(isFirst) {
  return isFirst ? () => 'a1' : () => 'a2';
}

function expr(isFirst) {
  return isFirst ?
    function () {
      return 'e1'
    } :
    function () {
      return 'e2'
    };
}

export default function demo() {
  return [
    arrow(true)(), arrow(false)(),
    expr(true)(), expr(false)()
  ];
}