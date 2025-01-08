/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\util\node.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:38 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;
var createStoreFactory = require('@wizzi/repo').createStoreFactory;
function getFSDocumentStore(callback) {
    createStoreFactory({
        kind: 'filesystem'
     }, function(err, storeFacory) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        return storeFacory(callback);
    })
}

var ittfGraph = require('@wizzi/utils').IttfDocumentGraph;
var node = require('../../../lib/utils/node');

function evaluate(uri, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
     };
    MTreeBrickProvider.createFromUri(uri, loadContext, function(err, provider) {
        if (err) {
            console.log("[31m%s[0m", err);
        }
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, callback)
            })
        })
    })
}

describe("util.node", function() {
    var nodeUpdates = [
        {
            action: 'remove', 
            name: 'n11', 
            original: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                children: [
                                    {
                                        name: 'n111'
                                     }
                                ]
                             }, 
                            {
                                name: 'n12', 
                                value: 'v12'
                             }
                        ]
                     }
                ]
             }, 
            expected: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n12', 
                                value: 'v12'
                             }
                        ]
                     }
                ]
             }
         }, 
        {
            action: 'replace', 
            name: 'n11', 
            original: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                children: [
                                    {
                                        name: 'n111'
                                     }
                                ]
                             }, 
                            {
                                name: 'n12', 
                                value: 'n12', 
                                children: [
                                    {
                                        name: 'n121'
                                     }
                                ]
                             }
                        ]
                     }, 
                    {
                        name: 'n2', 
                        value: 'v2', 
                        children: [
                            {
                                name: 'n21'
                             }
                        ]
                     }
                ]
             }, 
            replacer: {
                name: 'n101', 
                children: [
                    {
                        name: 'n1011', 
                        value: 'v1011'
                     }
                ]
             }, 
            expected: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n101', 
                                children: [
                                    {
                                        name: 'n1011', 
                                        value: 'v1011'
                                     }
                                ]
                             }, 
                            {
                                name: 'n12', 
                                value: 'n12', 
                                children: [
                                    {
                                        name: 'n121'
                                     }
                                ]
                             }
                        ]
                     }, 
                    {
                        name: 'n2', 
                        value: 'v2', 
                        children: [
                            {
                                name: 'n21'
                             }
                        ]
                     }
                ]
             }
         }
    ];
    var nodeFinds = [
        {
            action: 'findCommand', 
            name: 'hook', 
            value: 'default', 
            expected: 5, 
            original: {
                name: 'root', 
                id: 1, 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        id: 2, 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                id: 3, 
                                children: [
                                    {
                                        name: 'n111', 
                                        id: 4
                                     }
                                ]
                             }, 
                            {
                                name: '$hook', 
                                value: 'default', 
                                id: 5
                             }
                        ]
                     }
                ]
             }
         }
    ];
    it("should modify nodes", function() {
        var i, i_items=nodeUpdates, i_len=nodeUpdates.length, item;
        for (i=0; i<i_len; i++) {
            item = nodeUpdates[i];
            if (item.action === 'remove') {
                ittfGraph.createFrom(item.original, function(err, original) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    // loog 'original', original.toString()
                    ittfGraph.createFrom(item.expected, function(err, expected) {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        var toremove = original.find(item.name);
                        node.remove(toremove)
                        // loog 'toremove', toremove.toString()
                        // loog 'original after', original.toString()
                        // loog 'expected', expected.toString()
                        expect(original.equals(expected)).to.be(true);
                    })
                })
            }
            if (item.action === 'replace') {
                ittfGraph.createFrom(item.original, function(err, original) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    // loog 'original', original.toString()
                    ittfGraph.createFrom(item.replacer, function(err, replacer) {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        ittfGraph.createFrom(item.expected, function(err, expected) {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            var toreplace = original.find(item.name);
                            // loog 'toreplace', toreplace.toString()
                            node.replace(toreplace, [replacer])
                            // loog 'replacer', replacer.toString()
                            // loog 'original after', original.toString()
                            // loog 'expected', expected.toString()
                            expect(original.equals(expected)).to.be(true);
                        })
                    })
                })
            }
        }
    });
    it("should find commands", function() {
        var i, i_items=nodeFinds, i_len=nodeFinds.length, item;
        for (i=0; i<i_len; i++) {
            item = nodeFinds[i];
            if (item.action === 'findCommand') {
                ittfGraph.createFrom(item.original, function(err, original) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    // loog 'original', original.toString()
                    var found = node.findIttfCommand(original, item.value, item.name);
                    // loog 'findCommand.name,value,found', item.name, item.value, found && found.id
                    expect(found).to.be.an('object');
                    // loose equality works for objects
                    expect(item.expected).to.eql(found.id);
                })
            }
        }
    });
});