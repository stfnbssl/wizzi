/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\lib\wizzifiers\scssparser\gonzales\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var scss_parser = require('gonzales-pe');
var cleanGonzales = require('./cleanGonzales');
function parseInternal(scss, options, callback) {
    var syntax = scss_parser.parse(scss, {
        syntax: 'scss'
     });
    cleanGonzales.cleanAst(syntax);
    return callback(null, syntax);
}
var verbose = false;
function log(label, obj, force) {
    if (verbose || force) {
        console.log(label, util.inspect(obj, {
            depth: null
         }))
    }
}
var md = module.exports = {};
md.getCodeAST = function(input, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    parseInternal(input, options, callback)
}
;
md.getWizziTree = function(input, options, callback) {
    options = (options || {});
    if (typeof (options.verbose) !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // loog 'startTime', startTime
    wizzify(input, options, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        if (options.syntaxOutFile) {
            parseInternal(input, options, function(err, syntax) {
                if (err) {
                    return callback(err);
                }
                file.write(options.syntaxOutFile, JSON.stringify(syntax, null, 2))
            })
        }
        // loog 'Parsed in ' + Date.now() - startTime + ' ms'
        callback(null, syntax);
    })
}
;
md.getWizziIttf = function(input, options, callback) {
    md.getWizziTree(input, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        md.getWizzifierIncludes(options, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            result = cloner(result, options);
            callback(null, ittfwriter.stringify(result, options))
        })
    })
}
;
// ovveridable
md.getWizzifierIncludes = function(options, callback) {
    return callback(null);
}
;
var format = function(parent, ast, options) {
    if (!ast) {
        throw new Error('missing ast. parent is: ' + util.inspect(parent, { depth: 2 }));
    }
    if (parent === null) {
        if (options.starter) {
            options.starter = false;
        }
        
        // ok
        else if (options.returnText) {
        }
        else {
            showstack(options);
            throw new Error('parent is null.' + util.inspect(ast, 4));
        }
    }
    if (options.verbose) {
        console.log('ast.type', ast.type);
    }
    var type = ast.type === 'arguments' ? 'xarguments' : ast.type;
    var formatter = format[type];
    if (formatter) {
        options.stack.push(ast);
        var result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    else {
        throw new Error('no formatter for type: ' + ast.type);
    }
};
function wizzify(scss, options, callback) {
    options = options || {};
    options.input = scss;
    options.stack = [];
    options.formatTextNodes = [];
    options.verbose = true;
    parseInternal(scss, options, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        console.log(JSON.stringify(syntax, null, 2), __filename);
        var root = {
            tag: 'scss', 
            children: [
                
            ]
         };
        format(root, syntax, options);
        return callback(null, root);
    })
}
// process AST node space
format.space = function(parent, node, options) {
}
;
// process AST node variable
format.variable = function(parent, node, options) {
    // loog 'node : variable ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'variable', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = '$' + getTextList(p_content, '');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ident
format.ident = function(parent, node, options) {
    // loog 'node : ident ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'ident', 
        name: '', 
        isText: true, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node id
format.id = function(parent, node, options) {
    // loog 'node : id ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '#', 
        name: '', 
        isText: true, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node value
format.value = function(parent, node, options) {
    // loog 'node : value ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'value', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, ' ');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node number
format.number = function(parent, node, options) {
    // loog 'node : number ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'number', 
        name: '', 
        isText: true, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node string
format.string = function(parent, node, options) {
    // loog 'node : string ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'string', 
        name: '', 
        isText: true, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node color
format.color = function(parent, node, options) {
    // loog 'node : color ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'color', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = '#' + ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node uri
format.uri = function(parent, node, options) {
    // loog 'node : uri ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'uri', 
        name: '', 
        isText: true, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.name = 'url(' + ret.name + ')';
    ret.textified = ret.name;
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node percentage
format.percentage = function(parent, node, options) {
    // loog 'node : percentage ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '%', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.textified = ret.name + '%';
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node important
format.important = function(parent, node, options) {
    // loog 'node : important ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '!important', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node block
format.block = function(parent, node, options) {
    // loog 'node : block ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'block', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node declaration
format.declaration = function(parent, node, options) {
    // loog 'node : declaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (p_content.children.length == 2 && p_content.children[0].tag === 'property' && p_content.children[1].tag === 'value') {
        ret.name = getNodeText(p_content.children[0]);
        if (ret.name[0] === '$') {
            ret.tag = 'set';
            ret.name = ret.name.substr(1);
        }
        if (isTextualNode(p_content.children[1])) {
            ret.name += ' ' + getNodeText(p_content.children[1]);
        }
        else {
            var i, i_items=p_content.children[1].children, i_len=p_content.children[1].children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_content.children[1].children[i];
                ret.children.push(item);
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node property
format.property = function(parent, node, options) {
    // loog 'node : property ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'property', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    /**
        
        // process AST-node-property-collection content and append ittfNode(s) to `ret`
        if (verify.isArray(node.content)) {
            if (node.content) {
                if (typeof node.content.length === 'undefined') {
                    throw new Error('Property node.content must be an array');
                }
                var i, i_items=node.content, i_len=node.content.length, item;
                for (i=0; i<i_len; i++) {
                    item = node.content[i];
                    item.__parent = {
                        name: 'content', 
                        len: node.content.length
                     };
                    format(ret, item, options)
                }
            }
            else {
                throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
            }
        }
        // loog 't/name.node.content, value: ', node.content, ', type: string'
        // loog 't/name ittf.ret', ret
        else {
            if (typeof node.content !== 'undefined') {
                ret.name = node.content.toString();
                ret.textified = ret.name;
            }
        }
    */
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node propertyDelimiter
format.propertyDelimiter = function(parent, node, options) {
}
;
// process AST node declarationDelimiter
format.declarationDelimiter = function(parent, node, options) {
}
;
// process AST node stylesheet
format.stylesheet = function(parent, node, options) {
    // loog 'node : stylesheet ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
}
;
// process AST node ruleset
format.ruleset = function(parent, node, options) {
    // loog 'node : ruleset ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'rule', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    
    // selectors
    
    // block
    if (p_content.children.length == 2 && p_content.children[0].tag === 'selector' && p_content.children[1].tag === 'block') {
        var sel = p_content.children[0];
        if (sel.children.length == 0) {
            throw new Error('ruleset unexpected selector without children: ' + JSON.stringify(node, null, 2));
        }
        ret.tag = sel.children[0].tag;
        ret.name = sel.children[0].name;
        for (var i=1; i<sel.children.length; i++) {
            ret.children.push(sel.children[i]);
        }
        var i, i_items=p_content.children[1].children, i_len=p_content.children[1].children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[1].children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node selector
format.selector = function(parent, node, options) {
    // loog 'node : selector ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'selector', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret.children.length == 2 && ret.children[0].tag === '&' && ret.children[1].tag === '&-extension') {
        ret.children[0].name = ret.children[1].name;
        ret.children = [ ret.children[0] ];
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node typeSelector
format.typeSelector = function(parent, node, options) {
    // loog 'node : typeSelector ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '<', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node parentSelector
format.parentSelector = function(parent, node, options) {
    // loog 'node : parentSelector ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'parentSelector', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.tag = node.content;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node parentSelectorExtension
format.parentSelectorExtension = function(parent, node, options) {
    // loog 'node : parentSelectorExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '&-extension', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node attributeSelector
format.attributeSelector = function(parent, node, options) {
    // loog 'node : attributeSelector ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '[', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node universalSelector
format.universalSelector = function(parent, node, options) {
    // loog 'node : universalSelector ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '*', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node attributeName
format.attributeName = function(parent, node, options) {
    // loog 'node : attributeName ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'attributeName', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node attributeMatch
format.attributeMatch = function(parent, node, options) {
    // loog 'node : attributeMatch ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'attributeMatch', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node attributeValue
format.attributeValue = function(parent, node, options) {
    // loog 'node : attributeValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'attributeValue', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node pseudoClass
format.pseudoClass = function(parent, node, options) {
    // loog 'node : pseudoClass ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, 'ident');
    if (p) {
        ret.name = getNodeText(p);
        removeChildByTag(ret, 'ident');
    }
    p = getChildByTag(ret, 'xarguments');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            ret.children.push(item);
        }
        removeChildByTag(ret, 'xarguments');
    }
    else {
        ret.textified = ret.name;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node class
format.class = function(parent, node, options) {
    // loog 'node : class ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '.', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = '.' + ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node include
format.include = function(parent, node, options) {
    // loog 'node : include ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'include', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@include';
        removeChildByTag(ret, '@@');
    }
    p = getChildByTag(ret, 'ident');
    if (p) {
        ret.name = getNodeText(p);
        removeChildByTag(ret, 'ident');
    }
    p = getChildByTag(ret, 'xarguments');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            ret.children.push(item);
        }
        removeChildByTag(ret, 'xarguments');
    }
    p = getChildByTag(ret, 'block');
    if (p) {
        var block = {
            tag: '{', 
            children: [
                
            ]
         };
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            block.children.push(item);
        }
        ret.children.push(block);
        removeChildByTag(ret, 'block');
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node function
format.function = function(parent, node, options) {
    // loog 'node : function ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '_', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, 'ident');
    if (p) {
        ret.name = getNodeText(p);
        removeChildByTag(ret, 'ident');
    }
    p = getChildByTag(ret, 'xarguments');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            ret.children.push(item);
        }
        removeChildByTag(ret, 'xarguments');
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node xarguments
format.xarguments = function(parent, node, options) {
    // loog 'node : xarguments ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'xarguments', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    var acc = [];
    var temp = {
        tag: null, 
        children: [
            
        ]
     };
    var i, i_items=p_content.children, i_len=p_content.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_content.children[i];
        if (item.tag === 'delimiter') {
            if (temp.tag !== null) {
                ret.children.push(temp);
            }
            var temp = {
                tag: null, 
                children: [
                    
                ]
             };
        }
        else {
            if (isTextualNode(item)) {
                if (temp.tag == null) {
                    temp.name = getNodeText(item);
                }
                else {
                    temp.name += getNodeText(item);
                }
                temp.tag = '@';
            }
            /**
                // loog '*****', 'xarguments', 'item.tag', item.tag, item.name, isTextualNode(item.children)
                // item.tag === 'selector' && isTextualNode(item.children)
                    // temp.name = getTextList(item, ' ')
                // 
                    // temp.children.push(item)
            */
            else {
                if (item.tag === 'selector') {
                    var j, j_items=item.children, j_len=item.children.length, sel;
                    for (j=0; j<j_len; j++) {
                        sel = item.children[j];
                        ret.children.push(sel);
                    }
                }
                // throw new Error('xarguments. expected selector node: ' + JSON.stringify(node, null, 2))
                else {
                    ret.children.push(item);
                }
            }
        }
    }
    if (temp.tag !== null) {
        ret.children.push(temp);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node delimiter
format.delimiter = function(parent, node, options) {
    // loog 'node : delimiter ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'delimiter', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node parentheses
format.parentheses = function(parent, node, options) {
    // loog 'node : parentheses ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '(', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = '(' + ret.name + ')';
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node combinator
format.combinator = function(parent, node, options) {
    // loog 'node : combinator ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'combinator', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.tag = node.content;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node dimension
format.dimension = function(parent, node, options) {
    // loog 'node : dimension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'dimension', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node operator
format.operator = function(parent, node, options) {
    // loog 'node : operator ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'operator', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    ret.name = ' ' + ret.name + ' ';
    ret.textified = ret.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node atkeyword
format.atkeyword = function(parent, node, options) {
    // loog 'node : atkeyword ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node atrule
format.atrule = function(parent, node, options) {
    // loog 'node : atrule ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@@@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@' + getNodeText(p);
        removeChildByTag(ret, '@@');
    }
    var p_block = getChildByTag(ret, 'block');
    if (p_block) {
        removeChildByTag(ret, 'block');
    }
    if (isTextualNode(ret.children)) {
        ret.name = getTextList(ret, ' ');
        ret.textified = ret.name;
        ret.children = [];
    }
    else {
        if (ret.tag === '@function' && ret.children.length > 0 && ret.children[0].tag === '_') {
            ret.name = ret.children[0].name || getNodeText(ret.children[0]);
            var acc = [];
            var i, i_items=ret.children[0].children, i_len=ret.children[0].children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[0].children[i];
                item.tag = item.tag === '@' ? 'param' : item.tag;
                acc.push(item);
            }
            ret.children = acc;
        }
    }
    if (p_block) {
        var i, i_items=p_block.children, i_len=p_block.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_block.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node mixin
format.mixin = function(parent, node, options) {
    // loog 'node : mixin ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'mixin', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@mixin';
        removeChildByTag(ret, '@@');
    }
    var p = getChildByTag(ret, 'ident');
    if (p) {
        ret.name = getNodeText(p);
        removeChildByTag(ret, 'ident');
    }
    p = getChildByTag(ret, 'xarguments');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            item.tag = item.tag === '@' ? 'param' : item.tag;
            ret.children.push(item);
        }
        removeChildByTag(ret, 'xarguments');
    }
    p = getChildByTag(ret, 'block');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            ret.children.push(item);
        }
        removeChildByTag(ret, 'block');
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node extend
format.extend = function(parent, node, options) {
    // loog 'node : extend ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'extend', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@extend';
        removeChildByTag(ret, '@@');
    }
    p = getChildByTag(ret, 'selector');
    if (p) {
        if (isTextualNode(p)) {
            ret.name = getNodeText(p);
            removeChildByTag(ret, 'selector');
        }
        else if (p.children.length == 1 && isTextualNode(p.children[0])) {
            ret.name = getNodeText(p.children[0]);
            removeChildByTag(ret, 'selector');
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node placeholder
format.placeholder = function(parent, node, options) {
    // loog 'node : placeholder ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '%', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = ret.name;
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node interpolation
format.interpolation = function(parent, node, options) {
    // loog 'node : interpolation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '#{', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and
    // embed its array of nodes in a temp var
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var p_content = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(p_content, item, options)
        }
    }
    if (isTextualNode(p_content.children)) {
        ret.name = getTextList(p_content, '');
        ret.textified = '#{' + ret.name + '}';
    }
    else {
        var i, i_items=p_content.children, i_len=p_content.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_content.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node conditionalStatement
format.conditionalStatement = function(parent, node, options) {
    // loog 'node : conditionalStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'conditionalStatement', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = ret.children[0].tag;
    removeChildByPos(ret, 0);
    var p = getChildByTag(ret, 'block');
    if (p) {
        var i, i_items=p.children, i_len=p.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p.children[i];
            ret.children.push(item);
        }
        removeChildByTag(ret, 'block');
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node condition
format.condition = function(parent, node, options) {
    // loog 'node : condition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'condition', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@' + p.name;
        removeChildByTag(ret, '@@');
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node loop
format.loop = function(parent, node, options) {
    // loog 'node : loop ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'loop', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection content and append ittfNode(s) to `ret`
    if (node.content) {
        if (typeof node.content.length === 'undefined') {
            throw new Error('Property node.content must be an array');
        }
        var i, i_items=node.content, i_len=node.content.length, item;
        for (i=0; i<i_len; i++) {
            item = node.content[i];
            item.__parent = {
                name: 'content', 
                len: node.content.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection content undefined: ' + JSON.stringify(node, null, 2));
    }
    var p = getChildByTag(ret, '@@');
    if (p) {
        ret.tag = '@' + p.name;
        removeChildByTag(ret, '@@');
    }
    var p_block = getChildByTag(ret, 'block');
    if (p_block) {
        removeChildByTag(ret, 'block');
    }
    if (isTextualNode(ret.children)) {
        ret.name = getTextList(ret, ' ');
        ret.textified = ret.name;
        ret.children = [];
    }
    else {
        throw new Error('loop. expected textual. node:' + JSON.stringify(node, null, 2));
    }
    if (p_block) {
        var i, i_items=p_block.children, i_len=p_block.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_block.children[i];
            ret.children.push(item);
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node default
format.default = function(parent, node, options) {
    // loog 'node : default ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'default', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node singlelineComment
format.singlelineComment = function(parent, node, options) {
    // loog 'node : singlelineComment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '/*', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node multilineComment
format.multilineComment = function(parent, node, options) {
    // loog 'node : multilineComment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '/*', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.content, value: ', node.content, ', type: string'
    if (typeof node.content !== 'undefined') {
        ret.name = node.content.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
function processLeadingComments(node, ittfNode) {
    if (verify.isArray(node.leadingComments) && node.leadingComments.length > 0) {
        var i, i_items=node.leadingComments, i_len=node.leadingComments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.leadingComments[i];
            if (item.type === 'CommentLine') {
                ittfNode.children.push({
                    tag: '#', 
                    name: item.value, 
                    children: [
                        
                    ]
                 })
            }
        }
    }
}
function processParams(ittfNode) {
    var pos = getChildPosByTag(ittfNode, 'params');
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (pos == i) {
            var j, j_items=item.children, j_len=item.children.length, p;
            for (j=0; j<j_len; j++) {
                p = item.children[j];
                // loog 'processParams. p.tag', p.tag
                
                /**
                    * 
                        * new Error('processParams.error. Param must be a textual or an ObjectPattern. Node:' + JSON.stringify(ittfNode))
                */
                if (p.tag !== '{') {
                    if (isTextualNode(p)) {
                        p.tag = 'param';
                    }
                }
                temp.push(p);
            }
        }
        else {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function getNodeText(ittfNode) {
    return ittfNode.textified || ittfNode.name;
}
function isTextualNode(ittfNode) {
    if (verify.isArray(ittfNode)) {
        var i, i_items=ittfNode, i_len=ittfNode.length, item;
        for (i=0; i<i_len; i++) {
            item = ittfNode[i];
            if (!isTextualNode(item)) {
                return false;
            }
        }
        return true;
    }
    // loog 'isTextualNode', ittfNode.tag, ittfNode.name, !!(ittfNode.isText || ittfNode.textified)
    else {
        return ittfNode && (ittfNode.isText || ittfNode.textified);
    }
}
function isTextualChildByTag(ittfNode, tag) {
    var item = getChildByTag(ittfNode, tag);
    return item && (item.isText || item.textified);
}
function replaceChildTag(ittfNode, oldTag, newTag) {
    var item = getChildByTag(ittfNode, oldTag);
    item.tag = newTag;
}
function removeChildByTag(ittfNode, tag) {
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag !== tag) {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function removeChildByPos(ittfNode, pos) {
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (i != pos) {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function getChildByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return item;
        }
    }
    return null;
}
function getChildPosByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return i;
        }
    }
    return -1;
}
function replaceChildrenOfChildWhenText(ittfNode, childPos, textTag) {
    if (childPos < 0) {
        return ;
    }
    ittfNode.children = replaceItemInColl(ittfNode.children, childPos, textifyChildren(ittfNode.children[childPos], textTag))
    ;
}
function replaceItemInColl(coll, pos, replacers) {
    var ret = [];
    var i, i_items=coll, i_len=coll.length, item;
    for (i=0; i<i_len; i++) {
        item = coll[i];
        if (pos == i) {
            var j, j_items=replacers, j_len=replacers.length, repl;
            for (j=0; j<j_len; j++) {
                repl = replacers[j];
                ret.push(repl);
            }
        }
        else {
            ret.push(item);
        }
    }
    return ret;
}
function textifyChildren(ittfNode, tag) {
    var ret = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        
        // loog '@@@@@@@ item.tag.isText', item.tag, item.isText
        if (item.isText || item.textified) {
            ret.push({
                tag: tag, 
                name: item.isText ? item.name : item.textified, 
                textified: item.isText ? item.name : item.textified, 
                children: [
                    
                ]
             })
        }
        else {
            ret.push(item);
        }
    }
    // loog '@@@@@@@@@@@@@@@ textifyChildren', ret
    return ret;
}
function setTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        // loog 'setTextList', item.tag, item.isText, item.textified
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        else {
            return false;
        }
    }
    ittfNode.textified = sb.join(sep);
    ittfNode.children = [];
    return true;
}
function getTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        // loog 'getTextList failed ***************', item
        else {
            return null;
        }
    }
    return sb.join(sep);
}
function setNameFromChildByTag(ittfNode, tag, forceText) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            
            // loog '...................setNameFromChildByTag', item
            if (forceText) {
            }
            if (item.isText) {
                ittfNode.name = item.name;
                ittfNode.children.splice(i, 1);
                return ;
            }
            if (forceText && item.textified) {
                ittfNode.name = item.textified;
                ittfNode.children.splice(i, 1);
                return ;
            }
        }
    }
}
function objectDeclareKey(key) {
    return key.indexOf(' ') > 0 ? '["' + key + '"]' : key;
}
function replaceWithSingleChild(ittfNode, childTag, limit) {
    if (isChildrenCount(ittfNode, 1)) {
        var childTag = ittfNode.children[0].tag;
        var testTag = limit ? childTag.substr(0, limit) : childTag;
        if (testTag === childTag) {
            ittfNode.tag = ittfNode.children[0].tag;
            ittfNode.name = ittfNode.children[0].name;
            ittfNode.textified = ittfNode.children[0].textified;
            ittfNode.children = ittfNode.children[0].children;
            return true;
        }
    }
    return false;
}
function isChildrenCount(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length == count;
}
function isChildrenCountGreaterEqualThen(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length >= count;
}
