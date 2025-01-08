/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\examples\fs\vfile.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';
var path = require('path');
var del = require('del');
var vfile = require('../../lib/fSystem/vfile');
var file = vfile();
del.sync(path.join(__dirname, 'ittf', '**', '*.*'))
file.write(path.join(__dirname, 'ittf', 't', 'alpha.tests.ittf'), 'tests makepath', function(err, result) {
    if (err) {
        console.log("[31m%s[0m", err);
        throw new Error(err.message);
    }
    console.log('result', result);
})
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1')
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2')
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'));
console.log('vfile.result', result);
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), {
    removeRoot: path.join(__dirname, 'ittf')
 });
console.log('vfile.result', result);