/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\glob\wrappy.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/npm/wrappy/blob/master/wrappy.js
// license (ISC)
module.exports = wrappy;
function wrappy(fn, cb) {
    if (fn && cb) {
        return wrappy(fn)(cb)
        ;
    }
    if (typeof(fn) !== 'function') {
        throw new TypeError('need wrapper function');
    }
    Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
    })
    return wrapper;
    function wrapper() {
        var ret = fn.apply(this, arguments);
        var cb = arguments[(arguments.length - 1)];
        if (typeof (ret) === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function(k) {
                ret[k] = cb[k];
            })
        }
        return ret;
    }
}