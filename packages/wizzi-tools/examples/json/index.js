/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\json\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var jsonwizzifier = require('../../lib/wizzifiers/jsonparser/wizzi/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'archive'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.json');
    
    // loog 'source', source
    jsonwizzifier.getWizziIttf(file.read(source), {
        dumpfile: path.join(__dirname, 'data', 'output', name + '.json.dump')
     }, function(err, ittf) {
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.json.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
