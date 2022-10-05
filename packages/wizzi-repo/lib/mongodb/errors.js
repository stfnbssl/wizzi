/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\mongodb\errors.js.ittf
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

