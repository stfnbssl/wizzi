/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-demo\.wizzi\examples\advanced\plugins\index.js.ittf
*/
'use strict';
var async = require('async');
var examples = [
    require('./jsonld')
];
function exec(request, callback) {
    async.mapSeries(examples, function(example, callback) {
        example(request, callback);
    }, function(err, results) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        console.log('Advanced-plugins examples results\n', results);
        if (callback) {
            callback(null, 'Advanced-plugins examples executed')
        }
    })
}
module.exports = function(request, callback) {
    exec(request || 'build', callback);
}
;
if (require.main === module) {
    exec('build')
}
