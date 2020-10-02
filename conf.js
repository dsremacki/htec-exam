// solves `SyntaxError: Unexpected token import`
require("babel-register")({
  presets: ["es2015"],
});
exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  // specs: ["specs/*.spec.js"],
  capabilities: {
    browserName: "chrome",
  },
  suites: {
    ui: ["specs/ui/*.spec.js"],
    api: ["specs/api/*.spec.js"],
  },
  onPrepare: function () {
    global.bd = browser.driver;
  },
};
