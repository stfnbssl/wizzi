/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\mocks\errors.js.ittf
    utc time: Fri, 12 Apr 2024 14:00:19 GMT
*/
'use strict';
var md = module.exports = {};

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message;
    this.uri = uri;
    this.innerEx = innerEx;
    this.__is_error = true;
    this.message = message + '\nuri: ' + uri;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoIOError.prototype.toString = function() {
    return this.message;
}
;
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;


function InvalidRequestError(message, code) {
    this.name = 'InvalidRequestError';
    this.message = message;
    this.code = code;
    this.__is_error = true;
    console.log("[31m%s[0m", 'message', message);
    this.message = message;
    this.code = code;
    // 5/8/17 set this.stack = (new Error()).stack
}
InvalidRequestError.prototype.toString = function() {
    return this.message;
}
;
InvalidRequestError.prototype = Object.create(Error.prototype);
InvalidRequestError.prototype.constructor = InvalidRequestError;
md.InvalidRequestError = InvalidRequestError;

