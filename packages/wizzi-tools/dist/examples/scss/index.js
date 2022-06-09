/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\examples\scss\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

// var scsswizzifier = require('../../lib/wizzifiers/scssparser/salesforce/wizzifier')
var scsswizzifier = require('../../lib/wizzifiers/scssparser/gonzales/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'styles'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.scss');
    
    scsswizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.scss.gonzales')
    }, function(err, ittf) {
        console.log(1);
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.scss.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
