/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\object.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// usefull: https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
var verify = require('./verify');

var md = module.exports = {};

function clone(obj, objects, path) {
    var objects = objects || new WeakMap();
    if (verify.isArray(obj)) {
        var ret = [];
        var i, i_items=obj, i_len=obj.length, item;
        for (i=0; i<i_len; i++) {
            item = obj[i];
            var value = clone(item, objects, path + "[" + i + "]");
            if (value !== null) {
                ret.push(value);
            }
        }
        return ret;
    }
    else if (verify.isObject(obj)) {
        var old_path = objects.get(obj);
        if (old_path !== undefined) {
            return {
                    $ref: old_path
                 };
        }
        objects.set(obj, path);
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[prop] = clone(obj[prop], objects, path + "[" + JSON.stringify(prop) + "]");
            }
        }
        return ret;
    }
    else {
        return obj;
    }
}
md.decycle = function(obj) {
    return clone(obj, null, '');
}
;