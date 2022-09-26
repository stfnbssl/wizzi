/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\lib\artifacts\wfschema\factory\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.factory_darvin.main';
md.gen = function(model, ctx, callback) {
    var wfschemaIttfPath = path.join(__dirname, 'ittf', 'wfschema-factory.js.ittf');
    var mTreeBuildupContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false, 
            isWizziPackageSchema: isWizziPackageSchema(model.wzName)
         }
     };
    legacy.jsModule(wfschemaIttfPath, mTreeBuildupContext, function(err, result) {
        if (err) {
            return callback(err);
        }
        ctx.w(result);
        callback(null, ctx);
    })
}
;
function isWizziPackageSchema(name) {
    var ndx = [
        'nools', 
        'npmpackage', 
        'wftest', 
        'wfjob', 
        'wfpackage', 
        'wfschema'
    ].indexOf(name);
    return ndx > -1;
}
