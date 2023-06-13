/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\lineParser.js.ittf
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
//
md.parseNameValueRaw = function(text, node) {
    var name = '',
        value = '';
    if (verify.isNotEmpty(text)) {
        var ch,
            state = 0,
            l = text.length;
        for (var i = 0; i < l; i++) {
            ch = text[i];
            if (ch == ' ' || ch == '\t') {
                if (state == 0) {
                    ;
                }
                else if (state == 1) {
                    state = 2;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
            else {
                if (state == 0) {
                    name = ch;
                    state = 1;
                }
                else if (state == 1) {
                    name += ch;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
        }
    }
    return {
            name: function() {
                return name;
            }, 
            value: function() {
                return value;
            }, 
            hasValue: function() {
                return value.length > 0;
            }
         };
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
