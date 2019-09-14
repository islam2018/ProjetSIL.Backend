var Jasmine = require('jasmine');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
const JasmineConsoleReporter = require('jasmine-console-reporter');
var jasmine = new Jasmine();

var reporter = new JasmineConsoleReporter({
    colors: 1,
    cleanStack: 3,
    verbosity: 4,
    listStyle: 'indent',
    activity: false
});


jasmine.loadConfigFile('./spec/support/jasmine.json');

jasmine.addReporter(new HtmlReporter({
    path: "./RapportTestsUnitaires",
    showSuspectLine: true,
    highlightSuspectLine: true,
}));

jasmine.addReporter(reporter);
jasmine.showColors(true);
jasmine.execute();


/*
var HTMLReport = require('jasmine-xml2html-converter');

testConfig = {
    reportTitle: 'Unit Test Report',
    outputPath: './reports'
};
new HTMLReport().from(  'reports/junitresults-marquesroutetests.xml', testConfig);

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: './reports',
    consolidateAll: false
});
jasmine.loadConfigFile('./spec/support/jasmine.json');
jasmine.addReporter(junitReporter)
jasmine.execute();*/
