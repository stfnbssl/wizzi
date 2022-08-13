/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\fy.js.ittf
    utc time: Fri, 12 Aug 2022 16:51:08 GMT
*/
'use strict';
const path = require('path');
const fs = require('fs');
const wizziUtils = require('wizzi-utils');
const verify = wizziUtils.verify;
const file = wizziUtils.file;
const wizziTools = require('../../../wizzi-tools/dist/index');
const help = require('./help');
module.exports = (args) => {

    let currentDir = process.cwd();
    let source = args.source || args.s;
    let dest = args.dest || args.d;
    // loog 'fy.source.dest', source, dest
    var sourcePath, destPath, sourceIsFolder;
    if (source && source.length > 0) {
        if (verify.isAbsolutePath(source)) {
            sourcePath = source;
        }
        else {
            sourcePath = path.join(currentDir, source);
        }
        if (!file.exists(sourcePath)) {
            console.log("[31m%s[0m", 'Invalid options for `fy` command.');
            console.log("[31m%s[0m", 'Source path not found', source);
            help({_:['help', 'fy']});
            return ;
        }
        sourceIsFolder = file.isDirectory(sourcePath);
        if (dest && dest.length > 0) {
            if (verify.isAbsolutePath(dest)) {
                destPath = dest;
            }
            else {
                destPath = path.join(currentDir, dest);
            }
        }
        if (!file.exists(path.dirname(destPath))) {
            console.log("[31m%s[0m", 'Invalid options for `fy` command.');
            console.log("[31m%s[0m", 'Destination path dirname not found', dest);
            help({_:['help', 'fy']});
            return ;
        }
        if (file.isFile(destPath) && sourceIsFolder) {
            console.log("[31m%s[0m", 'Invalid options for `fy` command.');
            console.log("[31m%s[0m", 'Source path is a folder, destination path cannot be a filename', dest);
            help({_:['help', 'fy']});
            return ;
        }
        if (file.isDirectory(destPath) && !sourceIsFolder) {
            destPath = path.join(destPath, path.basename(sourcePath) + '.ittf')
            ;
        }
        
        // loog 'ok. source && dest are folders'
        if (sourceIsFolder) {
            wizziTools.importFolder(sourcePath, destPath, (err, result) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                // loog 'Wizzify folder result', result
            }
            )
        }
        // loog 'ok. source && dest are files'
        else {
            var extension = path.extname(sourcePath);
            var schema;
            extension = extension.substr(1);
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
            wizziTools.wizzify(schema, file.read(sourcePath), (err, result) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                file.write(destPath, result);
                // loog 'Wizzify file', result
            }
            )
        }
    }
    else {
        console.log("[31m%s[0m", 'Invalid options for `fy` command.');
        help({_:['help', 'fy']});
    }
}
;
