/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\tests\mocks\util\interpolate.js.ittf
*/
'use strict';
//
function interpolate(template, data, opts) {
    var regex,
        lDel,
        rDel,
        delLen,
        lDelLen,
        rDelLen,
        delimiter,
        regexEscape = /([$\^\\\/()|?+*\[\]{}.\-])/g;
    opts = (opts || {});
    delimiter = (opts.delimiter || '{}');
    delLen = delimiter.length;
    lDelLen = Math.ceil(delLen / 2);
    rDelLen = delLen - lDelLen;
    lDel = delimiter.substr(0, lDelLen).replace(regexEscape, "\\$1");
    rDel = delimiter.substr(lDelLen, delLen).replace(regexEscape, "\\$1") || lDel;
    regex = new RegExp(lDel + "[^" + lDel + rDel + "]+" + rDel, "g");
    return template.replace(regex, function(placeholder) {
            var key = placeholder.slice(lDelLen, -rDelLen),
                keyParts = key.split("."),
                val,
                i = 0,
                len = keyParts.length;
            if (key in data) {
                val = data[key];
            }
            else {
                val = data;
                for (; i<len; i++) {
                    if (keyParts[i] in val) {
                        val = val[keyParts[i]];
                    }
                    else {
                        return placeholder;
                    }
                }
            }
            return val;
        });
}
module.exports = interpolate;
