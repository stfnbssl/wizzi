/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\examples\wf\samples\step_1.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
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

// wizzi Package
var wizziIndex = require('../../../index');

var pluginsBaseFolder = path.resolve(__dirname, '..', '..', '..', '..');
wizziIndex.createFactory({
    repo: {
        storeKind: 'filesystem'
     }, 
    plugins: {
        items: [
            'wizzi-web', 
            'wizzi-core'
        ]
     }, 
    globalContext: {
        
     }
 }, function(err, wf) {
    if (err) {
        console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log("[31m%s[0m", 'err', err);
        throw new Error(err.message);
    }
    var htmlFriendsPath = path.join(__dirname, 'ittf', 'friends.html.ittf');
    var htmlFriendsPathIttf = path.join(__dirname, 'ittf', 'friends.ittf.ittf');
    var friendsArray = [
        'arthur', 
        'mary'
    ];
    /**
        Generate the html model.
         The html schema is detected from the path.
    */
    wf.loadModel('html', htmlFriendsPath, {
        mTreeBuildUpContext: {
            friends: friendsArray
         }
     }, function(err, wizziModel) {
        if (err) {
            console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err.message);
        }
        printValue('Loaded Wizzi Model Instance: friends', stringify(wizziModel.elements, null, 2))
        /**
            Generate the html document artifact.
             No options, the default artifact generator
             for the html schema will be used.
        */
        wf.loadModelAndGenerateArtifact(htmlFriendsPath, {
            modelRequestContext: {
                friends: friendsArray
             }
         }, 'html/document', function(err, artifactText) {
            if (err) {
                console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            printValue('Generated Artifact: html/document', artifactText)
            wf.loadModel('ittf', htmlFriendsPathIttf, {
                mTreeBuildUpContext: {
                    friends: friendsArray
                 }
             }, function(err, wizziModel) {
                if (err) {
                    console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                wf.transformModel(wizziModel, 'ittf/html-pretty', {}, function(err, prettyfied) {
                    if (err) {
                        console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    printValue('Wizzi Model Instance friends loaded as ITTF, transformed with Model Transformer: ittf/html-pretty', prettyfied)
                })
            })
        })
    })
})
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - wf_samples_step_1 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- wf_samples_step_1 - ' + text);
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