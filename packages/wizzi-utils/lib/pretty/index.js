/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\pretty\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var IttfDocumentGraph = require('../ittfGraph/ittfDocumentGraph');
var ittfHtmlPrettifier = require('./ittfHtmlPrettifier');
var md = module.exports = {};
md.prettifyIttfHtml = function(rootNode, options, callback) {
    ittfHtmlPrettifier(rootNode, options, callback)
}
;
md.prettifyIttfHtmlFromString = function(ittfContent, callback) {
    IttfDocumentGraph.createFrom(ittfContent, {
        fromString: true
     }, function(err, mTree) {
        if (err) {
            return callback(err);
        }
        ittfHtmlPrettifier(mTree, {}, function(err, pretty) {
            if (err) {
                return callback(err);
            }
            return callback(null, pretty.prettyLines.join('\n'));
        })
    })
}
;