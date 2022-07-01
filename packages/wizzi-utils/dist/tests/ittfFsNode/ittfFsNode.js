/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\ittfFsNode\ittfFsNode.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var mtree = require('wizzi-mtree');
var file = require('wizzi-utils').file;
var vfile = require('wizzi-utils').vfile;
var verify = require('wizzi-utils').verify;
var mocks = require('wizzi-utils').mocks;

var ittfGraph = require('../../lib/ittfGraph/index');
var ittfScanner = require('../../lib/ittfScanner/index');

var folderPath = path.join(__dirname, 'ittf');
function __createRoot(callback) {
    vfile(function(err, file) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        var root = new ittfScanner.IttfFsNode(folderPath, null, {
            isDirectory: true, 
            file: file
         });
        // log 'root', root
        callback(null, root)
    })
}
function unixifyPath(path_string) {
    var win32 = process.platform === 'win32';
    if (win32) {
        return path_string.replace(/\\/g, '/');
    }
    else {
        return path_string;
    }
}

describe("ittFsNode", function() {
    
    it("should add a document", function(done) {
        __createRoot(function(err, root) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            var documentPath = path.join(folderPath, 'readme.tests.ittf');
            var added = root.addDocument(documentPath);
            // log '-------------- should add a document, added', added
            expect(added).to.be.an('object');
            expect(root.folders).to.be.an('array');
            expect(root.folders.length).to.be(0);
            expect(root.documents).to.be.an('array');
            expect(root.documents.length).to.be(1);
            expect(root.documents[0].schema).to.be.a('string');
            expect(root.documents[0].schema).to.be('tests');
            expect(root.documents[0].isFragment).to.be(false);
            expect(root.documents[0].path).to.be.a('string');
            expect(root.documents[0].path).to.be(unixifyPath(documentPath));
            expect(root.documents[0].dirname).to.be.a('string');
            expect(root.documents[0].dirname).to.be(unixifyPath(folderPath));
            expect(root.documents[0].basename).to.be.a('string');
            expect(root.documents[0].basename).to.be('readme.tests.ittf');
            done();
        })
    });
    it("should add a document fragment", function(done) {
        __createRoot(function(err, root) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            var document1Path = path.join(folderPath, 'readme.tests.ittf');
            var added1 = root.addDocument(document1Path);
            var document2Path = path.join(folderPath, 't', 'title.tests.ittf');
            var added2 = root.addDocument(document2Path);
            // log 'root', root
            expect(added1).to.be.an('object');
            expect(added2).to.be.an('object');
            expect(root.folders).to.be.an('array');
            expect(root.folders.length).to.be(1);
            expect(root.documents).to.be.an('array');
            expect(root.documents.length).to.be(1);
            expect(root.folders[0].isTFolder).to.be(true);
            expect(root.folders[0].basename).to.be.a('string');
            expect(root.folders[0].basename).to.be('t');
            expect(root.folders[0].documents).to.be.an('array');
            expect(root.folders[0].documents.length).to.be(1);
            expect(root.folders[0].documents[0].basename).to.be.a('string');
            expect(root.folders[0].documents[0].basename).to.be('title.tests.ittf');
            expect(root.folders[0].documents[0].dirname).to.be.a('string');
            expect(root.folders[0].documents[0].dirname).to.be(unixifyPath(folderPath)+'/t');
            expect(root.folders[0].documents[0].schema).to.be.a('string');
            expect(root.folders[0].documents[0].schema).to.be('tests');
            expect(root.folders[0].documents[0].isFragment).to.be(true);
            done();
        })
    });
    it("should check infos", function(done) {
        __createRoot(function(err, root) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            var document1Path = path.join(folderPath, 'readme.tests.ittf');
            var added1 = root.addDocument(document1Path);
            // log 'root', root
            var document2Path = path.join(folderPath, 't', 'title.tests.ittf');
            var added2 = root.addDocument(document2Path);
            // log 'root.info 1', root.info
            root.setInfo(function(err, root) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                // log 'root', root
                // log 'root.info 2', root.info
                expect(root.info.schemas).to.be.an('object');
                expect(Object.keys(root.info.schemas).length).to.be(1);
                expect(root.info.schemas['tests'].name).to.be.a('string');
                expect(root.info.schemas['tests'].name).to.be('tests');
                expect(root.info.test.documents).to.be.an('array');
                expect(root.info.test.documents.length).to.be(1);
                done();
            })
        })
    });
    it("should write an ittf", function(done) {
        __createRoot(function(err, root) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            var document1Path = path.join(folderPath, 'readme.tests.ittf');
            var added1 = root.addDocument(document1Path);
            // log 'root', root
            var document2Path = path.join(folderPath, 't', 'title.tests.ittf');
            var added2 = root.addDocument(document2Path);
            // log 'root', root
            ittfGraph.createIttfDocumentGraphFrom(null, {
                name: 'wzpackage', 
                createEmpty: true
             }, function(err, ittfDocumentGraph) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                root.analize(function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    root.toIttf(ittfDocumentGraph);
                    ittfDocumentGraph.writeFile(path.join(__dirname, 'outputs', 'test.wzpackage.ittf'), function(err, result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        done();
                    })
                })
            })
        })
    });
});

function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
             }), 
            file: file, 
            verify: verify
         };
}

function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext);
}

function getTestModelInfo(schemaName, modelName) {
    
    var expectedPath = path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.expected');
    var expectedContent = file.read(expectedPath);
    return {
            ittfPath: path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.ittf'), 
            expectedPath: expectedPath, 
            expectedContent: expectedContent, 
            writeResult: function(content) {
                file.write(path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.result'), content)
            }
         };
}
