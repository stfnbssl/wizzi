/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\scanner\scanner.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var folderScanner = require('../../lib/scanners/folderScanner');
var root;

describe("the folderScanner module", function() {
    
    it("should scan a folder", function() {
        folderScanner.scan(path.join(__dirname, 'ittf', 'first'), {
            name: 'first', 
            gitPath: 'c:/blabla'
         }, function(err, ittfMTreeEx) {
            if (err) {
                return callback(err);
            }
            expect(ittfMTreeEx).to.be.an('object');
            ittfMTreeEx.writeFile(path.join(__dirname, 'outputs', 'first.wfpackage.ittf'), function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('err, result', err, result);
            })
        })
    });
});
