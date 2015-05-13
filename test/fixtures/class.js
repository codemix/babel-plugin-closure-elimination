export default class Demo {
  constructor (url) {
    this.url = url;
  }

  foo () {
    return () => "bar";
  }
}