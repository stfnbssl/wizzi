/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\util\interpolateFilename.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:28 GMT
*/
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
        // nothing to interpolate
        else {
            return text;
        }
        if (ctx[remain.substr(0, pos)]) {
            result.push(ctx[remain.substr(0, pos)]);
        }
        // restore; TODO test this
        else {
            result.push('__' + remain.substr(0, pos) + '__');
        }
        remain = remain.substring(pos + 2);
        text = remain;
        pos = text.indexOf('__');
    }
    result.push(text);
    return result.join('');
}
module.exports = interpolate_filename;