/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\examples\ittfScanner\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';
/**
     Example: ittfScanner_Step_1
    
*/
var util = require('util');
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
// local disk filesystem
// virtual filesystem
// defaults to local disk filesystem
var wizziUtils = require('../../index');
var vfile = require('../../lib/fSystem/vfile');
var uriParser = require('../../lib/fSystem/uriParser');
var fsUtils = require('../../lib/fSystem/utils');
var IttfDocumentGraph = require('../../lib/ittfGraph/ittfDocumentGraph');
var IttfFsNode = require('../../lib/ittfScanner/ittfFsNode');
var ittfScanner = require('../../lib/ittfScanner/index');
var meta = require('../../lib/meta/index');
var packi = require('../../lib/packi/index');
var fs = require('../../lib/fSystem/index');
var ittfGraph = require('../../lib/ittfGraph/index');
var file = wizziUtils.file;
var fsfile = vfile();
var verify = wizziUtils.verify;
var mocks = wizziUtils.mocks;
var secondFolder = path.join(__dirname, 'ittf', 'second');
function ittfFsNode_step_1(callback) {
    console.log('wizzi-utils.examples.ittfFsNode_step_1 START');
    var folderPath = path.join(__dirname, 'ittf', 'first');
    var options = {
        name: 'first', 
        gitPath: 'c:/blabla'
     };
    ittfFsNode_step_1_exec(folderPath, options, callback)
}
function ittfFsNode_step_1_outside(callback) {
    console.log('wizzi-utils.examples.ittfFsNode_step_1_outside START');
    var folderPath = path.join(__dirname, 'ittf', 'outside', 'first');
    var options = {
        name: 'first', 
        gitPath: 'c:/blabla'
     };
    ittfFsNode_step_1_exec(folderPath, options, callback)
}
function ittfFsNode_step_1_exec(folderPath, options, callback) {
    var removeRoot = path.dirname(folderPath);
    console.log('folderPath', folderPath);
    console.log('removeRoot', removeRoot);
    // var baseFolder = path.basename(folderPath)
    var baseFolder = path.dirname(folderPath);
    vfile(function(err, file) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        file.getGlobbedFilesEx(path.join(folderPath, '**/*.ittf'), {
            removeRoot: removeRoot, 
            dot: true, 
            ignore: path.join(folderPath, '**/node_modules/**/*.*')
         }, function(err, ittfs) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // loog 'ittfs\n', JSON.stringify(ittfs, null, 2)
            ittfGraph.createIttfDocumentGraphFrom(null, {
                name: 'wzpackage', 
                value: options.name, 
                createEmpty: true
             }, function(err, ittfDocumentGraph) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                var root = new IttfFsNode(baseFolder, null, {
                    isDirectory: true, 
                    file: file
                 });
                root.setSourcePaths({
                    ittfBasePath: removeRoot, 
                    jsCodeBasePath: options.gitPath
                 })
                // create the IttfFsNode tree structure of the scanned folder
                var i, i_items=ittfs, i_len=ittfs.length, ittf;
                for (i=0; i<i_len; i++) {
                    ittf = ittfs[i];
                    root.addDocument(( ittf[0] === '/' ? ittf.substr(1) : ittf ), {
                        basePath: removeRoot, 
                        gitPath: options.gitPath
                     })
                }
                // analize all IttfFsNode(s) starting from root
                // this also searches mixed or included ittf fragments that are
                // outside (up) of folderPath
                root.analize(function(err, notUsed) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    file.write(path.join(__dirname, 'outputs', 'ittfFsNode_step_1_after_analize.json'), stringify(root, null, 2))
                    // export folder infos to an mTree conformant to the
                    // 'wzpackage' schema.
                    root.toIttf(ittfDocumentGraph);
                    // loog 'IttfFsNode.ittfDocumentGraph\n', ittfDocumentGraph.toString()
                    ittfDocumentGraph.writeFile(path.join(__dirname, 'outputs', 'ittfFsNode_step_1.wzpackage.ittf'), function(err, result) {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            throw new Error(err.message);
                        }
                        callback(null, {
                            root: root, 
                            ittfDocumentGraph: ittfDocumentGraph, 
                            message: 'Written outputs/ittfFsNode_step_1.wzpackage.ittf'
                         })
                    })
                })
            })
        })
    })
}
function ittfFsNode_step_2(callback) {
    console.log('wizzi-utils.examples.ittfFsNode_step_2 START');
    var folderPath = path.join(__dirname, 'ittf', 'first');
    vfile(function(err, file) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        var root = new IttfFsNode(folderPath, null, {
            isDirectory: true, 
            file: file
         });
        // loog 'root', root
        var d1Path = path.join(folderPath, 'root.sample.ittf');
        var added = root.addDocument(d1Path);
        // loog 'root', root
        var d2Path = path.join(folderPath, 't', 'frag-1.sample.ittf');
        added = root.addDocument(d2Path);
        ;
        // loog 'root', root
        file.write(path.join(__dirname, 'outputs', 'ittfFsNode_step_2_after_add.json'), stringify(root, null, 2))
        root.setInfo(function(err, notUsed) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // loog 'root', root
            console.log('root.info.schemas', root.info.schemas);
            console.log('root.info.lib', root.info.lib);
            // tobe_string(root.info.schemas['md'].name, md)
            // tobe_array(root.info.lib.documents, 1)
            file.write(path.join(__dirname, 'outputs', 'ittfFsNode_step_2_after_setInfo.json'), stringify(root, null, 2))
            callback(null, {
                root: root, 
                ittfDocumentGraph: null
             })
        })
    })
}
function ittfFsNode_step_3(root, callback) {
    console.log('wizzi-utils.examples.ittfFsNode_step_3 START');
    ittfGraph.createIttfDocumentGraphFrom(null, {
        name: 'wzpackage', 
        createEmpty: true
     }, function(err, ittfDocumentGraph) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        root.analize(function(err, notUsed) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            root.toIttf(ittfDocumentGraph);
            file.writeFile(path.join(__dirname, 'outputs', 'ittfFsNode_step_3.json'), stringify(root, null, 2))
            callback(null, 'Written outputs/ittfFsNode_step_3.json')
        })
    })
}
function folderBrowse_step_1() {
    console.log('wizzi-utils.examples.folderBrowse_step_1 START');
    ittfScanner.browseFolder(path.join(__dirname, 'ittf', 'first'), {
        rootFolder: path.join(__dirname, 'ittf')
     }, function(err, result) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        console.log('result\n', JSON.stringify(result, null, 2));
    })
}
var ittfScanner_Step_1 = function(step_callback) {
    heading1('EXAMPLE')
    step_1();
    // _ ittfFsNode_step_1
    ittfFsNode_step_1_outside(function(err, result1) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        // loog 'ittfFsNode_step_1.result', result1
        //
    })
    folderBrowse_step_1();
    function step_1() {
        ittfScanner.scanFolder(path.join(__dirname, 'ittf', 'first'), {
            name: 'first', 
            gitPath: 'c:/blabla'
         }, function(err, ittfDocumentGraph) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            ittfDocumentGraph.writeFile(path.join(__dirname, 'outputs', 'first.wzCtx.ittf'), function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('err, result', err, result);
                step_2();
            })
        })
    }
    function step_2() {
        var ittfDocumentGraph;
        ittfScanner.scanFolder(path.join(__dirname, 'ittf', 'first', 'deep'), {
            name: 'second', 
            gitPath: 'c:/blabla'
         }, function(err, ittfDocumentGraph) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            ittfDocumentGraph.writeFile(path.join(__dirname, 'outputs', 'second.wzCtx.ittf'), function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('err, result', err, result);
                step_4();
            })
        })
    }
    function step_4() {
        ittfScanner.scanIttfDocument(path.join(secondFolder, 'deep/scripts', 'script_1.js.ittf'), {
            rootFolder: path.join(secondFolder, 'deep')
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log('step_4 err', err);
            var msg = stringify(result, null, 2);
            // loog 'step_4 result', msg
            file.write(path.join(__dirname, 'outputs', 'ittfDocumentScanner.json'), msg)
            step_5();
        })
    }
    function step_5() {
        ittfScanner.scanTextDocument(path.join(secondFolder, "red/deep/configs", 'config.yml.ittf'), {
            baseFolder: path.join(secondFolder, 'red')
         }, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            console.log('step_4 err', err);
            var msg = stringify(result, null, 2);
            console.log('step_5 result', msg);
        })
    }
};
ittfScanner_Step_1.__name = 'ittfScanner_Step_1';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - ittfScanner_Step_1 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- ittfScanner_Step_1 - ' + text);
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
module.exports = ittfScanner_Step_1;
if (typeof require != 'undefined' && require.main === module) {
    ittfScanner_Step_1();
}