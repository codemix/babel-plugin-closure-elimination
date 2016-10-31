class Demo1 extends Date {
  foo () {
    var tmp = ()=>"foo";
    return [tmp(), this.getDate];
  }
}
class Demo2 extends Date {
  constructor() {
    super();
    this.bar = ()=>"bar";
  }
  foo () {
    return [this.bar(), this.getDate];
  }
}
export default function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}