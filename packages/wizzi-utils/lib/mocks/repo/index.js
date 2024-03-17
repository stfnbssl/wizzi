/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\repo\index.js.ittf
    utc time: Thu, 14 Mar 2024 20:24:16 GMT
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
