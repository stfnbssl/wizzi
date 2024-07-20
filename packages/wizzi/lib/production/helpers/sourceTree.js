/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\helpers\sourceTree.js.ittf
    utc time: Wed, 03 Jul 2024 03:19:11 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('@wizzi/utils').verify;
module.exports = function(wzmodel, filepath, wzrepoRootPath) {
    var filepath_norm = verify.isString(filepath) ? verify.replaceAll(path.dirname(filepath), '\\', '/') : null;
    var wzrepoRootPath_norm = verify.isString(wzrepoRootPath) ? verify.replaceAll(wzrepoRootPath, '\\', '/') : null;
    var source,
        fullPath,
        relPath,
        wzpath,
        ret = {
            kind: '$sourcetree', 
            filepath: filepath, 
            sources: []
         };
    var sources = wzmodel.loadHistory.sources;
    for (var k in sources) {
        fullPath = sources[k].filepath;
        if (filepath_norm) {
            fullPath_norm = verify.replaceAll(fullPath, '\\', '/');
            relPath = fullPath_norm.substr(filepath_norm.length + 1);
            wzpath = fullPath_norm.substr(wzrepoRootPath_norm.length + 1);
        }
        source = {
            kind: '$source', 
            key: k, 
            filepath: fullPath, 
            relPath: relPath, 
            wzpath: wzpath
         };
        ret.sources.push(source);
    }
    return ret;
}
;