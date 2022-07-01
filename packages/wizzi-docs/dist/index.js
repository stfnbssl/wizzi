/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-docs\.wizzi\root\index.js.ittf
*/
'use strict';
var async = require('async');
var stringify = require('json-stringify-safe');
var jobs = [
    require('./jobs/site'), 
    require('./jobs/index'), 
    require('./jobs/concepts'), 
    require('./jobs/docs'), 
    require('./jobs/starters'), 
    require('./jobs/project'), 
    require('./jobs/api_preprocess'), 
    require('./jobs/api'), 
    require('./jobs/code_intro'), 
    require('./jobs/code_preprocess'), 
    require('./jobs/code')
];
function exec(callback) {
    async.mapSeries(jobs, function(job, callback) {
        job(callback);
    }, function(err, results) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        console.log('docs generation results\n', stringify(results, null, 2));
        if (callback) {
            callback(null, 'docs generation executed')
        }
    })
}
module.exports = function(callback) {
    exec(callback);
}
;
if (require && require.main === module) {
    exec();
}
