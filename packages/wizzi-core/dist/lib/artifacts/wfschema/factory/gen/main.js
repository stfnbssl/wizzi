/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\wfschema\factory\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.factory_darvin.main';
md.gen = function(model, ctx, callback) {
    var wfschemaIttfPath = path.join(__dirname, 'ittf', 'wfschema-factory.js.ittf');
    var mTreeBuildUpContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false, 
            isWizziPackageSchema: isWizziPackageSchema(model.wzName)
        }
    };
    legacy.jsModule(wfschemaIttfPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            return callback(err);
        }
        ctx.w(result);
        callback(null, ctx);
    })
};
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
