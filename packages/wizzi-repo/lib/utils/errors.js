/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\utils\errors.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:29 GMT
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
