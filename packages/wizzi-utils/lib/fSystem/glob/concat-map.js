/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\glob\concat-map.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// FROM
// Copyright
// source: https://github.com/substack/node-concat-map/blob/master/index.js
// license (MIT)
module.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) {
            res.push.apply(res, x);
        }
        else {
            res.push(x);
        }
    }
    return res;
}
;
var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};