/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\wizzifiers\xml.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var thisPackage = require('../../index');
var file = require('wizzi-utils').file;

async.map([
    'svg', 
    'css'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', 'xml;', name + '.tests.xml;');
    
    thisPackage.xml;Wizzify(source, {
        dumpfile: path.join(__dirname, 'data', 'output', name + '.xml;.dump')
     }, function(err, ittf) {
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.xml;.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
