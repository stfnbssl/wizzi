/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\fSystem\utils.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var path = require('path');
var verify = require('../helpers/verify');
var md = module.exports = {};
md.fileInfoByPath = function(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = ss.slice(0, ss.length-2).join('.');
        var schema = ss[ss.length-2];
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                extension: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + schema, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + name + '.' + schema : name + '.' + schema, 
                seedname: ss.slice(0, -2).join('.')
             };
    }
    else {
        return {
                name: ss.slice(0, ss.length-1).join('.'), 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                extension: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + basename : basename, 
                seedname: basename
             };
    }
}
;
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}