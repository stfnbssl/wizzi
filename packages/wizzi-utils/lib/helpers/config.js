/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\config.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
/**
     TODO eliminate this
    
     Config properties can be changed during the startup of the runnerServer,
     using the onConfig method of a wizzifile.js.
    
     property wfBaseFolder
     property wfJobsFolder
    
*/
var path = require('path');
var md = module.exports = {};
md.wfBaseFolder = 'c:/my/wizzi/v3';
md.wfJobsFolder = path.join(md.wfBaseFolder, 'wzjobs')
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
    md.wfJobsFolder = path.join(md.wfBaseFolder, 'wzjobs')
    ;
}