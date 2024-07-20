/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\repo\utils.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:29 GMT
*/
'use strict';
var md = module.exports = {};
md.getSrcPathInfo = function(srcPath) {
    if (typeof (srcPath) === 'string') {
        return srcPath;
    }
    if (srcPath && (typeof (srcPath) === 'object')) {
        var msg = md.getSrcPathInfoFromNode(srcPath);
        return msg ? msg : srcPath.toString();
        ;
    }
    return 'unavailable';
}
;
md.getSrcPathInfoFromNode = function(node) {
    var msg = [];
    if (node) {
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
    }
    return msg.length == 0 ? null : msg.join('');
    ;
}
;