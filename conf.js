// solves `SyntaxError: Unexpected token import`
require("babel-register")({
  presets: ["es2015"],
});

const jasmineReporters = require("jasmine-reporters");

exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  // specs: ["specs/*.spec.js"],
  capabilities: {
    browserName: "firefox",
    chromeOptions: {
      args: ["--start-maximized", "--incognito"],
      //for headless add "--headless" ^
    },
  },
  suites: {
    ui: ["specs/ui/*.spec.js"],
    api: ["specs/api/*.spec.js"],
  },
  onPrepare: function () {
    global.bd = browser.driver;
    browser.ignoreSynchronization = true;
    //Jasmine xml reproter setup
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "./reports/",
        filePrefix: "xmlresults",
      })
    );
  },
  //HTMLReport called once tests are finished
  onComplete: function () {
    let browserName, browserVersion;
    let capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get("browserName");
      browserVersion = caps.get("version");
      platform = caps.get("platform");

      const HTMLReport = require("protractor-html-reporter-2");

      testConfig = {
        reportTitle: "HTEC Test Execution Report",
        outputPath: "./reports",
        outputFilename: "HTECTestReport",
        screenshotPath: "./screenshots",
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from("./reports/xmlresults.xml", testConfig);
    });
  },
};
