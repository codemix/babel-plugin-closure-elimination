# Babel Closure Elimination

This is a [Babel](https://babeljs.io/) plugin that eliminates unnecessary closures from your JavaScript in the name of performance.

[![Build Status](https://travis-ci.org/codemix/babel-plugin-closure-elimination.svg)](https://travis-ci.org/codemix/babel-plugin-closure-elimination)

> Note: Now requires Babel 6.

# What?

Turns code like this:
```js
function demo (input) {
  return input.map(item => item + 1).map(item => item + 2);
}
```
Into code like this:
```js
function _ref(item) {
  return item + 1;
}

function _ref2(item) {
  return item + 2;
}

function demo(input) {
  return input.map(_ref).map(_ref2);
}

```

# Why?

Because it's faster and more memory efficient in [most JavaScript engines](http://jsperf.com/closure-elimination), and means you can safely use arrow functions without a performance penalty in most cases.

# Installation

First, install via [npm](https://npmjs.org/package/babel-plugin-closure-elimination).
```sh
npm install --save-dev babel-plugin-closure-elimination
```
Then, in your babel configuration (usually in your `.babelrc` file), add `"closure-elimination"` to your list of plugins:
```json
{
  "plugins": ["closure-elimination"]
}
```


# License

Published by [codemix](http://codemix.com/) under a permissive MIT License, see [LICENSE.md](./LICENSE.md).

