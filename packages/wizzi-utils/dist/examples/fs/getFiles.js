/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\examples\fs\getFiles.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var fsGit = require('../../lib/fs/fsGit');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');
var file = vfile();


file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
    deep: false, 
    extension: null, 
    documentContent: false
 }, function(err, files) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('utils.getFiles.files', files);
    file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
        deep: false, 
        extension: null, 
        documentContent: true
     }, function(err, files) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('utils.getFilesWithContent.files', files);
        file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
            deep: true, 
            extension: null, 
            documentContent: true
         }, function(err, files) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('utils.getFilesWithContentDeep.files', files);
        })
    })
})
