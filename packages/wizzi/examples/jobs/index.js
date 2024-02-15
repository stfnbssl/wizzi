/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\examples\jobs\index.js.ittf
    utc time: Thu, 15 Feb 2024 18:31:20 GMT
*/
'use strict';
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('../../index');
var friendsArray = [
    'arthur', 
    'mary'
];
execute("job_1", function(err, notUsed) {
    if (err) {
        return callback(err);
    }
})
function execute(jobName, callback) {
    var jobsPath = path.join(__dirname, 'ittf', jobName);
    // Execute a wizzi job
    wizzi.job(path.join(jobsPath, 'index.wfjob.ittf'), {
        friends: friendsArray
     }, {
        name: jobName, 
        jobContext: {
            options: {
                destFolder: 'output'
             }
         }, 
        globalContext: {
            options: {
                destFolder: 'output'
             }
         }
     }, function(err, jobResults) {
        if (err) {
            console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err.message);
        }
        console.log("results of job " + jobName + "\n", stringify(jobResults, null, 2));
    })
}
