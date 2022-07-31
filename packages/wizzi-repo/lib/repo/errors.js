/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\repo\errors.js.ittf
*/
'use strict';
var globalErrors = require('../errors');
var utils = require('./utils');

var md = module.exports = globalErrors;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
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

