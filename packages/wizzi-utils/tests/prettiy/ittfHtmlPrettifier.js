/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\prettiy\ittfHtmlPrettifier.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fSystem/file');
var vfile = require('../../lib/fSystem/vfile');
var verify = require('../../lib/helpers/verify');

var file = require('../../lib/fSystem/file');
var ittfDocumentGraph = require('../../lib/ittfGraph/ittfDocumentGraph');
var ittfHtmlPrettifier = require('../../lib/pretty/ittfHtmlPrettifier');

describe("asIsLoader", function() {
    it("should load an ittf tree as is and prettify it", function(done) {
        ittfDocumentGraph.createFrom(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            ittfHtmlPrettifier(result, {}, function(err, html_lines) {
                if (err) {
                    return callback(err);
                }
                // loog 'html_lines', html_lines
                expect(html_lines).to.be.an('object');
                expect(html_lines.prettyLines).to.be.an('array');
                expect(html_lines.prettyLines.length).to.be(1);
                file.write(path.join(__dirname, 'outputs', 'basic.tests.pretty.html'), html_lines.prettyLines.join('\n'))
                done();
            })
        })
    });
    it("should load an ittf tree (by filepath ) as is and prettify it", function(done) {
        ittfHtmlPrettifier(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, html_lines) {
            if (err) {
                return callback(err);
            }
            // loog 'html_lines', html_lines
            expect(html_lines).to.be.an('object');
            expect(html_lines.prettyLines).to.be.an('array');
            expect(html_lines.prettyLines.length).to.be(1);
            file.write(path.join(__dirname, 'outputs', 'basic.tests.prettybyfile.html'), html_lines.prettyLines.join('\n'))
            done();
        })
    });
});