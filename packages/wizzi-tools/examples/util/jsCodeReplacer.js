/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\util\jsCodeReplacer.js.ittf
*/
'use strict';
var cr = require('../../lib/util/jsCodeReplacer');
var code = [
    'var x = 1;', 
    '{{alfa}}', 
    'var y = 2;'
].join('\n');
console.log('code', code);
var r = cr.clean(code);
console.log('cr.clean', r);
console.log('cr.restore', cr.restore(r.codeCleaned, r.replaceds));
