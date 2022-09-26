/*
    artifact generator: C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\html\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var htmlwizzifier = require('../../lib/wizzifiers/htmlparser/wizzi/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'index'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.html');
    
    // loog 'source', source
    htmlwizzifier.getWizziIttf(file.read(source), {
        dumpfile: path.join(__dirname, 'data', 'output', name + '.html.dump')
     }, function(err, ittf) {
        // loog 'ittf', ittf
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.html.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
