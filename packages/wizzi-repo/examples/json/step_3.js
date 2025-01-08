/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\examples\json\step_3.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:30 GMT
*/
'use strict';
//
// Example skeleton specific for the '@wizzi/repo' kernel package
//
/**
     Examples: Json_Step_3
    
*/
var util = require('util');
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var wizziUtils = require('@wizzi/utils');
// local disk filesystem
var file = wizziUtils.file;
// virtual filesystem
var vfile = require('@wizzi/utils').vfile;
// defaults to local disk filesystem
var fsfile = vfile();
// utilities
var verify = wizziUtils.verify;
var mocks = wizziUtils.mocks;
var fSystem = require('@wizzi/utils').fSystem;
var vfile = require('@wizzi/utils').vfile;
var repoIndex = require('../../index');
var json = require('../../lib/json/index');
var JsonFsImpl = require('../../lib/json/jsonFsimpl');
var Document = require('../../lib/mongodb/fs/document');
var createStoreFactory = repoIndex.createStoreFactory;
function dump(jsonFs) {
    printValue('jsonFs.items', jsonFs.items)
    printValue('jsonFs.documents', jsonFs.documents)
}
var Json_Step_3 = function(step_callback) {
    heading1('EXAMPLE')
    heading1('start');
    var jsonFs = new json.JsonFs();
    var doc = new json.DocumentManager(jsonFs);
    var baseFolder = 'c:/wz/users/docexample';
    var folder_1_path = path.join(baseFolder, 'folder1');
    var folder_1_sub_1_path = path.join(baseFolder, 'folder1', 'sub1');
    var folder_2_path = path.join(baseFolder, 'folder2');
    var folder_3_path = path.join(baseFolder, 'folder3');
    var file_1_path = path.join(folder_1_path, 'hello.js.ittf');
    var file_2_path = path.join(folder_1_path, 'hello2.js.ittf');
    var file_3_path = path.join(folder_1_path, 'hello3.js.ittf');
    var file_4_path = path.join(folder_1_sub_1_path, 'hello_sub1.js.ittf');
    var file_5_path = path.join(folder_2_path, 'hello2.js.ittf');
    var file_6_path = path.join(folder_2_path, 'hello3.js.ittf');
    var file_7_path = path.join(folder_2_path, 'hello4.js.ittf');
    doc.isFile(file_1_path, function(err, result) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        heading2('clear');
        printValue('isFile.file_1', result)
        if (result) {
            doc.deleteFile(file_1_path, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_1', result)
                _clear2();
            })
        }
        else {
            _clear2();
        }
    })
    function _clear2() {
        heading2('clear2');
        doc.isFile(file_2_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('isFile.file_2', result)
            if (result) {
                doc.deleteFile(file_2_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('deleted.file_2', result)
                    _clear3();
                })
            }
            else {
                _clear3();
            }
        })
    }
    function _clear3() {
        heading2('clear3');
        doc.isFile(file_3_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('isFile.file_3', result)
            if (result) {
                doc.deleteFile(file_3_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('deleted.file_3', result)
                    _clear4();
                })
            }
            else {
                _clear4();
            }
        })
    }
    function _clear4() {
        heading2('clear4');
        doc.isFile(file_4_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('isFile.file_4', result)
            if (result) {
                doc.deleteFile(file_4_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('deleted.file_4', result)
                    _clear5();
                })
            }
            else {
                _clear5();
            }
        })
    }
    function _clear5() {
        heading2('clear5');
        doc.isFile(file_5_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('isFile.file_5', result)
            if (result) {
                doc.deleteFile(file_5_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('deleted.file_5', result)
                    _clear6();
                })
            }
            else {
                _clear6();
            }
        })
    }
    function _clear6() {
        heading2('clear6');
        doc.isFile(file_6_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('isFile.file_6', result)
            if (result) {
                doc.deleteFile(file_6_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('deleted.file_6', result)
                    _writeFile();
                })
            }
            else {
                _writeFile();
            }
        })
    }
    function _writeFile() {
        heading2('_writeFile');
        doc.writeFile(file_1_path, 'Hello wizzi factory\n\t from folder1/hello.js.ittf', function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            heading2('writeFile');
            printValue('result', result)
            _createWriteStream();
        })
    }
    function _createWriteStream() {
        heading2('_createWriteStream');
        var stream = doc.createWriteStream(file_7_path);
        printValue('stream', stream)
        stream.write('Hello createWriteStream\n');
        stream.write('Welcome\n');
        stream.end(function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('result', result)
            _readFile();
        })
    }
    function _readFile() {
        heading2('_readFile');
        doc.readFile(file_1_path, function(err, content) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            heading2('readFile');
            printValue('content', content)
            doc.readFile(file_7_path, function(err, content) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                printValue('content', content)
                _uploadFolder();
            })
        })
    }
    function _uploadFolder() {
        heading2('uploadFolder');
        doc.uploadFolder(path.join(__dirname, 'ittf', 'mongoDocument'), folder_3_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printValue('result', result)
            _renameFile();
        })
    }
    function _renameFile() {
        heading2('_renameFile');
        doc.isFile(file_2_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            heading2('renameFile');
            printValue('isFile.before.rename', result)
            doc.renameFile(file_1_path, file_2_path, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                printValue('rename.result', result)
                doc.isFile(file_2_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('isFile.after.rename', result)
                    _copyFile();
                })
            })
        })
    }
    function _copyFile() {
        doc.isFile(file_3_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            heading2('copyFile');
            printValue('isFile.before.copy', result)
            doc.copyFile(file_2_path, file_3_path, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                printValue('copy.result', result)
                doc.isFile(file_3_path, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    printValue('isFile.after.copy', result)
                    _copyFolder();
                })
            })
        })
    }
    function _copyFolder() {
        heading2('copyFolder');
        doc.copyFolder(folder_1_path, folder_2_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            printArray('copied', result, [
                'newid'
            ])
            _getDir();
        })
    }
    function _getDir() {
        doc.copyFile(file_2_path, file_4_path, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            heading2('getDir');
            printValue('copied.file_4_path', result)
            doc.getDir(folder_1_path, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                printArray('dir', result, [
                    '_id', 
                    'path', 
                    'kind'
                ])
                doc.close();
                terminate();
            })
        })
    }
    function terminate() {
        dump(jsonFs)
    }
};
Json_Step_3.__name = 'Json_Step_3';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 3 - Json_Step_3 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- Json_Step_3 - ' + text);
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
    console.log('--- value ------------------------------------------------------ start');
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    if (format === 'json') {
        v = stringify(v, null, 4)
        ;
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
        console.log('   ', k, ':', util.inspect(v));
    }
    else {
        console.log('   ', k, ':', v);
    }
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + k.length).join(' '));
    }
    console.log('--- value ------------------------------------------------------ end');
}
function printObject(k, v, format, p1) {
    console.log('--- object ------------------------------------------------------ start');
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    console.log('   ', k, '{');
    __printObject(v, 2, 6);
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + k.length).join(' '));
    }
    console.log('--- object ------------------------------------------------------ end');
}
function __printObject(v, level, limit) {
    if (level < limit) {
        var indent = new Array(1 + level * 4).join(' ');
        var prop;
        for (var k in v) {
            prop = v[k];
            if (verify.isObject(prop)) {
                console.log(indent, k, '{', __filename);
                __printObject(prop, level+1, limit);
            }
            else if (verify.isFunction(prop)) {
                console.log(indent, k, 'function', __filename);
            }
            else if (verify.isArray(prop)) {
                console.log(indent, k, '[', __filename);
                var indent2 = new Array(1 + (level+1) * 4).join(' ');
                var i, i_items=prop, i_len=prop.length, item;
                for (i=0; i<i_len; i++) {
                    item = prop[i];
                    if (verify.isObject(item)) {
                        __printObject(item, level+1, limit);
                    }
                    else if (verify.isFunction(item)) {
                        console.log(indent2, 'function', __filename);
                    }
                    else {
                        console.log(indent2, item, __filename);
                    }
                }
            }
            else {
                console.log(indent, k, prop, __filename);
            }
        }
    }
}
function printLines(lines) {
    console.log('lines from liner ----------------------------------- start');
    var i, i_items=lines, i_len=lines.length, l;
    for (i=0; i<i_len; i++) {
        l = lines[i];
        console.log('line', 'indent: ' + l.indent, 'r,c: ' + l.row + ',' + l.col, l.name + ' / ' + l.value, (l.hasMacro ? 'hasMacro' : ''), (l.tagSuffix ? 'tagSuffix: ' + l.tagSuffix : ''));
    }
    console.log('lines from liner ------------------------------------- end');
}
function printNodes_deep(n, indent) {
    var mTreeModel = n.model || n.mTreeBrick;
    console.log(' ', new Array(indent).join('  '), 'r,c: ' + n.row + ',' + n.col, n.name + ' / ' + n.value, (n.hasMacro ? 'hasMacro' : ''), (n.tagSuffix ? 'tagSuffix: ' + n.tagSuffix : ''), (mTreeModel.$params ? '$params: ' + mTreeModel.$params : ''), (mTreeModel.sourceKey ? 'sk: ' + mTreeModel.sourceKey : ''));
    var i, i_items=n.children, i_len=n.children.length, c;
    for (i=0; i<i_len; i++) {
        c = n.children[i];
        printNodes_deep(c, indent + 1)
    }
}
function printNodes(nodes, title) {
    console.log('--- nodes ' + (title || '') + ' ------------------------------------------------- start');
    if (nodes.length != 1) {
        console.log('Invalid nodes array, must be of length == 1');
    }
    // loog 'nodes.mTreeBrick', nodes[0].mTreeBrick
    // loog 'nodes[0]', nodes[0]
    else {
        var mTreeModel = nodes[0].model || nodes[0].mTreeBrick;
        if (mTreeModel) {
            console.log(' ', 'nodes.uri', mTreeModel.uri);
            console.log(' ', 'nodes.$schema', mTreeModel.$schema);
            console.log(' ', 'nodes.sourceKey', mTreeModel.sourceKey);
            if (mTreeModel.$params) {
                console.log(' ', 'nodes.$params', mTreeModel.$params);
            }
            if (mTreeModel.frontMatter) {
                console.log(' ', 'nodes.frontMatter', mTreeModel.frontMatter);
            }
        }
        printNodes_deep(nodes[0], 1)
    }
    console.log('--- nodes ' + (title || '') + ' --------------------------------------------------- end');
}
function printEvaluatedNodes_deep(n, indent) {
    console.log(' ', new Array(indent).join('  '), 'r,c: ' + n.r + ',' + n.c, n.n + ' / ' + n.v, 'sk: ' + n.s, 'u: ' + n.u);
    var i, i_items=n.children, i_len=n.children.length, c;
    for (i=0; i<i_len; i++) {
        c = n.children[i];
        printEvaluatedNodes_deep(c, indent + 1)
    }
}
function printEvaluatedNodes(evaluated, title) {
    console.log('--- evaluated nodes ' + (title || '') + ' ------------------------------------------------- start');
    if (evaluated && evaluated.nodes && evaluated.nodes.length == 1) {
        if (evaluated.frontMatter) {
            console.log(' ', 'evaluated.frontMatter', evaluated.frontMatter);
        }
        printEvaluatedNodes_deep(evaluated.nodes[0], 1)
    }
    else {
        console.log('Invalid evaluated object', evaluated);
    }
    console.log('--- evaluated nodes ' + (title || '') + ' --------------------------------------------------- end');
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
        console.log(indent, sb.join(''), __filename);
        sb = [];
    }
}
function formatNum(num, len) {
    var x = num.toString();
    return new Array(1 + len-x.length).join(' ') + x;
}
module.exports = Json_Step_3;
if (typeof require != 'undefined' && require.main === module) {
    Json_Step_3();
}