/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var file = require('./file');
var vfile = require('./vfile');
var uriParser = require('./uriParser');
var glob = require('./glob/index');
var fsUtils = require('./utils');
var md = module.exports = {};
md.file = file;
md.vfile = vfile;
md.uriParser = uriParser;
md.glob = glob;
md.fileInfoByPath = fsUtils.fileInfoByPath;
md.fsFolderToPackiFiles = function(folderPath, callback) {
    const fsFile = vfile();
    fsFile.getFiles(folderPath, {
        deep: true, 
        documentContent: true
     }, function(err, files) {
        if (err) {
            return callback(err);
        }
        const packiFiles = {};
        var i, i_items=files, i_len=files.length, file;
        for (i=0; i<i_len; i++) {
            file = files[i];
            packiFiles[file.relPath] = {
                type: 'CODE', 
                contents: file.content
             };
        }
        return callback(null, packiFiles);
    })
}
;