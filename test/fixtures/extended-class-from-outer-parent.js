class Demo1 extends RegExp {
  foo () {
    var tmp = ()=>"foo";
    return [tmp(), this.test];
  }
}
class Demo2 extends RegExp {
  constructor() {
    super();
    this.bar = ()=>"bar";
  }
  foo () {
    return [this.bar(), this.test];
  }
}
export default function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}