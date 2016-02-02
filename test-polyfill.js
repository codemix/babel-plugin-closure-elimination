require("babel-register")({
  "presets": ["es2015"],
  "plugins": ["transform-flow-strip-types"]
});
require("babel-regenerator-runtime");
