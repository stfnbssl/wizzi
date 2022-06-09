/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\ittf\tojson\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var stringify = require('json-stringify-safe');

var md = module.exports = {};
var myname = 'ittf.tojson.main';

md.gen = function(model, ctx, callback) {
    var json = {
        children: [
            
        ]
    };
    toJson(model, json)
    ctx.w(stringify(json, null, 2))
    callback(null, ctx);
};
function toJson(node, json) {
    var n = node.n || node.name;
    var v = node.v || node.value || '';
    if (n == '---' && v.length == 0) {
    }
    else if (n == '\\---' && v.length == 0) {
        json.name = '---';
    }
    else {
        json.name = n;
    }
    if (v.length > 0) {
        json.value = v;
    }
    if (node.children && node.children.length > 0) {
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            var jsonChild = {
                children: [
                    
                ]
            };
            toJson(child, jsonChild)
            json.children.push(jsonChild)
        }
    }
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/ittf/tojson', 
            message: message
        };
}
