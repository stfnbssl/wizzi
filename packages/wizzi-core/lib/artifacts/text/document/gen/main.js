/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\lib\artifacts\text\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var myname = 'text.document.main';

md.gen = function(model, ctx, callback) {
    if (model.wzElement !== 'text') {
        console.log("[31m%s[0m", 'wizzi-core', 'artifact', 'model', model);
        callback(error('Invalid model schema. Expected "text". Received: ' + model.wzElement))
    }
    // loog 'wizzi-core.artifact.text.document', model, model.toText
    if (model.toText) {
        ctx.write(model.toText())
    }
    else {
        ctx.write(model.content)
    }
    callback(null, ctx);
}
;
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/text/document', 
            message: message
         };
}
