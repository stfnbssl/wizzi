/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-lab\.wizzi\lib\artifacts\rdbms\jsonmodel_persister\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'rdbms.jsonmodel_persister.main';
md.gen = function(model, ctx, callback) {
    wizzi.fsFactory({
        plugins: {
            items: [
                'wizzi-core', 
                'wizzi-js'
            ]
         }
     }, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'jsonmodel_persister.js.ittf'), {
            modelRequestContext: {
                table: model.table
             }, 
            artifactRequestContext: {}
         }, 'js/module', function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // loog 'jsoncrud.artifactText', artifactText
            ctx.w(artifactText);
            return callback(null, ctx);
        })
    })
}
;
