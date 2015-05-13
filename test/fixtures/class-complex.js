export default class Demo {

  constructor () {
    console.log('constructed');
  }

  someMethod (item) {
    return () => item;
  }

  someOtherMethod (items) {
    return items.map(item => item + 1).map(item => item + 1);
  }


}

