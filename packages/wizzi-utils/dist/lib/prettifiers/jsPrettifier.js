/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\prettifiers\jsPrettifier.js.ittf
*/
'use strict';
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
fs.readFile('foo.js', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(beautify(data, { indent_size: 2 }));
})
