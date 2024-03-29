/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\helpers\sourceTree.js.ittf
    utc time: Sun, 17 Mar 2024 16:14:48 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('@wizzi/utils').verify;
module.exports = function(wzmodel, filepath, wzrepoRootPath) {
    var filepath_norm = verify.isString(filepath) ? verify.replaceAll(path.dirname(filepath), '\\', '/') : null;
    var wzrepoRootPath_norm = verify.isString(wzrepoRootPath) ? verify.replaceAll(wzrepoRootPath, '\\', '/') : null;
    var source,
        fullpath,
        relpath,
        wzpath,
        ret = {
            kind: '$sourcetree', 
            filepath: filepath, 
            sources: []
         };
    var sources = wzmodel.loadHistory.sources;
    for (var k in sources) {
        fullpath = sources[k].filepath;
        if (filepath_norm) {
            fullpath_norm = verify.replaceAll(fullpath, '\\', '/');
            relpath = fullpath_norm.substr(filepath_norm.length + 1);
            wzpath = fullpath_norm.substr(wzrepoRootPath_norm.length + 1);
        }
        source = {
            kind: '$source', 
            key: k, 
            filepath: fullpath, 
            relpath: relpath, 
            wzpath: wzpath
         };
        ret.sources.push(source);
    }
    return ret;
}
;
