/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\lineparser.js.ittf
*/
'use strict';
var verify = require('./verify');
var regexEscape = /([$\^\\\/()|?+*\[\]{}.\-])/g;
var md = module.exports = {};
//
md.codifyInterpolation = function(template, lDel, rDel) {
    if (verify.isEmpty(template)) {
        return '';
    }
    var lDelLen = lDel.length;
    var rDelLen = rDel.length;
    lDel = lDel.replace(regexEscape, "\\$1");
    rDel = rDel.replace(regexEscape, "\\$1");
    var regex = new RegExp(lDel + "[^" + lDel + rDel + "]+" + rDel, "g");
    return template.replace(regex, function(placeholder) {
            // loog '==================== codifyInterpolation.placeholder', placeholder
            var key = placeholder.slice(lDelLen, -rDelLen);
            return '" + ' + key + ' + "';
        });
}
;
function match(text, pos, test) {
    for (var i=0; i<test.length; i++) {
        if (test[i] !== text[pos+i]) {
            return false;
        }
    }
    return true;
}
function escapename(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"');
    }
    else {
        return value;
    }
}
