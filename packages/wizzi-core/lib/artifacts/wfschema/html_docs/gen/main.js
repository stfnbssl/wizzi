/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\lib\artifacts\wfschema\html_docs\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.html.docs.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wfschema-docs.html.ittf');
    var mTreeBuildupContext = {
        schema: model, 
        request: {}
     };
    // loog 'htmlContext', util.inspect(htmlContext, { depth: 2 })
    legacy.htmlDocument(ittfDocumentPath, mTreeBuildupContext, function(err, result) {
        if (err) {
            return callback(err);
        }
        ctx.w(result);
        callback(null, ctx);
    })
}
;
