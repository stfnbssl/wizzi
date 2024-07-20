/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\mongodb\errors.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:29 GMT
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    console.log("[31m%s[0m", 'message', message);
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
NotImplementedError.prototype.toString = function() {
    return this.message;
}
;
NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.constructor = NotImplementedError;
md.NotImplementedError = NotImplementedError;


function InvalidRequestError(message, code) {
    this.name = 'InvalidRequestError';
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

function FsItemNotFoundError(resourceType, uri) {
    this.name = 'FsItemNotFoundError';
    this.message = resourceType + ': ' + uri + ' not found ';
    // 5/8/17 set this.stack = (new Error()).stack
}
FsItemNotFoundError.prototype.toString = function() {
    return this.message;
}
;
FsItemNotFoundError.prototype = Object.create(Error.prototype);
FsItemNotFoundError.prototype.constructor = FsItemNotFoundError;
md.FsItemNotFoundError = FsItemNotFoundError;
