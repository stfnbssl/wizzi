/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\pretty\index.js.ittf
*/
'use strict';
var ittfHtmlPrettifier = require('./ittfHtmlPrettifier');
var md = module.exports = {};
md.prettifyIttfHtml = function(rootNode, options, callback) {
    ittfHtmlPrettifier(rootNode, options, callback)
}
;
md.prettifyIttfHtmlFromString = function(ittfContent, callback) {
    ittfDocumentGraph.createFrom(ittfContent, {
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
