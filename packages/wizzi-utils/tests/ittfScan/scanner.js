/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\ittfScan\scanner.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ittfScanner = require('../../lib/ittfScanner/index');
var root;

describe("the folderScanner module", function() {
    
    it("should scan a folder", function(done) {
        ittfScanner.scanFolder(path.join(__dirname, 'ittf', 'first'), {
            name: 'first', 
            gitPath: 'c:/blabla'
         }, function(err, ittfDocumentGraph) {
            if (err) {
                return callback(err);
            }
            expect(ittfDocumentGraph).to.be.an('object');
            ittfDocumentGraph.writeFile(path.join(__dirname, 'outputs', 'first.wfpackage.ittf'), function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('err, result', err, result);
                done();
            })
        })
    });
});