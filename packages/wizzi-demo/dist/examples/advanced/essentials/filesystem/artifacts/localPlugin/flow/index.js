/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-demo\.wizzi\examples\advanced\essentials\filesystem\artifacts\localPlugin\flow\index.js.ittf
*/
'use strict';
var build = require('./source/generate');
function exec(callback) {
    build(callback)
}
module.exports = function(callback) {
    exec(callback);
}
;
if (require.main === module) {
    exec();
}
