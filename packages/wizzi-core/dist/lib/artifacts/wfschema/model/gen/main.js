/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\wfschema\model\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.model.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wfschema-model.js.ittf');
    console.log('wizzi-core.wfschema.gen.model started', ittfDocumentPath);
    // log 'wizzi-core.artifacts.wfschema.model.model', model
    var mTreeBuildUpContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || null, 
            toJson: model.exportToJson(), 
            toXml: model.exportToXml(), 
            toPrettify: model.exportToPrettify()
        }
    };
    legacy.jsModule(ittfDocumentPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            console.log(__dirname, myname, 'err', err);
        }
        console.log('wizzi-core.wfschema.gen.model ended', ittfDocumentPath);
        ctx.w(result);
        callback(null, ctx);
    })
};
