class Demo1 extends String  {
  foo () {
    var tmp = ()=>"foo";
    return [tmp(), this.indexOf];
  }
}
class Demo2 extends String  {
  constructor() {
    super();
    this.bar = ()=>"bar";
  }
  foo () {
    return [this.bar(), this.indexOf];
  }
}
export default function demo() {
  return [new Demo1().foo(), new Demo2().foo()];
}