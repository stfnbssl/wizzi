/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.cli\.wizzi\examples\fy\step_0.js.ittf
    utc time: Wed, 08 Jan 2025 05:17:29 GMT
*/
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
console.log('fy.step_0.args', args, __filename);
var fy = require('../../src/cmds/fy');
fy(args);