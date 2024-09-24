/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\examples\ittfScanner\metify.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';
/**
     Example: ittfScanner_metify
    
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
const folderPath = path.join(__dirname, 'ittf', 'scanMeta');
const rootFolder = path.join(__dirname, 'ittf', 'scanMeta');
const destFolder = path.join(__dirname, 'outputs', 'metify');
const metaProductionName = 'baxDemo';
ittfScanner.scanFolder(folderPath, {
    rootFolder: rootFolder, 
    getAll: true
 }, function(err, result) {
    if (err) {
        console.log("[31m%s[0m", err);
        throw new Error(err.message);
    }
    var packiFiles = {};
    var sbFolderTemplateFile = [
        '$group', 
        '    $if metaCtx.use' + verify.capitalize(metaProductionName), 
        '        $include wzCtxModel'
    ];
    var sbWzCtxModelFile = [
        '$group'
    ];
    elabFsNode(packiFiles, result.ittfFsNode, {
        folderTemplateFile: sbFolderTemplateFile, 
        wzCtxModelFile: sbWzCtxModelFile
     }, {
        metaProductionName: metaProductionName, 
        ft_basePath: '', 
        id_basePath: '', 
        idf_basePath: ''
     })
    packiFiles[metaProductionName+'/folderTemplates/index.ittf.ittf'] = {
        type: "CODE", 
        contents: sbFolderTemplateFile.join('\n')
     };
    packiFiles[metaProductionName+'/folderTemplates/t/wzCtxModel.ittf.ittf'] = {
        type: "CODE", 
        contents: sbWzCtxModelFile.join('\n')
     };
    wizziUtils.packi.packiFilesToFs(destFolder, packiFiles, {}, function(err, notUsed) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
    })
})
function elabFsNode(packiFiles, fsNode, sb, state) {
    var i, i_items=fsNode.folders, i_len=fsNode.folders.length, f;
    for (i=0; i<i_len; i++) {
        f = fsNode.folders[i];
        elabFolder(packiFiles, f, sb, state)
    }
    var i, i_items=fsNode.documents, i_len=fsNode.documents.length, f;
    for (i=0; i<i_len; i++) {
        f = fsNode.documents[i];
        elabDocument(packiFiles, f, sb, state)
    }
}
function elabFolder(packiFiles, fsNode, sb, state) {
    if (fsNode.parent.isRoot) {
        if (!fsNode.isTFolder) {
            sb.folderTemplateFile.push('        $include ' + fsNode.basename)
        }
    }
    else {
        if (!fsNode.isTFolder) {
            sb.folderTemplateFile.push('    $include ' + fsNode.basename)
        }
    }
    var save_sb_folderTemplateFile = sb.folderTemplateFile;
    var save_state_ft_basePath = state.ft_basePath;
    var save_state_id_basePath = state.id_basePath;
    var save_state_idf_basePath = state.idf_basePath;
    //
    // prepare for children
    state.ft_basePath = state.ft_basePath + '/t/';
    state.id_basePath = state.id_basePath + fsNodeIdName(fsNode) + '/';
    state.idf_basePath = state.idf_basePath + fsNodeIdfName(fsNode) + '/';
    console.log('state.ft_basePath', state.ft_basePath, __filename);
    if (fsNode.isTFolder) {
        elabTFolder(fsNode, sb, state)
    }
    sb.folderTemplateFile = [
        '$group'
    ];
    var i, i_items=fsNode.folders, i_len=fsNode.folders.length, f;
    for (i=0; i<i_len; i++) {
        f = fsNode.folders[i];
        elabFolder(packiFiles, f, sb, state)
    }
    if (fsNode.isTFolder) {
        elabTFolder(fsNode, sb, state)
    }
    else {
        var i, i_items=fsNode.documents, i_len=fsNode.documents.length, d;
        for (i=0; i<i_len; i++) {
            d = fsNode.documents[i];
            elabDocument(packiFiles, d, sb, state)
        }
    }
    //
    if (!fsNode.isTFolder) {
        console.log('path', state.metaProductionName+'/folderTemplates/' + state.ft_basePath + fsNode.basename + '.ittf.ittf', __filename);
        packiFiles[state.metaProductionName+'/folderTemplates/' + state.ft_basePath + fsNode.basename + '.ittf.ittf'] = {
            type: "CODE", 
            contents: sb.folderTemplateFile.join('\n')
         };
    }
    sb.folderTemplateFile = save_sb_folderTemplateFile;
    state.ft_basePath = save_state_ft_basePath;
    state.id_basePath = save_state_id_basePath;
    state.idf_basePath = save_state_idf_basePath;
}
function elabTFolder(fsNode, sb, state) {
    sb.folderTemplateFile.push('');
    sb.folderTemplateFile.push('    $')
    sb.folderTemplateFile.push('        var items = [')
    var i, i_items=fsNode.documents, i_len=fsNode.documents.length, d;
    for (i=0; i<i_len; i++) {
        d = fsNode.documents[i];
        sb.folderTemplateFile.push('            ' + basenameIttfStripped(d) + ',')
    }
    sb.folderTemplateFile.push('        ]')
    sb.folderTemplateFile.push('');
    sb.folderTemplateFile.push('    $foreach item in items')
    var i, i_items=fsNode.documents, i_len=fsNode.documents.length, d;
    for (i=0; i<i_len; i++) {
        d = fsNode.documents[i];
        sb.folderTemplateFile.push("        $file " + state.idf_basePath + '$' + '{item}' + '.ittf.ittf', "            $" + "{'$'}{'$'}group", "                $" + "{'$'}include " + state.id_basePath + '$' + '{item}')
    }
    sb.folderTemplateFile.push('');
}
function elabDocument(packiFiles, fsNode, sb, state) {
    sb.folderTemplateFile.push("    $file " + state.idf_basePath + fsNode.basename + '.ittf')
    sb.folderTemplateFile.push(documentLine(fsNode.ittfDocumentGraph, 8))
    sb.folderTemplateFile.push(documentLine({
        name: "${'$'}include", 
        value: state.metaProductionName + '/' + state.id_basePath + basenameIttfStripped(fsNode)
     }, 12))
    sb.documentFile = [
        '$group'
    ];
    state.documentIndent = 4;
    var i, i_items=fsNode.ittfDocumentGraph.children, i_len=fsNode.ittfDocumentGraph.children.length, child;
    for (i=0; i<i_len; i++) {
        child = fsNode.ittfDocumentGraph.children[i];
        elabDocumentNode(child, sb, state)
    }
    packiFiles[state.metaProductionName+'/ittfDocumentsTemplates/' + state.id_basePath + fsNode.basename + '.ittf'] = {
        type: "CODE", 
        contents: sb.documentFile.join('\n')
     };
}
function elabDocumentNode(fsNode, sb, state) {
    sb.documentFile.push(documentLine(fsNode, state.documentIndent))
    var save_state_documentIndent = state.documentIndent;
    state.documentIndent = state.documentIndent + 4;
    var i, i_items=fsNode.children, i_len=fsNode.children.length, child;
    for (i=0; i<i_len; i++) {
        child = fsNode.children[i];
        elabDocumentNode(child, sb, state)
    }
    state.documentIndent = save_state_documentIndent;
}
function documentLine(fsNode, indent) {
    return new Array(indent).join(' ') + documentLineName(fsNode) + documentLineValue(fsNode);
}
function fsNodeIdName(fsNode) {
    if (fsNode.isTFolder) {
        return 'tfolder';
    }
    else {
        return fsNode.basename;
    }
}
function fsNodeIdfName(fsNode) {
    return fsNode.basename;
}
function basenameIttfStripped(fsNode) {
    if (fsNode.basename && fsNode.basename.endsWith('.ittf')) {
        return fsNode.basename.substr(0, fsNode.basename.length - 5);
    }
    else {
        return fsNode.basename;
    }
}
function documentLineName(fsNode) {
    if (fsNode.isMixer) {
        return fsNode.fragmentName + '$' + "{'('}";
    }
    else if (fsNode.isIncluder) {
        return '$' + "{'$'}include";
    }
    else if (fsNode.isCommand) {
        return '$' + "{'$'}" + (fsNode.name && fsNode.name.substring(1));
    }
    else {
        return fsNode.name;
    }
}
function documentLineValue(fsNode) {
    return buildLineValue(fsNode);
}
function buildLineValue(fsNode) {
    if (!fsNode.getValueParsed) {
        return verify.isEmpty(fsNode.value) ? '' : ' ' + fsNode.value;
    }
    var sb = [];
    var items = fsNode.getValueParsed();
    var sp = ' ';
    var i, i_items=items, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        if (item.t == 0) {
            sb.push(sp + item.v);
            sp = '';
        }
        else {
            sb.push(sp + '$' + "{'$'}");
            sb.push(sp + '{');
            sp = '';
            sb.push(verify.htmlEscape(item.v));
            sb.push('}');
        }
    }
    return sb.join('');
}
var ittfScanner_metify = function(step_callback) {
    heading1('EXAMPLE')
};
ittfScanner_metify.__name = 'ittfScanner_metify';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - ittfScanner_metify - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- ittfScanner_metify - ' + text);
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
module.exports = ittfScanner_metify;
if (typeof require != 'undefined' && require.main === module) {
    ittfScanner_metify();
}