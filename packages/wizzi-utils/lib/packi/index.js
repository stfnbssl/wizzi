/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\packi\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var path = require('path');
var verify = require('../helpers/verify');
var vfile = require('../fSystem/vfile');
var md = module.exports = {};

md.filePrefix = "json:/";

md.ensurePackiFilePrefix = function(filePath) {
    var newFilePath = normalizePath(filePath);
    return newFilePath.startsWith(md.filePrefix) ? newFilePath : md.filePrefix + newFilePath;
}
;

md.packiFilesToFs = function(folderPath, packiFiles, options, callback) {
    options = options || {};
    if (options.file) {
        execPackiFilesToFs(options.file, folderPath, packiFiles, options, callback)
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            execPackiFilesToFs(file, folderPath, packiFiles, options, callback)
        })
    }
}
;

function execPackiFilesToFs(vfile, folderPath, packiFiles, options, callback) {
    const packiNames = Object.keys(packiFiles);
    function doWrite(ndx) {
        const packiName = packiNames[ndx];
        if (!packiName) {
            return callback(null);
        }
        const filePath = path.join(folderPath, packiName);
        vfile.write(filePath, packiFiles[packiName].contents, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            doWrite(ndx + 1)
        })
    }
    return doWrite(0);
}

function normalizePath(path) {
    return path.replace(/\\/g, '/');
}