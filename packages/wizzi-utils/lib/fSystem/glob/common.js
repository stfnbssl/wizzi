/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\glob\common.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source: https://github.com/isaacs/node-glob/blob/master/common.js
// license (ISC)
exports.alphasort = alphasort;
exports.alphasorti = alphasorti;
exports.setopts = setopts;
exports.ownProp = ownProp;
exports.makeAbs = makeAbs;
exports.finish = finish;
exports.mark = mark;
exports.isIgnored = isIgnored;
exports.childrenIgnored = childrenIgnored;
function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
}
var path = require("path");
var minimatch = require("./minimatch");
var isAbsolute = require("./path-is-absolute");
var Minimatch = minimatch.Minimatch;
function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
    ;
}
function alphasort(a, b) {
    return a.localeCompare(b);
}
function setupIgnores(self, options) {
    self.ignore = (options.ignore || []);
    if (! (Array.isArray(self.ignore))) {
        self.ignore = [self.ignore];
    }
    if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
    }
}
function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(- (3)) === '/**') {
        var gpattern = pattern.replace(/(\/\*\*)+$/, '');
        gmatcher = new Minimatch(gpattern, {dot: true});
    }
    return {
            matcher: new Minimatch(pattern, {
                dot: true
             }), 
            gmatcher: gmatcher
         };
}
function setopts(self, pattern, options) {
    if (! (options)) {
        options = {};
    }
    if (options.matchBase && (- (1) === pattern.indexOf("/"))) {
        if (options.noglobstar) {
            throw new Error("base matching requires globstar");
        }
        pattern = ("**/" + pattern);
    }
    self.silent = ! (! (options.silent));
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = ! (! (options.realpath));
    self.realpathCache = (options.realpathCache || Object.create(null));
    self.follow = ! (! (options.follow));
    self.dot = ! (! (options.dot));
    self.mark = ! (! (options.mark));
    self.nodir = ! (! (options.nodir));
    if (self.nodir) {
        self.mark = true;
    }
    self.sync = ! (! (options.sync));
    self.nounique = ! (! (options.nounique));
    self.nonull = ! (! (options.nonull));
    self.nosort = ! (! (options.nosort));
    self.nocase = ! (! (options.nocase));
    self.stat = ! (! (options.stat));
    self.noprocess = ! (! (options.noprocess));
    self.absolute = ! (! (options.absolute));
    self.maxLength = (options.maxLength || Infinity);
    self.cache = (options.cache || Object.create(null));
    self.statCache = (options.statCache || Object.create(null));
    self.symlinks = (options.symlinks || Object.create(null));
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (! (ownProp(options, "cwd"))) {
        self.cwd = cwd;
    }
    else {
        self.cwd = path.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
    }
    self.root = (options.root || path.resolve(self.cwd, "/"));
    self.root = path.resolve(self.root);
    if (process.platform === "win32") {
        self.root = self.root.replace(/\\/g, "/");
    }
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32") {
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    }
    self.nomount = ! (! (options.nomount));
    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
}
function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);
    ;
    for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
            if (self.nonull) {
                var literal = self.minimatch.globSet[i];
                if (nou) {
                    all.push(literal);
                }
                else {
                    all[literal] = true;
                }
            }
        }
        else {
            var m = Object.keys(matches);
            if (nou) {
                all.push.apply(all, m);
            }
            else {
                m.forEach(function(m) {
                    all[m] = true;
                })
            }
        }
    }
    if (!nou) {
        all = Object.keys(all);
    }
    if (!self.nosort) {
        all = all.sort(self.nocase ? alphasorti : alphasort);
    }
    if (self.mark) {
        for (var i = 0; i < all.length; i++) {
            all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
            all = all.filter(function(e) {
                var notDir = ! (/\/$/.test(e));
                var c = (self.cache[e] || self.cache[makeAbs(self, e)]);
                if (notDir && c) {
                    notDir = ((c !== 'DIR') && ! (Array.isArray(c)));
                }
                return notDir;
            })
            ;
        }
    }
    if (self.ignore.length) {
        all = all.filter(function(m) {
            return ! (isIgnored(self, m));
        })
        ;
    }
    self.found = all;
}
function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
        var isDir = ((c === 'DIR') || Array.isArray(c));
        var slash = p.slice(- (1)) === '/';
        if (isDir && ! (slash)) {
            m += '/';
        }
        else if (! (isDir) && slash) {
            m = m.slice(0, - (1));
        }
        if (m !== p) {
            var mabs = makeAbs(self, m);
            self.statCache[mabs] = self.statCache[abs];
            self.cache[mabs] = self.cache[abs];
        }
    }
    return m;
}
function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === '/') {
        abs = path.join(self.root, f);
    }
    else if (isAbsolute(f) || (f === '')) {
        abs = f;
    }
    else if (self.changedCwd) {
        abs = path.resolve(self.cwd, f);
    }
    else {
        abs = path.resolve(f);
    }
    if (process.platform === 'win32') {
        abs = abs.replace(/\\/g, '/');
    }
    // loog '***** wizzi-utils.glob.common.makeAbs.abs', abs
    return abs;
}
function isIgnored(self, path) {
    if (! (self.ignore.length)) {
        return false;
    }
    return self.ignore.some(function(item) {
            return ( item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path)) );
        });
}
function childrenIgnored(self, path) {
    if (!self.ignore.length) {
        return false;
    }
    return self.ignore.some(function(item) {
            return !!(item.gmatcher && item.gmatcher.match(path));
        });
}