/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\examples\jobs\step_3.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/
/**
     Example: jobs_2
    
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
var async = require('async');
var wizziUtils = require('@wizzi/utils');
var pluginsBaseFolder = null;
var pluginsBaseFolderV08 = 'C:/My/wizzi/stfnbssl/wizzi.plugins/packages';
var metaPluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.metas/packages';
var wizziIndex = require('../../../index');
pluginsBaseFolder = path.resolve(__dirname, '..', '..', '..', '..')
;
var pluginsManager = require('../../../lib/services/pluginsManager');
var metasManager = require('../../../lib/services/metasManager');
var inmemoryMetaPlugin = require('../../../lib/services/inmemoryMetaPlugin');
var packiUtils = require('../../../lib/services/packiUtils');
const packiFilePrefix = wizziIndex.constants.packiFilePrefix;
const packiFilePrefixExtract = wizziIndex.constants.packiFilePrefixExtract;
function createWizziFactory(globalContext, callback) {
    wizziIndex.fsFactory({
        plugins: {
            items: [
                './wizzi.plugin.html/index', 
                './wizzi.plugin.js/index', 
                './wizzi.plugin.css/index', 
                './wizzi.plugin.ittf/index', 
                './wizzi.plugin.json/index', 
                './wizzi.plugin.wzjob/index'
            ], 
            pluginsBaseFolder: pluginsBaseFolderV08
         }, 
        globalContext: globalContext || {}, 
        verbose: true
     }, callback)
}
function createJsonWizziFactoryAndJsonFsWithOptions(packiFiles, plugins, metaPlugins, callback) {
    
    const jsonDocuments = [];
    // log 'createJsonWizziFactoryAndJsonFs'
    Object.keys(packiFiles).map((value) => {
        if (packiFiles[value].type === 'CODE' && packiFiles[value].contents && packiFiles[value].contents.length > 0) {
            const filePath = ensurePackiFilePrefix(value);
            console.log('createJsonWizziFactoryAndJsonFs.filePath', filePath, __filename);
            jsonDocuments.push({
                path: filePath, 
                content: packiFiles[value].contents
             })
        }
    }
    )
    wizziIndex.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        if (err) {
            return callback(err);
        }
        wizziIndex.jsonFactory({
            jsonFs: jsonFs, 
            plugins: plugins, 
            metaPlugins: metaPlugins, 
            verbose: true
         }, (err, wf) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                wf: wf, 
                jsonFs: jsonFs
             })
        }
        )
    }
    )
}
function createJsonWizziFactoryAndJsonFs(packiFiles, callback) {
    const jsonDocuments = [];
    console.log('createJsonWizziFactoryAndJsonFs', __filename);
    Object.keys(packiFiles).map((value) => {
        if (packiFiles[value].type === 'CODE' && packiFiles[value].contents && packiFiles[value].contents.length > 0) {
            const filePath = ensurePackiFilePrefix(value);
            console.log('createJsonWizziFactoryAndJsonFs.filePath', filePath, __filename);
            jsonDocuments.push({
                path: filePath, 
                content: packiFiles[value].contents
             })
        }
    }
    )
    wizziIndex.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        if (err) {
            return callback(err);
        }
        wizziIndex.jsonFactory({
            jsonFs: jsonFs, 
            plugins: {
                
             }, 
            metaPlugins: {
                
             }, 
            verbose: true
         }, (err, wf) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                wf: wf, 
                jsonFs: jsonFs
             })
        }
        )
    }
    )
}

function createJsonFs(packiFiles, callback) {
    const jsonDocuments = [];
    Object.keys(packiFiles).map((value) => {
        if (packiFiles[value].type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: packiFiles[value].contents
             })
        }
    }
    )
    wizziIndex.JsonComponents.createJsonFs(jsonDocuments, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    }
    )
}
function ensurePackiFilePrefix(filePath) {
    return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;
}
function createPackifilesFromFs(folderPath, callback) {
    const file = vfile();
    file.getFiles(folderPath, {
        deep: true, 
        documentContent: true
     }, (err, files) => {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        const packiFiles = {};
        var i, i_items=files, i_len=files.length, file;
        for (i=0; i<i_len; i++) {
            file = files[i];
            packiFiles[file.relPath] = {
                type: 'CODE', 
                contents: file.content
             };
        }
        return callback(null, packiFiles);
    }
    )
}
function writePackifiles(folderPath, packiFiles) {
    for (var k in packiFiles) {
        file.write(path.join(folderPath, k), packiFiles[k].contents)
    }
}
function writeStringified(filePath, object) {
    file.write(filePath, stringify(object, null, 2))
}
function createMetasManager(globalContext, callback) {
    wizziIndex.metasManager({
        metaPlugins: {
            
         }, 
        wfPlugins: {
            
         }, 
        globalContext: globalContext || {}
     }, callback)
}
function createPackiManager(callback) {
    wizziIndex.packiManager({}, callback)
}
var jobs_2 = function(step_callback) {
    heading1('EXAMPLE')
    var friendsArray = [
        'arthur', 
        'mary'
    ];
    execute("job_model_to_folder", function(err, notUsed) {
        if (err) {
            return callback(err);
        }
    })
    function execute(jobName, callback) {
        var jobPath = path.join(__dirname, 'ittf', jobName);
        // Execute a wizzi job
        createWizziFactory({}, function(err, wf) {
            if (err) {
                console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            wf.executeJob({
                name: 'Job1 example', 
                path: jobPath, 
                productionOptions: wizziIndex.productionOptions({
                    indentSpaces: 4, 
                    basedir: __dirname, 
                    verbose: 2
                 }), 
                modelContext: {
                    friends: friendsArray, 
                    options: {
                        destFolder: 'output'
                     }
                 }, 
                jobContext: {
                    options: {
                        destFolder: 'output'
                     }
                 }, 
                globalContext: {
                    options: {
                        destFolder: 'output'
                     }
                 }
             }, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                }
                console.log("[31m%s[0m", "error", err, result);
                printObject('result', result)
            })
        })
    }
};
jobs_2.__name = 'jobs_2';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 2 - jobs_2 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- jobs_2 - ' + text);
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
module.exports = jobs_2;
if (typeof require != 'undefined' && require.main === module) {
    jobs_2();
}