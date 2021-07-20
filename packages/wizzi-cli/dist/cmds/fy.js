/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\fy.js.ittf
    utc time: Tue, 20 Jul 2021 11:08:44 GMT
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
    console.log('fy.source.dest', source, dest);
    var sourcePath, destPath, sourceIsFolder;
    if (source && source.length > 0) {
        if (verify.isAbsolutePath(source)) {
            sourcePath = source;
        }
        else {
            sourcePath = path.join(currentDir, source);
        }
        if (!file.exists(sourcePath)) {
            console.log('Invalid options for `fy` command.');
            console.log('Source path not found', source);
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
            console.log('Invalid options for `fy` command.');
            console.log('Destination path dirname not found', dest);
            help({_:['help', 'fy']});
            return ;
        }
        if (file.isFile(destPath) && sourceIsFolder) {
            console.log('Invalid options for `fy` command.');
            console.log('Source path is a folder, destination path cannot be a filename', dest);
            help({_:['help', 'fy']});
            return ;
        }
        if (file.isDirectory(destPath) && !sourceIsFolder) {
            destPath = path.join(destPath, path.basename(sourcePath) + '.ittf')
            ;
        }
        if (sourceIsFolder) {
            console.log('ok. source && dest are folders');
            wizziTools.importFolder(sourcePath, destPath, (err, result) => {
            
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('Wizzify folder result', result);
            }
            )
        }
        else {
            console.log('ok. source && dest are files');
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
                    console.log('err', err);
                    throw new Error(err.message);
                }
                file.write(destPath, result);
                console.log('Wizzify file', result);
            }
            )
        }
    }
    else {
        console.log('Invalid options for `fy` command.');
        help({_:['help', 'fy']});
    }
}
;
