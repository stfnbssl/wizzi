/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\examples\legacy\index.js.ittf
*/
'use strict';
var path = require('path');
var legacy = require('../../legacy');
legacy.jsModule(path.join(__dirname, 'ittf', 'sample.js.ittf'), {}, function(err, artifact) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('js artifact', artifact);
    legacy.htmlDocument(path.join(__dirname, 'ittf', 'sample.html.ittf'), {}, function(err, artifact) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('html artifact', artifact);
    })
})
