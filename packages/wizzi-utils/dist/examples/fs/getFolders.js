/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\examples\fs\getFolders.js.ittf
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


file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
    deep: false, 
    tFoldersOnly: false, 
    documentNames: false
 }, function(err, folders) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('utils.getFolders.folders', folders);
    file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
        deep: false, 
        tFoldersOnly: false, 
        documentNames: false
     }, function(err, folders) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('utils.getFoldersWithContent.folders', folders);
        file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: true
         }, function(err, folders) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('utils.getFoldersWithDocumentNames.folders', folders);
        })
    })
})
