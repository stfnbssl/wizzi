/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\examples\loader.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('wizzi-utils').verify;
var vfile = require('wizzi-utils').vfile;
var file = vfile();
var mocks = require('wizzi-utils').mocks;
var repo = mocks.repo;
var packageIndex = require('../index');
var loader = function(step_callback) {
    heading1('EXAMPLE')
    step_1(file, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            if (err.toString()) {
                console.log('err.toString()', err.toString());
            }
            if (err.inner) {
                console.log('err.inner', err.inner);
                if (err.inner.toString) {
                    console.log('err.inner.toString()', err.inner.toString());
                }
            }
            throw new Error(err.message);
        }
        sample_load(file, 'load_frontmatter.html.ittf', function(err, notUsed) {
            if (err) {
                console.log('err', err);
                if (err.toString()) {
                    console.log('err.toString()', err.toString());
                }
                if (err.inner) {
                    console.log('err.inner', err.inner);
                    if (err.inner.toString) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                }
                throw new Error(err.message);
            }
        })
    })
    function step_1(file, callback) {
        console.log('EXAMPLE.loader.start');
        var loadMTree = packageIndex.createLoadMTree(repo.getCreateFilesystemStore());
        console.log('EXAMPLE.loader.loading ittf/load_compile.html.ittf');
        loadMTree(path.join(__dirname, 'ittf', 'load_compile.html.ittf'), {
            __productionManager: mocks.getProductionManager(), 
            mTreeBuildUpContext: {
                tree: {
                    id: 1, 
                    title: 'root node 1', 
                    children: [
                        {
                            id: 11, 
                            title: 'node 1.1', 
                            children: [
                                
                            ]
                        }, 
                        {
                            id: 12, 
                            title: 'node 1.3', 
                            children: [
                                
                            ]
                        }
                    ]
                }
            }, 
            options: {
                isCompile: true
            }
        }, function(err, mTree) {
            if (err) {
                console.log('err', err);
                if (err.toString()) {
                    console.log('err.toString()', err.toString());
                }
                if (err.inner) {
                    console.log('err.inner', err.inner);
                    if (err.inner.toString) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                }
                throw new Error(err.message);
            }
            console.log('EXAMPLE.loader.loaded.succesfully ittf/load_compile.html.ittf');
            console.log("EXAMPLE.loader.mTree.loadHistory", mTree.loadHistory);
            var el = mTree.loadHistory.getIttfDocumentErrorLines('f1', {
                row: 7, 
                col: 19, 
                description: 'dummy error for test'
            }, true);
            console.log("EXAMPLE.loader.mTree.loadHistory.getIttfDocumentErrorLines", el);
            file.write(path.join(__dirname, 'outputs', 'load_compile.html.ittf'), mTree.toIttf())
            console.log("EXAMPLE.loader.written outputs/ittf/load_compile.html.ittf");
            callback(null);
        })
    }
    function sample_load(file, ittfDocumentBasename, callback) {
        console.log('EXAMPLE.loader.sample_load.start', ittfDocumentBasename);
        var loadMTree = packageIndex.createLoadMTree(repo.getCreateFilesystemStore(), {
            frontMatter: true
        });
        loadMTree(path.join(__dirname, 'ittf', ittfDocumentBasename), {
            __productionManager: mocks.getProductionManager(), 
            mTreeBuildUpContext: {
                
            }
        }, function(err, mTree) {
            if (err) {
                console.log('err', err);
                if (err.toString()) {
                    console.log('err.toString()', err.toString());
                }
                if (err.inner) {
                    console.log('err.inner', err.inner);
                    if (err.inner.toString) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                }
                throw new Error(err.message);
            }
            console.log('EXAMPLE.loader.sample_load.result\n', mTree.toIttf());
            console.log('EXAMPLE.loader.sample_load.frontmatter\n', JSON.stringify(mTree.frontMatter, null, 2));
            file.write(path.join(__dirname, 'outputs', ittfDocumentBasename), mTree.toIttf())
            callback(null);
        })
    }
};
loader.__name = 'loader';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - loader - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- loader - ' + text);
    console.log('   ', '-'.repeat(100));
    console.log('');
}
function printArray(name, arr, fields, format) {
    if (format === 'dashes') {
        console.log('   ', '-'.repeat(100));
    }
    console.log('   ', '* array ' + name + ' : ');
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        console.log('    {', i);
        var keys = fields || Object.keys(item);
        var j, j_items=keys, j_len=keys.length, k;
        for (j=0; j<j_len; j++) {
            k = keys[j];
            printValue(k, item[k])
        }
    }
}
function printValue(k, v, format, p1) {
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    if (format === 'json') {
        v = stringify(v, null, 4);
    }
    if (verify.isNotEmpty(v)) {
        var lines = verify.splitLines(v, {
            numbered: true
        });
        if (lines.length === 1) {
            console.log('   ', k, ':', lines[0].text);
        }
        else {
            for (var i=0; i<lines.length; i++) {
                if (i === 0) {
                    console.log('   ', k, ':', lines[0].numFmt, lines[0].text);
                }
                else {
                    console.log('   ', spaces(k.length+1), ' ', lines[i].numFmt, lines[i].text);
                }
            }
        }
    }
    else if (verify.isObject(v)) {
        console.log('   ', k, ':', inspect(v));
    }
    else {
        console.log('   ', k, ':', v);
    }
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + k.length).join(' '));
    }
}
function printObject(k, v, format, p1) {
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    console.log('   ', k, '{');
    __printObject(v, 2, 6);
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + k.length).join(' '));
    }
}
function __printObject(v, level, limit) {
    if (level < limit) {
        var indent = new Array(1 + level * 4).join(' ');
        var prop;
        for (var k in v) {
            prop = v[k];
            if (verify.isObject(prop)) {
                console.log(indent, k, '{');
                __printObject(prop, level+1, limit);
            }
            else if (verify.isFunction(prop)) {
                console.log(indent, k, 'function');
            }
            else if (verify.isArray(prop)) {
                console.log(indent, k, '[');
                var indent2 = new Array(1 + (level+1) * 4).join(' ');
                var i, i_items=prop, i_len=prop.length, item;
                for (i=0; i<i_len; i++) {
                    item = prop[i];
                    if (verify.isObject(item)) {
                        __printObject(item, level+1, limit);
                    }
                    else if (verify.isFunction(item)) {
                        console.log(indent2, 'function');
                    }
                    else {
                        console.log(indent2, item);
                    }
                }
            }
            else {
                console.log(indent, k, prop);
            }
        }
    }
}
function spaces(len) {
    return new Array(len).join(' ');
}
function meterLine(len, indent) {
    var sb = [];
    var numW = len < 10 ? 1 : ( len < 100 ? 2 : 3 );
    var x;
    for (var i=0; i<numW; i++) {
        for (var j=0; j<len; j++) {
            x = formatNum(j, numW);
            sb.push(x.substr(i,1));
        }
        console.log(indent, sb.join(''));
        sb = [];
    }
}
function formatNum(num, len) {
    var x = num.toString();
    return new Array(1 + len-x.length).join(' ') + x;
}
module.exports = loader;
if (typeof require != 'undefined' && require.main === module) {
    loader();
}
