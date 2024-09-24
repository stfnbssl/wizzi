/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\examples\jobs\index.js.ittf
    utc time: Fri, 30 Aug 2024 19:00:23 GMT
*/
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('../../index');
var friendsArray = [
    'arthur', 
    'mary'
];
execute("job_model_to_folder", function(err, notUsed) {
    if (err) {
        return callback(err);
    }
})
function execute(jobName, callback) {
    var jobsPath = path.join(__dirname, 'ittf', jobName);
    // Execute a wizzi job
    wizzi.job(path.join(jobsPath, 'index.wzjob.ittf'), {
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