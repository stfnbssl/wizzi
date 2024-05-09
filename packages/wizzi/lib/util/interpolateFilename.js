/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\util\interpolateFilename.js.ittf
    utc time: Thu, 09 May 2024 12:34:31 GMT
*/
'use strict';
function interpolate_filename(text, ctx) {
    var result = [];
    var pos = text.indexOf('__');
    while (pos > -1) {
        var first = text.substr(0, pos);
        var remain = text.substring(pos + 2);
        pos = remain.indexOf('__');
        if (pos > -1) {
            result.push(first);
        }
        if (ctx[remain.substr(0, pos)]) {
            result.push(ctx[remain.substr(0, pos)]);
        }
        else {
            result.push(remain.substr(0, pos));
        }
        remain = remain.substring(pos + 2);
        text = remain;
        pos = text.indexOf('__');
    }
    result.push(text);
    return result.join('');
}
module.exports = interpolate_filename;
