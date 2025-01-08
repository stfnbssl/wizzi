/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\glob\sync.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/isaacs/node-glob/blob/master/sync.js
// license (ISC)
module.exports = globSync;
globSync.GlobSync = GlobSync;
var rp = require('./fs.realpath');
var minimatch = require('./minimatch');
var Minimatch = minimatch.Minimatch;
var util = require('util');
var path = require('path');
var assert = require('assert');
var isAbsolute = require('./path-is-absolute');
var common = require('./common.js');
var alphasort = common.alphasort;
var alphasorti = common.alphasorti;
var setopts = common.setopts;
var ownProp = common.ownProp;
var childrenIgnored = common.childrenIgnored;
var isIgnored = common.isIgnored;
function globSync(pattern, virtFS, options) {
    // loog 'typeof (options), arguments.length', typeof (options), arguments.length
    if ((typeof (options) === 'function') || (arguments.length === 4)) {
        throw new TypeError(('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167'));
    }
    return new GlobSync(pattern, virtFS, options).found;
}
var GlobSync = (function () {
    function GlobSync(pattern, virtFS, options) {
        _classCallCheck(this, GlobSync);
        if (!pattern) {
            throw new Error('must provide pattern');
        }
        if ((typeof (options) === 'function') || (arguments.length === 4)) {
            throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
        }
        if (!this instanceof GlobSync) {
            return new GlobSync(pattern, virtFS, options);
        }
        this.virtFS = virtFS;
        setopts(this, pattern, options);
        if (this.noprocess) {
            return this;
        }
        var n = this.minimatch.set.length;
        // loog 'pattern,this.minimatch.set', pattern, this.minimatch.set
        this.matches = new Array(n);
        for (var i = 0; i < n; i++) {
            this._process(this.minimatch.set[i], i, false)
        }
        this._finish();
    }
    GlobSync.prototype._finish = function() {
        assert(this instanceof GlobSync);
        if (this.realpath) {
            var self = this;
            this.matches.forEach(function(matchset, index) {
                var set = self.matches[index] = Object.create(null);
                for (var p in matchset) {
                    try {
                        p = self._makeAbs(p);
                        var real = rp.realpathSync(p, self.realpathCache);
                        set[real] = true;
                    } 
                    catch (er) {
                        if (er.syscall === 'stat') {
                            set[self._makeAbs(p)] = true;
                        }
                        else {
                            throw er;
                        }
                    } 
                }
            })
        }
        common.finish(this);
    }
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
        assert(this instanceof GlobSync);
        var n = 0;
        while (typeof (pattern[n]) === 'string') {
            n++;
        }
        var prefix;
        switch (n) {
            case pattern.length: {
                this._processSimple(pattern.join('/'), index)
                return ;
            }
            case 0: {
                prefix = null;
                break;
            }
            default: {
                prefix = pattern.slice(0, n).join('/');
                break;
            }
        }
        var remain = pattern.slice(n);
        // loog 'pattern, remain', pattern, '-- / --', remain
        var read;
        if (prefix === null) {
            read = '.';
        }
        else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
            if (! (prefix) || ! (isAbsolute(prefix))) {
                prefix = ('/' + prefix);
            }
            read = prefix;
        }
        else {
            read = prefix;
        }
        var abs = this._makeAbs(read);
        if (childrenIgnored(this, read)) {
            return ;
        }
        var isGlobStar = remain[0] === minimatch.GLOBSTAR;
        // loog 'read, abs, remain, isGlobStar', read, abs, remain, isGlobStar
        if (isGlobStar) {
            this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
        }
        else {
            this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
        }
    }
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
        var entries = this._readdir(abs, inGlobStar);
        if (! (entries)) {
            return ;
        }
        var pn = remain[0];
        var negate = !!this.minimatch.negate;
        var rawGlob = pn._glob;
        var dotOk = (this.dot || (rawGlob.charAt(0) === '.'));
        var matchedEntries = [];
        for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if ((e.charAt(0) !== '.') || dotOk) {
                var m;
                if (negate && ! (prefix)) {
                    m = ! (e.match(pn));
                }
                else {
                    m = e.match(pn);
                }
                if (m) {
                    matchedEntries.push(e);
                }
            }
        }
        var len = matchedEntries.length;
        if (len === 0) {
            return ;
        }
        if ((((remain.length === 1) && ! (this.mark))) && ! (this.stat)) {
            if (! (this.matches[index])) {
                this.matches[index] = Object.create(null);
            }
            for (var i = 0; i < len; i++) {
                var e = matchedEntries[i];
                if (prefix) {
                    if (prefix.slice(- (1)) !== '/') {
                        e = (((prefix + '/')) + e);
                    }
                    else {
                        e = (prefix + e);
                    }
                }
                if ((e.charAt(0) === '/') && ! (this.nomount)) {
                    e = path.join(this.root, e);
                }
                this._emitMatch(index, e);
            }
            return ;
        }
        remain.shift();
        for (var i = 0; i < len; i++) {
            var e = matchedEntries[i];
            var newPattern;
            if (prefix) {
                newPattern = [prefix, e];
            }
            else {
                newPattern = [e];
            }
            this._process(newPattern.concat(remain), index, inGlobStar)
        }
    }
    GlobSync.prototype._emitMatch = function(index, e) {
        if (isIgnored(this, e)) {
            return ;
        }
        var abs = this._makeAbs(e);
        if (this.mark) {
            e = this._mark(e);
        }
        if (this.absolute) {
            e = abs;
        }
        if (this.matches[index][e]) {
            return ;
        }
        if (this.nodir) {
            var c = this.cache[abs];
            if ((c === 'DIR') || Array.isArray(c)) {
                return ;
            }
        }
        this.matches[index][e] = true;
        if (this.stat) {
            this._stat(e);
        }
    }
    GlobSync.prototype._readdirInGlobStar = function(abs) {
        if (this.follow) {
            return this._readdir(abs, false);
        }
        var entries;
        var lstat;
        var stat;
        try {
            lstat = this.virtFS.lstatSync(abs);
        } 
        catch (er) {
            if (er.code === 'ENOENT') {
                return null;
            }
        } 
        var isSym = lstat && lstat.isSymbolicLink();
        this.symlinks[abs] = isSym;
        if ((! (isSym) && lstat) && ! (lstat.isDirectory())) {
            this.cache[abs] = 'FILE';
        }
        else {
            entries = this._readdir(abs, false);
        }
        return entries;
    }
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
        var entries;
        if (inGlobStar && ! (ownProp(this.symlinks, abs))) {
            return this._readdirInGlobStar(abs);
        }
        if (ownProp(this.cache, abs)) {
            var c = this.cache[abs];
            if (! (c) || (c === 'FILE')) {
                return null;
            }
            if (Array.isArray(c)) {
                return c;
            }
        }
        try {
            return this._readdirEntries(abs, this.virtFS.readdirSync(abs));
        } 
        catch (er) {
            this._readdirError(abs, er);
            return null;
        } 
    }
    GlobSync.prototype._readdirEntries = function(abs, entries) {
        if (! (this.mark) && ! (this.stat)) {
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                if (abs === '/') {
                    e = (abs + e);
                }
                else {
                    e = (((abs + '/')) + e);
                }
                this.cache[e] = true;
            }
        }
        this.cache[abs] = entries;
        return entries;
    }
    GlobSync.prototype._readdirError = function(f, er) {
        switch (er.code) {
            case 'ENOTSUP':
            case 'ENOTDIR': {
                var abs = this._makeAbs(f);
                this.cache[abs] = 'FILE';
                if (abs === this.cwdAbs) {
                    var error = new Error((((er.code + ' invalid cwd ')) + this.cwd));
                    error.path = this.cwd;
                    error.code = er.code;
                    throw error;
                }
                break;
            }
            case 'ENOENT':
            case 'ELOOP':
            case 'ENAMETOOLONG':
            case 'UNKNOWN': {
                this.cache[this._makeAbs(f)] = false;
                break;
            }
            default: {
                this.cache[this._makeAbs(f)] = false;
                if (this.strict) {
                    throw er;
                }
                if (! (this.silent)) {
                    console.error('glob error', er);
                }
                break;
            }
        }
    }
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
        var entries = this._readdir(abs, inGlobStar);
        if (! (entries)) {
            return ;
        }
        var remainWithoutGlobStar = remain.slice(1);
        var gspref = prefix ? [
                prefix
            ] : [];
        var noGlobStar = gspref.concat(remainWithoutGlobStar);
        this._process(noGlobStar, index, false);
        var len = entries.length;
        var isSym = this.symlinks[abs];
        if (isSym && inGlobStar) {
            return ;
        }
        for (var i = 0; i < len; i++) {
            var e = entries[i];
            if ((e.charAt(0) === '.') && ! (this.dot)) {
                continue;
            }
            var instead = gspref.concat(entries[i], remainWithoutGlobStar);
            this._process(instead, index, true);
            var below = gspref.concat(entries[i], remain);
            this._process(below, index, true);
        }
    }
    GlobSync.prototype._processSimple = function(prefix, index) {
        var exists = this._stat(prefix);
        if (! (this.matches[index])) {
            this.matches[index] = Object.create(null);
        }
        if (! (exists)) {
            return ;
        }
        if ((prefix && isAbsolute(prefix)) && ! (this.nomount)) {
            var trail = /[\/\\]$/.test(prefix);
            if (prefix.charAt(0) === '/') {
                prefix = path.join(this.root, prefix);
            }
            else {
                prefix = path.resolve(this.root, prefix);
                if (trail) {
                    prefix += '/';
                }
            }
        }
        if (process.platform === 'win32') {
            prefix = prefix.replace(/\\/g, '/');
        }
        this._emitMatch(index, prefix);
    }
    GlobSync.prototype._stat = function(f) {
        var abs = this._makeAbs(f);
        var needDir = f.slice(- (1)) === '/';
        if (f.length > this.maxLength) {
            return false;
        }
        if (! (this.stat) && ownProp(this.cache, abs)) {
            var c = this.cache[abs];
            if (Array.isArray(c)) {
                c = 'DIR';
            }
            if (! (needDir) || (c === 'DIR')) {
                return c;
            }
            if (needDir && (c === 'FILE')) {
                return false;
            }
        }
        var exists;
        var stat = this.statCache[abs];
        if (! (stat)) {
            var lstat;
            try {
                lstat = this.virtFS.lstatSync(abs);
            } 
            catch (er) {
                if (er && (((er.code === 'ENOENT') || (er.code === 'ENOTDIR')))) {
                    this.statCache[abs] = false;
                    return false;
                }
            } 
            if (lstat && lstat.isSymbolicLink()) {
                try {
                    stat = this.virtFS.statSync(abs);
                } 
                catch (er) {
                    stat = lstat;
                } 
            }
            else {
                stat = lstat;
            }
        }
        this.statCache[abs] = stat;
        var c = true;
        if (stat) {
            c = stat.isDirectory() ? 'DIR' : 'FILE';
        }
        this.cache[abs] = (this.cache[abs] || c);
        if (needDir && (c === 'FILE')) {
            return false;
        }
        return c;
    }
    GlobSync.prototype._mark = function(p) {
        return common.mark(this, p);
    }
    GlobSync.prototype._makeAbs = function(f) {
        return common.makeAbs(this, f);
    }
    return GlobSync;
})();
