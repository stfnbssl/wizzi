/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-lab\.wizzi\examples\py\index.js.ittf
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_1_go')
];
function execute(callback) {
    async.series(samples, function(err, notUsed) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        var msg = 'package.wizzi-lab.schema.py - Level 0 samples - done.';
        console.log(msg, __filename);
        if (callback) {
            return callback(null, msg);
        }
    })
}
module.exports = execute;
if (typeof require != 'undefined' && require.main==module) {
    execute();
}