/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\util\interpolate.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
/**
     port of http://www.bbc.co.uk/glow/docs/1.7/api/glow.lang.shtml#interpolate
     Modified to be stand-alone and offer support for delimters of random length
     @description Replaces placeholders in a string with data from an object
     @param {String} template The string containing {placeholders}
     @param {Object} data Object containing the data to be merged in to the template
     The object can contain nested data objects and arrays, with nested object properties and array elements are accessed using dot notation. eg foo.bar or foo.0.
     The data labels in the object cannot contain characters used in the template delimiters, so if the data must be allowed to contain the default { and } delimiters, the delimters must be changed using the option below.
     @param {Object} opts Options object {
     # @param {String} [opts.delimiter="{}"] Alternative label delimiter(s) for the template.
     Needs to be symmetric, i.e. '{{}}', '<%%>'
     }
     @returns {String}
*/
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
                    if (val && keyParts[i] in val) {
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