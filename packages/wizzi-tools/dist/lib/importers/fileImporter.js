/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\importers\fileImporter.js.ittf
*/
'use strict';
var path = require('path');
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var packageRoot = require('../../index');
function importFile(filePath, baseImportPath, baseExportPath, vfile, callback) {
    if (typeof callback === 'undefined') {
        callback = vfile;
        // vfile() defaults to local filesystem
        vfile = wizziUtils.vfile();
    }
    const dirname = path.dirname(filePath);
    const basename = path.basename(filePath);
    var extension = path.extname(filePath);
    var name = basename.substr(0, basename.length - extension.length);
    var schema;
    extension = extension.substr(1);
    var filePathNorm = verify.replaceAll(filePath, '\\', '/');
    var baseImportPathNorm = verify.replaceAll(baseImportPath, '\\', '/');
    var baseExportPathNorm = verify.replaceAll(baseExportPath, '\\', '/');
    var folderNorm = dirname.substr(baseImportPathNorm.length + 1);
    // log 'importFile', baseImportPath, folderNorm, name, schema, extension
    var source = vfile.read(filePath);
    var isVue = false;
    if (extension.toLowerCase() === 'vue') {
        source = '<vue>' + source + '</vue>';
        schema = 'html';
        isVue = true;
    }
    else if (extension.toLowerCase() === 'tsx') {
        schema = 'ts';
    }
    else if (extension.toLowerCase() === 'jsx') {
        schema = 'js';
        extension = 'js';
    }
    else {
        schema = extension;
    }
    if (!packageRoot.canBeWizzified(schema)) {
        // log '0', folderNorm, basename
        if (folderNorm.length > 0) {
            vfile.write(path.join(baseExportPathNorm, folderNorm, basename), source, callback)
        }
        else {
            vfile.write(path.join(baseExportPathNorm, basename), source, callback)
        }
    }
    else {
        var options = {};
        if (isVue) {
            options = {
                embedTag: 'vue', 
                isForVue: true
            };
        }
        console.log(' --- wizzify from ' + filePath);
        console.log('             schema ' + schema);
        packageRoot.wizzify(schema, source, options, function(err, result) {
            var outpath;
            if (folderNorm.length > 0) {
                // log '1', folderNorm, name + '.' + extension + '.ittf'
                outpath = path.join(baseExportPathNorm, folderNorm, name + '.' + extension + '.ittf');
            }
            else {
                // log '2', folderNorm, name + '.' + extension + '.ittf'
                outpath = path.join(baseExportPathNorm, name + '.' + extension + '.ittf');
            }
            console.log('             to ' + outpath);
            if (err) {
                console.log('Error', outpath, err);
                vfile.write(outpath, err, callback)
            }
            else {
                vfile.write(outpath, result, callback)
            }
        })
    }
}
module.exports = importFile;
