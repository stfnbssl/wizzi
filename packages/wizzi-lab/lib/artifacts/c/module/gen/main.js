/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-lab\.wizzi\lib\artifacts\c\module\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');
var writers = require('./writers/index');

var myname = 'wizzi-lab.artifacts.c.package.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'c') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "c". Received: ' + model.wzElement, model))
    }
    try {
        mainStart(model, ctx)
        var item_count = 0;
        (function next() {
            var item = model.statements[item_count++];
            if (!item) {
                return terminate_gen();
            }
            writers.gen(item, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                next();
            })
        })();
    } 
    catch (ex) {
        console.log("[31m%s[0m", ex);
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen() {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            mainFinish(model, ctx)
            return callback(null, ctx);
        }
    }
}
;
function mainStart(model, ctx) {
}
function mainFinish(model, ctx) {
}
//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi-lab/lib/artifacts/c/package/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
