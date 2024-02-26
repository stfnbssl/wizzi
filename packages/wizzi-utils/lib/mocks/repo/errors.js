/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\repo\errors.js.ittf
    utc time: Mon, 26 Feb 2024 20:29:01 GMT
*/
'use strict';
var globalErrors = require('../errors');

var md = module.exports = globalErrors;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message + '\nuri: ' + uri;
}
RepoIOError.prototype.toString = function() {
    return this.message;
}
;
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

