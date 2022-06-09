/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\examples\svg\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var svgwizzifier = require('../../lib/wizzifiers/svgparser/xml2js/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'demo'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
})
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.svg');
    
    svgwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.svg.xml2js')
    }, function(err, ittf) {
        console.log(1);
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.svg.ittf'), ittf)
        return callback(null, 'success ' + source);
    })
}
