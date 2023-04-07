/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\repo\index.js.ittf
*/
'use strict';
var FileSystemStore = require('./fileSystemStore');
var md = module.exports = {};
md.getCreateFilesystemStore = function getCreateFilesystemStore() {
    return function createStore(callback) {
            var store = new FileSystemStore();
            return callback(null, store);
        };
}
;
