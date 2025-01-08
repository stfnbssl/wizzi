/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\option.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
/**
     TODO eliminate this
    
*/
var data = {};
var option = module.exports = function(key, value) {
    var no = key.match(/^no-(.+)$/);
    if (arguments.length === 2) {
        return data[key] = value;
    }
    else if (no) {
        return data[no[1]] === false;
    }
    else {
        return data[key];
    }
}
;
option.init = function(obj) {
    return data = (obj || {});
}
;