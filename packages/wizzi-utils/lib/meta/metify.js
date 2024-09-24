/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\meta\metify.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// TODO *$ -> *$ + {'$'}
// TODO missing $include xx_yy when $include xx_t_yy
var path = require('path');
var verify = require('../helpers/verify');
var vfile = require('../fSystem/vfile');
var ittfScanner = require('../ittfScanner/index');
var packi = require('../packi/index');
var md = module.exports = {};
// { state
// number level
// number depth
// [ compressFolders
// string spaces
// string ft_basePath
// folderTemplates base bath
// string id_basePath
// ittfDocumentTemplates base bath
// string idf_basePath
// '__dot__wizzi/' destination base path
// string metaProductionName
// string parentBasename
// is a virtual parent, tfolder(s) are skipped
// boolean parentIsTFolder
// { sb
// [ sbFolderTemplateFile
// [ sbWzCtxModelFile
// string sourceBasename
md.metify = function(folderPath, rootFolder, metaProductionName, options, callback) {
    const destFolder = options.destFolder;
    ittfScanner.scanFolder(folderPath, {
        rootFolder: rootFolder, 
        getAll: true
     }, function(err, result) {
        if (err) {
            return callback(err);
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
            wzCtxModelFile: sbWzCtxModelFile, 
            sourceBasename: path.basename(folderPath)
         }, {
            metaProductionName: metaProductionName, 
            ft_basePath: '', 
            id_basePath: '', 
            idf_basePath: '__dot__wizzi/', 
            level: 0, 
            depth: options.depth, 
            compressFolders: options.compressFolders || [], 
            parentBasename: "", 
            parentIsTFolder: false
         })
        packiFiles[metaProductionName+'/folderTemplates/index.ittf.ittf'] = {
            type: "CODE", 
            contents: sbFolderTemplateFile.join('\n')
         };
        packiFiles[metaProductionName+'/folderTemplates/t/wzCtxModel.ittf.ittf'] = {
            type: "CODE", 
            contents: sbWzCtxModelFile.join('\n')
         };
        if (verify.isNotEmpty(destFolder)) {
            packi.packiFilesToFs(destFolder, packiFiles, {}, callback)
        }
        else {
            return callback(null);
        }
    })
}
;
function elabFsNode(packiFiles, fsNode, sb, state) {
    var i, i_items=fsNode.folders, i_len=fsNode.folders.length, f;
    for (i=0; i<i_len; i++) {
        f = fsNode.folders[i];
        if (!state.depth || state.level < state.depth) {
            elabFolder(packiFiles, f, sb, state)
        }
    }
    var i, i_items=fsNode.documents, i_len=fsNode.documents.length, f;
    for (i=0; i<i_len; i++) {
        f = fsNode.documents[i];
        elabDocument(packiFiles, f, sb, state)
    }
}
function elabFolder(packiFiles, fsNode, sb, state) {
    // loog 'elabFolder', fsNode.basename, 'parentBasename', state.parentBasename
    const isCompressed = state.compressFolders.indexOf(fsNode.basename) > -1;
    // loog 'isCompressed', fsNode.basename, isCompressed
    state.spaces = new Array(state.level == 0 ? 9 : 5).join(' ');
    ;
    if (!fsNode.isTFolder) {
        
        // active sb.folderTemplateFile is parent of fsNode
        if (!isCompressed && sb.sourceBasename != fsNode.basename) {
            sb.folderTemplateFile.push(state.spaces + '$include ' + buildFolderIncludePath(fsNode, state))
        }
    }
    // no include, because no packiFile is added (see at method bottom)
    // loog '--> elabFolder.isTFolder', "parent." + state.parentBasename
    else {
        sb.folderTemplateFile.push(state.spaces + "$" + "$ elabFolder.parent." + state.parentBasename)
    }
    var save_level = state.level;
    var save_sb_folderTemplateFile = sb.folderTemplateFile;
    var save_state_parentBasename = state.parentBasename;
    var save_state_ft_basePath = state.ft_basePath;
    var save_state_id_basePath = state.id_basePath;
    var save_state_idf_basePath = state.idf_basePath;
    
    // 
    
    // prepare for children
    
    // loog 'state.ft_basePath', state.ft_basePath
    if (!isCompressed && sb.sourceBasename != fsNode.basename) {
        if (!fsNode.isTFolder) {
            state.ft_basePath = state.ft_basePath + '/t/';
        }
        state.id_basePath = state.id_basePath + fsNodeIdName(fsNode) + '/';
        state.idf_basePath = state.idf_basePath + fsNodeIdfName(fsNode) + '/';
    }
    if (!isCompressed && sb.sourceBasename != fsNode.basename) {
        sb.folderTemplateFile = [
            '$group'
        ];
        state.level = state.level + 1;
    }
    // loog ''
    // loog 'level', fsNode.basename, state.level, state.depth
    // loog '?1', state.depth, state.level
    // loog '?2', !state.depth, state.level < state.depth
    if (!state.depth || state.level < state.depth) {
        if (!fsNode.isTFolder) {
            if (state.level > 0) {
                var save_parentBasename = state.parentBasename;
                state.parentBasename = fsNode.basename;
            }
        }
        else {
            var save_parentIsTFolder = state.parentIsTFolder;
            state.parentIsTFolder = true;
        }
        var i, i_items=fsNode.folders, i_len=fsNode.folders.length, f;
        for (i=0; i<i_len; i++) {
            f = fsNode.folders[i];
            
            // loog '--:', f.basename
            if (fsNode.isTFolder) {
            }
            elabFolder(packiFiles, f, sb, state)
        }
        if (!fsNode.isTFolder) {
            if (state.level > 0) {
                state.parentBasename = save_parentBasename;
            }
        }
        else {
            state.parentIsTFolder = save_parentIsTFolder;
        }
    }
    if (fsNode.documents.length > 0) {
        var itemGroups = {};
        var i, i_items=fsNode.documents, i_len=fsNode.documents.length, d;
        for (i=0; i<i_len; i++) {
            d = fsNode.documents[i];
            var g = itemGroups[d.ittfDocumentGraph.name];
            if (!g) {
                g = itemGroups[d.ittfDocumentGraph.name] = [];
            }
            g.push(d)
        }
        sb.folderTemplateFile.push('');
        for (var k in itemGroups) {
            var g = itemGroups[k];
            sb.folderTemplateFile.push(state.spaces + '$')
            sb.folderTemplateFile.push(state.spaces + '    var items = [')
            var i, i_items=g, i_len=g.length, d;
            for (i=0; i<i_len; i++) {
                d = g[i];
                
                // loog 'elabFolder.t.document', basenameIttfStripped(d)
                if (fsNode.isTFolder) {
                    sb.folderTemplateFile.push(state.spaces + '        "' + basenameIttfStripped(d) + '",')
                }
                else {
                    sb.folderTemplateFile.push(state.spaces + '        "' + basenameIttfStripped(d) + '",')
                }
            }
            sb.folderTemplateFile.push(state.spaces + '    ]')
            sb.folderTemplateFile.push('');
            sb.folderTemplateFile.push(state.spaces + '$foreach item in items')
            sb.folderTemplateFile.push(state.spaces + "    $file " + state.idf_basePath + '$' + '{item}' + '.ittf.ittf')
            // loog 'group', fsNode.basename, fsNode.isTFolder, state.parentIsTFolder, k
            sb.folderTemplateFile.push(state.spaces + "        " + (k == '$group' ? "$" + "{'$'}{'$'}group" : k))
            sb.folderTemplateFile.push(state.spaces + "            $" + "{'$'}include " + state.metaProductionName + '/' + state.id_basePath + '$' + '{item}')
        }
    }
    if (fsNode.documents.length > 0) {
        sb.folderTemplateFile.push('');
    }
    var i, i_items=fsNode.documents, i_len=fsNode.documents.length, d;
    for (i=0; i<i_len; i++) {
        d = fsNode.documents[i];
        elabDocument(packiFiles, d, sb, state)
    }
    //
    
    // loog 'path', state.metaProductionName+'/folderTemplates/' + state.ft_basePath + fsNode.basename + '.ittf.ittf'
    
    // loog '-->', state, buildFolderTemplatesPath(fsNode, state)
    if (!fsNode.isTFolder && !isCompressed && sb.sourceBasename != fsNode.basename) {
        if (fsNode.basename == 'meta') {
        }
        packiFiles[buildFolderTemplatesPath(fsNode, state)] = {
            type: "CODE", 
            contents: sb.folderTemplateFile.join('\n')
         };
    }
    if (!fsNode.isTFolder) {
        sb.folderTemplateFile = save_sb_folderTemplateFile;
    }
    state.ft_basePath = save_state_ft_basePath;
    state.id_basePath = save_state_id_basePath;
    state.idf_basePath = save_state_idf_basePath;
    state.level = save_level;
    state.parentBasename = save_state_parentBasename;
}
function elabDocument(packiFiles, fsNode, sb, state) {
    // loog '+++++ elabDocument', fsNode.basename, state.level
    var spacesNum = state.level == 0 ? 8 : 4;
    var spacesText = new Array(state.level == 0 ? 9 : 5).join(' ');
    if (false) {
        sb.folderTemplateFile.push(spacesText + "$file " + state.idf_basePath + fsNode.basename + '.ittf')
        sb.folderTemplateFile.push(documentLine(fsNode.ittfDocumentGraph, spacesNum + 4))
        sb.folderTemplateFile.push(documentLine({
            name: "${'$'}include", 
            value: state.metaProductionName + '/' + state.id_basePath + basenameIttfStripped(fsNode)
         }, spacesNum + 8))
    }
    sb.documentFile = [
        '$group'
    ];
    state.documentIndent = 4;
    var i, i_items=fsNode.ittfDocumentGraph.children, i_len=fsNode.ittfDocumentGraph.children.length, child;
    for (i=0; i<i_len; i++) {
        child = fsNode.ittfDocumentGraph.children[i];
        elabDocumentNode(child, sb, state)
    }
    // loog 'elabDocument', fsNode.basename, state.parentBasename, state.parentIsTFolder
    packiFiles[buildIttfDocumentTemplatesPath(fsNode, state)] = {
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
    return new Array(indent+1).join(' ') + documentLineName(fsNode) + documentLineValue(fsNode);
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
    // loog 'documentLineName', fsNode.name, fsNode.isCommand
    if (fsNode.isMixer) {
        return fsNode.fragmentName + '$' + "{'('}";
    }
    else if (fsNode.isIncluder) {
        return '$' + "{'$'}include";
    }
    else if (fsNode.isCommandCheck()) {
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
        else if (item.t == 1) {
            sb.push(sp + '$' + "{'$'}" + '{');
            sp = '';
            sb.push(verify.htmlEscape(item.v));
            sb.push('}');
        }
        // item.t == 2
        else {
            sb.push(sp + '$' + "{'\\\\b'}");
            sp = '';
        }
    }
    return sb.join('');
}
function buildFolderIncludePath(fsNode, state) {
    return state.parentBasename ? state.parentBasename + '_' + (state.parentIsTFolder ? 't_' : '') + fsNode.basename : fsNode.basename;
}
function buildFolderTemplatesPath(fsNode, state) {
    return state.metaProductionName + '/folderTemplates/' + state.ft_basePath + (state.parentBasename ? state.parentBasename + '_' + (state.parentIsTFolder ? 't_' : '') + fsNode.basename : fsNode.basename) + '.ittf.ittf';
}
function buildIttfDocumentTemplatesPath(fsNode, state) {
    return state.metaProductionName + '/ittfDocumentTemplates/' + state.id_basePath + fsNode.basename + '.ittf';
}