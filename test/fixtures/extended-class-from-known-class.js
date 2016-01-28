class Base {
  constructor() {
    this.base = ()=>'base'
  }
}
class Demo1 extends Base  {
  foo () {
    return [this.base(), "foo"];
  }
}
class Demo2 extends Base  {
  constructor() {
    super();
    this.bar = ()=>'bar';
  }
  foo () {
    return [this.base(), this.bar()];
  }
}
export default function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}