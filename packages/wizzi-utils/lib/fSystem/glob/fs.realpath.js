/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\glob\fs.realpath.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source: https://github.com/isaacs/fs.realpath/blob/master/index.js
// license (ISC) https://github.com/isaacs/fs.realpath/blob/master/LICENSE
module.exports = realpath;
realpath.realpath = realpath;
realpath.sync = realpathSync;
realpath.realpathSync = realpathSync;
realpath.monkeypatch = monkeypatch;
realpath.unmonkeypatch = unmonkeypatch;
var fs = require('fs');
var origRealpath = fs.realpath;
var origRealpathSync = fs.realpathSync;
var version = process.version;
var ok = /^v[0-5]\./.test(version);
var old = require('./old.js');
function newError(er) {
    return (((er && (er.syscall === 'realpath'))) && (((((er.code === 'ELOOP') || (er.code === 'ENOMEM'))) || (er.code === 'ENAMETOOLONG'))));
}
function realpath(p, cache, cb) {
    if (ok) {
        return origRealpath(p, cache, cb);
    }
    if (typeof (cache) === 'function') {
        cb = cache;
        cache = null;
    }
    origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
            old.realpath(p, cache, cb);
        }
        else {
            cb(er, result);
        }
    })
}
function realpathSync(p, cache) {
    if (ok) {
        return origRealpathSync(p, cache);
    }
    try {
        return origRealpathSync(p, cache);
    } 
    catch (er) {
        if (newError(er)) {
            return old.realpathSync(p, cache);
        }
        else {
            throw er;
        }
    } 
}
function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
}
function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
}