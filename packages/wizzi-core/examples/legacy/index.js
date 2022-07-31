/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\examples\legacy\index.js.ittf
*/
'use strict';
var path = require('path');
var legacy = require('../../legacy');
legacy.jsModule(path.join(__dirname, 'ittf', 'sample.js.ittf'), {}, function(err, artifact) {
    if (err) {
        console.log("[31m%s[0m", err);
        throw new Error(err.message);
    }
    console.log('legacy.jsModule.js artifact', artifact);
    legacy.htmlDocument(path.join(__dirname, 'ittf', 'sample.html.ittf'), {}, function(err, artifact) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        console.log('legacy.jsModule.html artifact', artifact);
    })
})
