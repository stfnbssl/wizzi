/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfGraph\ittfDocumentGraph.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var async = require('async');
var vfile = require('../fSystem/vfile');
var verify = require('../helpers/verify');
var asIsLoader = require('./asIsLoader');
var IttfFinder = require('./ittfFinder');
/**
    
     Not really a Graph yet.
     But a simple node tree of a ITTF Source Unit, that can analize the ITTF Nodes.
     Starting from a mTreeBrick like structure
     { mTreeNode
     string name
     string value
     integer id?
     [ children
     { mTreeNode
    
     Usefull for
     - analizing raw ittf documents, before composition and evaluation, for
     documentation purposes;
     - building mTreeBricks by code.
    
     can be loaded
     - from a source ittf document (loaded as is, no composition and evaluation)
     - from a loaded mTree (less usefull)
     - calling the 'add' and 'insertAt' methods
    
     can be analized to detect
     - path of called mixins and includes
     - ittf commands
     - nodes with jswizzi statements
     - nodes commented out
    
     can be exported to
     - a new IttfDocumentGraph
     - appended to an existing mTreeNode
    
     Is Used by ittfHtmlPrettifier to analize and prettify
    
     The default store kind is 'filesystem' or 'browser'.
     Otherwise a vfile instance must be passed in the property 'file' of
     the 'options' param of the 'loadFrom' method.
*/
var IttfDocumentGraph = (function () {
    function IttfDocumentGraph(name, value, parent) {
        _classCallCheck(this, IttfDocumentGraph);
        this.__type = 'IttfDocumentGraph';
        this.name = name;
        this.value = value || '';
        this.parent = parent || null;
        this.children = [];
        if (this.parent == null) {
            this.fragments = {};
            this.ittfReferences = {};
            this.errorFragments = [];
        }
    }
    IttfDocumentGraph.prototype.root = function() {
        return this.parent == null ? this : this.parent.root();
    }
    IttfDocumentGraph.prototype.preAdd = function(name, value) {
        if ({}.toString.call(name) === '[object Object]' && name.name) {
            name.parent = this;
            return name;
        }
        else {
            var node = new IttfDocumentGraph(name, value, this);
            node.commentState = 0;
            return node;
        }
    }
    IttfDocumentGraph.prototype.insertAt = function(name, value, pos) {
        var node = this.preAdd(name, value);
        if (pos > this.children.length) {
            this.children.push(node);
        }
        else {
            this.children.splice(pos, 0, node);
        }
        return node;
    }
    IttfDocumentGraph.prototype.add = function(name, value) {
        var node = this.preAdd(name, value);
        // log 'add', this.name, node.name
        this.children.push(node);
        return node;
    }
    IttfDocumentGraph.prototype.append = function(sb, indent) {
        // loog 'sb',sb
        sb.push(indentTabs(indent) + this.name + (this.value && this.value.length > 0 ? ' ' + this.value : ''))
        var i, i_items=this.children, i_len=this.children.length, node;
        for (i=0; i<i_len; i++) {
            node = this.children[i];
            node.append(sb, indent + 1);
        }
    }
    IttfDocumentGraph.prototype.writeFile = function(string_path, callback) {
        var sb = [];
        this.append(sb, 0);
        this.file.write(string_path, sb.join('\n'))
        callback(null);
    }
    IttfDocumentGraph.prototype.toString = function() {
        var sb = [];
        this.append(sb, 0);
        return sb.join('\n');
    }
    IttfDocumentGraph.prototype.loadFromNode = function(node, $params) {
        this.name = (node.name || node.n) + (node.tagSuffix || '');
        this.value = node.value || node.v || '';
        this.row = node.row || node.r || '';
        this.col = node.col || node.c || '';
        if (node.id) {
            this.id = node.id;
        }
        // loog 'loadFromNode', node.name, $params
        if ($params && $params.length > 0) {
            this.add('$params', $params, this);
        }
        this.__importChilds(node.children);
    }
    IttfDocumentGraph.prototype.__importChilds = function(children) {
        var added;
        if (children && children.length) {
            var i, i_items=children, i_len=children.length, node;
            for (i=0; i<i_len; i++) {
                node = children[i];
                added = this.add((node.name || node.n) + (node.tagSuffix || ''), node.value || node.v || '')
                ;
                added.row = node.row || node.r || '';
                added.col = node.col || node.c || '';
                if (node.id) {
                    added.id = node.id;
                }
                added.commentState = node.commentState;
                if (node.$params && node.$params.length > 0) {
                    added.add('$params', node.$params, node)
                }
                added.__importChilds(node.children)
            }
        }
    }
    IttfDocumentGraph.prototype.__getVFile = function(options, callback) {
        if (options.file) {
            this.file = options.file;
            return callback(null, options.file);
        }
        // load the default vfile (filesystem or browser)
        else {
            var that = this;
            return vfile(function(err, file) {
                    if (err) {
                        return callback(err);
                    }
                    that.file = file;
                    return callback(null, file);
                });
        }
    }
    // params
    // mTreeOrFilepathOrContent
    // filepath | ittfContent | mTree
    // { options
    // boolean fromString
    // boolean clean
    IttfDocumentGraph.prototype.__loadMTree = function(mTreeOrFilepathOrContent, options, callback) {
        var that = this;
        this.__getVFile(options, function(err, file) {
            if (err) {
                return callback(err);
            }
            // loog '__loadMTree, this.file', that.file
            options.file = file;
            if (options.createEmpty) {
                return callback(null, that);
            }
            
            // loog 'ittfDocumentGraph.__loadMTree. mTreeOrFilepathOrContent is an object'
            if (verify.isObject(mTreeOrFilepathOrContent)) {
                if (verify.isArray(mTreeOrFilepathOrContent.nodes) && mTreeOrFilepathOrContent.nodes.length == 1) {
                    that.loadFromNode(mTreeOrFilepathOrContent.nodes[0], mTreeOrFilepathOrContent.$params);
                }
                else if ((mTreeOrFilepathOrContent.name || mTreeOrFilepathOrContent.n) && mTreeOrFilepathOrContent.children) {
                    that.loadFromNode(mTreeOrFilepathOrContent, mTreeOrFilepathOrContent.$params);
                }
                else {
                    return callback({
                            __is_error: true, 
                            method: 'wizzi-utils.ittfDocumentGraph.__loadMTree', 
                            message: 'Invalid object parameter: mTreeOrFilepathOrContent. The object is not an mTree object.'
                         });
                }
                return callback(null, that);
            }
            
            // loog 'ittfDocumentGraph.__loadMTree. mTreeOrFilepathOrContent is a string'
            else if (verify.isNotEmpty(mTreeOrFilepathOrContent)) {
                that.model = {
                    uri: (options.fromString ? 'string://' : mTreeOrFilepathOrContent), 
                    dirname: (options.fromString ? '' : path.dirname(mTreeOrFilepathOrContent))
                 };
                
                // loog 'ittfDocumentGraph.__loadMTree. Loading from text string'
                if (options.fromString) {
                    asIsLoader.createFromString(mTreeOrFilepathOrContent, options, function(err, asisMTree) {
                        if (err) {
                            return callback(err);
                        }
                        that.content = asisMTree.content;
                        // loog 'ittfDocumentGraph.asis.loader.asisMTree.nodes.length', asisMTree.nodes.length, !asisMTree.nodes[0]
                        that.loadFromNode(asisMTree.nodes[0], asisMTree.$params)
                        return callback(null, that);
                    })
                }
                // loog 'ittfDocumentGraph.__loadMTree. Loading from file'
                // load from file using the vfile class
                else {
                    file.isFile(mTreeOrFilepathOrContent, function(err, isFile) {
                        if (err) {
                            return callback(err);
                        }
                        if (isFile == false) {
                            return callback({
                                    __is_error: true, 
                                    method: 'wizzi-utils.ittfDocumentGraph.__loadMTree', 
                                    message: 'Document not found: ' + mTreeOrFilepathOrContent
                                 });
                        }
                        else {
                            asIsLoader(mTreeOrFilepathOrContent, options, function(err, asisMTree) {
                                if (err) {
                                    return callback(err);
                                }
                                that.content = asisMTree.content;
                                // loog 'ittfDocumentGraph.asis.loader.asisMTree.nodes.length', asisMTree.nodes.length, !asisMTree.nodes[0]
                                that.loadFromNode(asisMTree.nodes[0], asisMTree.$params)
                                that.model.basename = path.basename(mTreeOrFilepathOrContent);
                                var ss = that.model.basename.split('.');
                                that.model.isIttf = ss[ss.length-1] === 'ittf';
                                if (that.model.isIttf) {
                                    that.model.schema = ss[ss.length-2].toLowerCase();
                                    that.model.seedName = ss.slice(0,-2).join('.');
                                    if (that.model.schema !== 'json') {
                                        that.model.jsonTwinUri = path.join(that.model.dirname, that.model.seedName + '.json.ittf')
                                        ;
                                    }
                                }
                                // loog 'ittfDocumentGraph.loadFrom.ittf.model', that.model
                                return callback(null, that);
                            })
                        }
                    })
                }
            }
            else {
                return callback({
                        __is_error: true, 
                        method: 'wizzi-utils.ittfDocumentGraph.__loadMTree', 
                        message: 'Invalid parameter: mTreeOrFilepathOrContent', 
                        paramValue: mTreeOrFilepathOrContent
                     });
            }
        })
    }
    // params
    // mTreeOrFilepathOrContent
    // filepath | ittfContent | mTree
    // { options
    // boolean createEmpty
    // boolean fromString
    // boolean clean
    // string name
    // string value
    // object parent
    IttfDocumentGraph.createFrom = function(mTreeOrFilepathOrContent, options, callback) {
        if (typeof(callback) === 'undefined' && verify.isFunction(options)) {
            callback = options;
            options = {};
        }
        else {
            options = options || {};
        }
        function clean(node) {
            delete node.parent
            delete node.model
            if (node.children) {
                var i, i_items=node.children, i_len=node.children.length, item;
                for (i=0; i<i_len; i++) {
                    item = node.children[i];
                    clean(item);
                }
            }
            return node;
        }
        var ittfDocuGraph = new IttfDocumentGraph(options.name, options.value, options.parent);
        ittfDocuGraph.__loadMTree(mTreeOrFilepathOrContent, options, function(err, ittfDocuGraph) {
            if (err) {
                return callback(err);
            }
            // loog 'wizzi-utils.ittfDocumentGraph.createFrom. Received ittfDocuGraph', ittfDocuGraph.name, ittfDocuGraph.value
            if (options.clean) {
                clean(ittfDocuGraph);
            }
            callback(null, ittfDocuGraph)
        })
    }
    IttfDocumentGraph.prototype.toMTreePiece = function(parent) {
        if (!parent) {
            parent = {
                parent: null, 
                name: this.name, 
                value: this.value, 
                children: []
             };
        }
        var i, i_items=this.children, i_len=this.children.length, item;
        for (i=0; i<i_len; i++) {
            item = this.children[i];
            var child = {
                parent: parent, 
                name: item.name, 
                value: item.value, 
                children: []
             };
            item.toMTreePiece(child);
            parent.children.push(child);
        }
        return parent;
    }
    IttfDocumentGraph.prototype.isCommandCheck = function() {
        return this.name && this.name[0] === '$';
    }
    IttfDocumentGraph.prototype.isMetaCommandCheck = function() {
        return this.isCommandCheck() && this.name === '$file';
    }
    IttfDocumentGraph.prototype.isExpressionCommand = function() {
        return this.name && ['$if', '$elif', '$foreach', '$backeach', '$while'].indexOf(this.name) == 0;
    }
    IttfDocumentGraph.prototype.isCodeDeclareCheck = function() {
        return this.name && ['$', '$global'].indexOf(this.name) == 0;
    }
    IttfDocumentGraph.prototype.isMultilineDeclareCheck = function() {
        return this.name && ['$.'].indexOf(this.name) == 0;
    }
    IttfDocumentGraph.prototype.isCode = function() {
        var test = this.parent;
        while (test) {
            if (test.isCodeDeclareCheck()) {
                return true;
            }
            test = test.parent;
        }
        return false;
    }
    IttfDocumentGraph.prototype.isMixinCall = function() {
        return this.name && this.name.substr(-1,1) === '(';
    }
    IttfDocumentGraph.prototype.isIncludeCall = function() {
        return this.name === '$include';
    }
    IttfDocumentGraph.prototype.isReferenceToIttf = function() {
        
        // loog 'isReferenceToIttf.this.getValueStripComments()', verify.endsWith(this.getValueStripComments(), '.ittf')
        if (verify.isNotEmpty(this.getValueStripComments())) {
            return verify.endsWith(this.getValueStripComments(), '.ittf');
        }
        else {
            return false;
        }
    }
    IttfDocumentGraph.prototype.isLineContinuation = function() {
        return this.name && ['\\', '\\b', '\\n'].indexOf(this.name) == 0;
    }
    IttfDocumentGraph.prototype.getMixinArgs = function() {
        var ret = [];
        if (this.isMixinCall()) {
            var v = this.getValueStripComments();
            if (v.substr(-1) === ')') {
                v = v.substr(0, v.length-1);
            }
            var ss = v.split(',');
            var i, i_items=ss, i_len=ss.length, s;
            for (i=0; i<i_len; i++) {
                s = ss[i];
                if (s.length > 0) {
                    ret.push(s);
                }
            }
        }
        return ret;
    }
    IttfDocumentGraph.prototype.getValueStripComments = function() {
        var ndx = this.value.indexOf('$'+ '$');
        if (ndx < 0) {
            ndx = this.value.indexOf('$' + '*');
        }
        if (ndx < 0) {
            return this.value;
        }
        return this.value.substr(0, ndx).trim();
    }
    IttfDocumentGraph.prototype.getValueParsed = function() {
        //
        // Parses this mTree node value property
        // detecting interpolations: ${expr}
        // Returns an array of value parts where part items can be
        // of type 0 (normal text) or 1 (interpolated expr)
        //
        // return
        // [ parts
        // { part
        // integer t
        // one-of: 0 (text), 1 (expr)
        // string v
        // # text or expr
        //
        // state 1 '$'
        // state 2 '${'
        // state 3 '\'
        var v = this.value.trim(),
            len = v.length,
            ch,
            i,
            parts = [],
            partsIndex = 0,
            text = [],
            expr = [],
            state = 0;
        for (i=0; i<len; i++) {
            ch = v[i];
            if (ch == '$') {
                if (state == 0) {
                    state = 1;
                }
                else if (state == 1) {
                    text.push('$');
                    text.push(ch);
                    state = 0;
                }
                else if (state == 3) {
                    text.push('\\');
                    state = 1;
                }
                else {
                    expr.push(ch);
                }
            }
            else if (ch == '{') {
                if (state == 0) {
                    text.push(ch);
                }
                else if (state == 1) {
                    state = 2;
                }
                else if (state == 3) {
                    text.push('\\');
                    text.push(ch);
                }
                else {
                    expr.push(ch);
                }
            }
            else if (ch == '}' && state == 2) {
                if (text.length > 0) {
                    parts.push({
                        t: 0, 
                        v: text.join('')
                     })
                    text = [];
                }
                parts.push({
                    t: 1, 
                    v: expr.join('')
                 })
                expr = [];
                state = 0;
            }
            else if (ch == '\\' && (i == 0 || i == len-2)) {
                state = 3;
            }
            else if (state == 0) {
                text.push(ch);
            }
            else if (state == 1) {
                text.push('$');
                text.push(ch);
                state = 0;
            }
            else if (state == 2) {
                expr.push(ch);
            }
            else if (state == 3) {
                if (ch == 'b') {
                    if (text.length > 0) {
                        parts.push({
                            t: 0, 
                            v: text.join('')
                         })
                    }
                    text = [];
                    parts.push({
                        t: 2
                     })
                }
                else {
                    text.push('\\');
                    text.push(ch);
                }
                state = 0;
            }
        }
        if (text.length > 0) {
            parts.push({
                t: 0, 
                v: text.join('')
             })
            text = [];
        }
        return parts;
    }
    // called on the root node
    // for example by ittfHtmlPrettifier
    // params
    // { ctx
    // { fragments
    // { ittfReferences
    // { ittfFsNode
    // string ittfBasePath
    IttfDocumentGraph.prototype.analize = function(ctx, callback) {
        if (typeof callback === 'undefined') {
            callback = ctx;
            ctx = {};
        }
        if (typeof ctx === 'undefined') {
            ctx = {};
        }
        var that = this;
        this.analizeRoot(ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            that.analizeFragment(ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                // loog 'name', that.name
                if (that.isCodeDeclareCheck()) {
                    that.isCodeDeclare = true;
                    return callback(null);
                }
                else if (that.isMultilineDeclareCheck()) {
                    that.isMultilineDeclare = true;
                    return callback(null);
                }
                else {
                    if (that.isMetaCommandCheck()) {
                        that.isMetaCommand = true;
                    }
                    else if (that.isCommandCheck()) {
                        that.isCommand = true;
                    }
                    function doLoop(ndx) {
                        var item = that.children[ndx];
                        if (!item) {
                            return callback(null);
                        }
                        // loog 'return analizeFragment, item.name, item.commentState', item.name, item.commentState
                        if (item.commentState == 0) {
                            item.analize(ctx, function(err, notUsed) {
                                if (err) {
                                    return callback(err);
                                }
                                return process.nextTick(()=>{doLoop(ndx + 1)});
                            })
                        }
                        else {
                            return process.nextTick(()=>{doLoop(ndx + 1)});
                        }
                    }
                    return doLoop(0);
                }
            })
        })
    }
    IttfDocumentGraph.prototype.analizeRoot = function(ctx, callback) {
        var r = this.root();
        if (this == r && ctx.rootFolder && r.model && r.model.jsonTwinUri && r.model.jsonTwinUri.length > 0) {
            r.file.isFile(r.model.jsonTwinUri, function(err, isFile) {
                if (err) {
                    return callback(err);
                }
                if (isFile) {
                    var fragment = {
                        oper: 'ittfReference', 
                        baseUri: verify.unixifyPath(r.model.dirname), 
                        name: path.basename(r.model.jsonTwinUri), 
                        uri: r.model.jsonTwinUri, 
                        id: 'unknown', 
                        relUri: verify.unixifyPath(path.relative(ctx.rootFolder, r.model.jsonTwinUri))
                     };
                    r.ittfReferences[fragment.name] = fragment;
                }
                return callback();
            })
        }
        else {
            return callback();
        }
    }
    IttfDocumentGraph.prototype.analizeFragment = function(ctx, callback) {
        if (this.isMixinCall() == false && this.isIncludeCall() == false && this.isReferenceToIttf() == false) {
            return callback();
        }
        if (this.isReferenceToIttf() && !(ctx && ctx.rootFolder)) {
            return callback();
        }
        // loog '******* analizeFragment', this.name, this.value
        var r = this.root();
        if (typeof r.model === 'undefined') {
            return callback(new Error('wizzi-utils.ittfDocumentGraph.analize require a `model` object in the root node. For example when created calling ittfDocumentGraph.createFrom(documentUri)'));
        }
        
        // TODO why false ???
        if (r.model.uri.indexOf('__copy') > -1) {
            return callback(null, false);
        }
        if (this.isMixinCall()) {
            this.isMixer = true;
            this.fragmentName = verify.endsWith(this.name, '(') ? this.name.substr(0, this.name.length -1) : this.name;
        }
        else if (this.isIncludeCall()) {
            this.isIncluder = true;
            this.fragmentName = this.getValueStripComments();
        }
        else {
            this.fragmentName = this.getValueStripComments();
        }
        var fragment = {
            oper: this.isMixinCall() ? 'mix' : this.isIncludeCall() ? 'include' : 'ittfReference', 
            baseUri: verify.unixifyPath(path.dirname(r.model.uri)), 
            name: this.fragmentName, 
            uri: 'unknown', 
            id: 'unknown'
         };
        var that = this;
        this.__getFragmentPath(ctx, function(err, fragmentPath) {
            if (err) {
                return callback(err);
            }
            
            // throw new Error(fragmentPath)
            if (fragmentPath.__is_error) {
                fragment.__is_error = true;
                fragment.message = 'NotFound in repository';
                r.errorFragments.push(fragment);
                return callback();
            }
            else {
                fragment.uri = verify.unixifyPath(fragmentPath);
                if (ctx && ctx.ittfBasePath && ctx.ittfFsNode) {
                    var fragmentDocument = ctx.ittfFsNode.searchDocument(fragmentPath);
                    if (!fragmentDocument) {
                        fragment.__is_error = true;
                        fragment.message = 'NotFound in ittfFsNode documents.';
                        r.errorFragments.push(fragment);
                        if (ctx.externalFragments) {
                            ctx.externalFragments[that.fragmentName] = fragment;
                        }
                    }
                    else {
                        fragment.id = fragmentDocument.id;
                        if (that.isReferenceToIttf()) {
                            if (ctx.ittfReferences) {
                                ctx.ittfReferences[that.fragmentName] = fragment;
                            }
                        }
                        else {
                            if (ctx.fragments) {
                                ctx.fragments[that.fragmentName] = fragment;
                            }
                        }
                    }
                }
                if (ctx && ctx.rootFolder) {
                    fragment.relUri = verify.unixifyPath(path.relative(ctx.rootFolder, fragmentPath))
                    ;
                }
                
                // do not override
                if (that.isReferenceToIttf()) {
                    if (!r.ittfReferences[that.fragmentName]) {
                        r.ittfReferences[that.fragmentName] = fragment;
                    }
                }
                // do not override
                else {
                    if (!r.fragments[that.fragmentName]) {
                        r.fragments[that.fragmentName] = fragment;
                    }
                }
                return callback();
            }
        })
    }
    IttfDocumentGraph.prototype.__getFragmentPath = function(ctx, callback) {
        var r = this.root(),
            fragmentPath;
        if (this.isReferenceToIttf() && ctx && verify.isNotEmpty(ctx.rootFolder)) {
            if (this.fragmentName[0] === '/') {
                fragmentPath = path.join(ctx.rootFolder, this.fragmentName)
                ;
            }
            else {
                fragmentPath = path.resolve(r.model.dirname, this.fragmentName)
                ;
            }
            r.file.isFile(fragmentPath, function(err, isFile) {
                if (err) {
                    return callback(err);
                }
                if (isFile) {
                    return callback(null, fragmentPath);
                }
                else {
                    return callback(null, {
                            __is_error: true, 
                            uri: fragmentPath
                         });
                }
            })
        }
        else {
            var ittfFinder = new IttfFinder(r.file);
            var that = this;
            ittfFinder.resolvePath({
                callerFullPath: r.model.uri, 
                fragmentName: this.fragmentName
             }, function(err, result) {
                if (err) {
                    return callback(null, {
                            __is_error: true, 
                            fragment: that.fragmentName, 
                            message: err.message
                         });
                }
                else {
                    return callback(null, result);
                }
            })
        }
    }
    IttfDocumentGraph.prototype.find = function(name) {
        if (verify.isNotEmpty(name)) {
            return this._findByName(name);
        }
        else if (verify.isObject(name) && verify.isNumber(name.id)) {
            return this._findById(name.id);
        }
        else {
            throw new Error('wizzi-utils.ittfDocumentGraph.find. Invalid argument name: ' + name);
        }
    }
    IttfDocumentGraph.prototype._findByName = function(name) {
        if (this.name === name) {
            return this;
        }
        var found = null;
        var i, i_items=this.children, i_len=this.children.length, item;
        for (i=0; i<i_len; i++) {
            item = this.children[i];
            found = item._findByName(name);
            if (found) {
                break;
            }
        }
        return found;
    }
    IttfDocumentGraph.prototype._findById = function(id) {
        if (this.id === id) {
            return this;
        }
        var found = null;
        var i, i_items=this.children, i_len=this.children.length, item;
        for (i=0; i<i_len; i++) {
            item = this.children[i];
            found = item._findById(id);
            if (found) {
                break;
            }
        }
        return found;
    }
    IttfDocumentGraph.prototype.findByRow = function(row) {
        if (this.row === row) {
            return this;
        }
        var found = null;
        var i, i_items=this.children, i_len=this.children.length, item;
        for (i=0; i<i_len; i++) {
            item = this.children[i];
            found = item.findByRow(row);
            if (found) {
                break;
            }
        }
        return found;
    }
    IttfDocumentGraph.prototype.equals = function(other) {
        // loog 'wizzi-utils.ittfDocumentGraph.equals', this.name, this.value, other.name, other.value
        if (this.name !== other.name || this.value !== other.value) {
            return false;
        }
        if (this.children.length !== other.children.length) {
            return false;
        }
        var eq = true;
        for (var i=0; i<this.children.length; i++) {
            eq = this.children[i].equals(other.children[i]);
            if (!eq) {
                break;
            }
        }
        return eq;
    }
    return IttfDocumentGraph;
})();

function indentTabs(num) {
    var ret = [];
    for (var i=0; i<num; i++) {
        ret.push('\t');
    }
    return ret.join('');
}
function unixify(path) {
    return verify.replaceAll(path, '\\', '/');
}
module.exports = IttfDocumentGraph;