/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\config.js.ittf
*/
'use strict';
//
var path = require('path');
var md = module.exports = {};
md.wfBaseFolder = 'c:/my/wizzi/v3';
md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs')
;
md.get = function(key, defaultValue) {
    if (typeof(md[key]) === 'undefined' && typeof(defaultValue) !== 'undefined') {
        return defaultValue;
    }
    else {
        return md[key];
    }
}
;
md.set = function(key, value) {
    md[key] = value;
    onChange();
}
;
function onChange() {
    md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs')
    ;
}
