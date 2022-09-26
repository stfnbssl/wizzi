/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\lib\artifacts\wfschema\model\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.model.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wfschema-model.js.ittf');
    // loog 'wizzi-core.wfschema.gen.model started', ittfDocumentPath
    // loog 'wizzi-core.artifacts.wfschema.model.model', model
    var mTreeBuildupContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || null, 
            toJson: model.exportToJson(), 
            toXml: model.exportToXml(), 
            toPrettify: model.exportToPrettify()
         }
     };
    legacy.jsModule(ittfDocumentPath, mTreeBuildupContext, function(err, result) {
        if (err) {
            console.log("[31m%s[0m", __dirname, myname, 'err', err);
        }
        // loog 'wizzi-core.wfschema.gen.model ended', ittfDocumentPath
        ctx.w(result);
        callback(null, ctx);
    })
}
;
