/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\examples\meta1\step_1.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
console.log("args", args, __filename);
var gen = require('../../src/cmds/meta');
gen(args);