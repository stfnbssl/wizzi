/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-demo\.wizzi\examples\advanced\plugins\regexp\index.js.ittf
*/
'use strict';
var build = require('./source/generate');
var examples = require('./examples');
function exec(request, callback) {
    if (request === 'build') {
        return build(callback);
    }
    else if (request === 'examples') {
        return examples(callback);
    }
    else {
        var msg = 'Invalid request: ' + request + ', should be `build` or `examples`';
        console.log(msg);
        if (callback) {
            callback(msg)
        }
    }
}
module.exports = function(request, callback) {
    if (typeof callback === 'undefined') {
        callback = request;
        request = 'build';
    }
    exec(request, callback);
}
;
if (require.main === module) {
    var request = process.argv.length > 2 ? process.argv[2] : 'build';
    exec(request)
}
