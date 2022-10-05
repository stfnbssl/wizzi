/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\utils\errors.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function RepoCollectionError(message) {
    this.name = 'RepoCollectionError';
    console.log("[31m%s[0m", 'message', message);
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoCollectionError.prototype.toString = function() {
    return this.message;
}
;
RepoCollectionError.prototype = Object.create(Error.prototype);
RepoCollectionError.prototype.constructor = RepoCollectionError;
md.RepoCollectionError = RepoCollectionError;

