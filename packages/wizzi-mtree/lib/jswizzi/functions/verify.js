/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\functions\verify.js.ittf
    utc time: Fri, 19 Apr 2024 18:46:37 GMT
*/
'use strict';
// legacy function container
// these now merged into underscore container
module.exports = {
    isEmpty: function(text) {
        return typeof text === 'string' && text.trim().length === 0;
    }, 
    isNotEmpty: function(text) {
        return typeof text === 'string' && text.trim().length > 0;
    }, 
    isObject: function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }, 
    isArray: function(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        else {
            return toString.call(obj) === '[object Array]';
        }
    }, 
    isString: function(obj) {
        return toString.call(obj) === '[object String]';
    }, 
    isNumber: function(obj) {
        return toString.call(obj) === '[object Number]';
    }, 
    isDate: function(obj) {
        return toString.call(obj) === '[object Date]';
    }, 
    isFunction: function(obj) {
        return toString.call(obj) === '[object Function]';
    }, 
    isUndefined: function(obj) {
        return obj === void 0;
    }
 };
