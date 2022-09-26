/*
    artifact generator: C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\xsd\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var xsdwizzifier = require('../../lib/wizzifiers/xsdparser/xml2js/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'svg'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.xsd');
    
    xsdwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.xsd.xml2js')
     }, function(err, ittf) {
        console.log(1, __filename);
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.xsd.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
