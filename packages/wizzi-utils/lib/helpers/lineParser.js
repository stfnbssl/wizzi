/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\helpers\lineParser.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('./verify');
var regexEscape = /([$\^\\\/()|?+*\[\]{}.\-])/g;
var md = module.exports = {};
/**
        params
         string text
            string lDel
             left delimiter
            string rDel
             right delimiter
            string retType
             'tokens'
             'code'
*/
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
/**
     ignore quotes
     name = first not (blank or tab) char sequence
     value = all remaining chars after name + (blank or tab)
     example
     "trip to the london bridge"
     name() = "trip"
     value() = "to the london bridge"
*/
md.parseNameValueRaw = function(text) {
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
md.preserveSpaces = function(text) {
    if (verify.isEmpty(text)) {
        return text;
    }
    if (text[0] == ' ') {
        if (text[text.length-1] == ' ') {
            return '\\b' + text + '\\b';
        }
        else {
            return '\\b' + text;
        }
    }
    else if (text[text.length-1] == ' ') {
        return text + '\\b';
    }
    else {
        return text;
    }
}
;