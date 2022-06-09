/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\json\export\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var stringify = require('json-stringify-safe');

var md = module.exports = {};
var myname = 'json.export.main';

md.gen = function(model, ctx, callback) {
    var json;
    if (model.toJson) {
        json = model.toJson();
    }
    else {
        return callback(error('The model has no toJson method'));
    }
    ctx.w(stringify(json, null, 4))
    callback(null, ctx);
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/json/export', 
            message: message
        };
}
