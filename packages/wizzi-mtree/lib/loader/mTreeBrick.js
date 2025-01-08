/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\mTreeBrick.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('@wizzi/utils').verify;
/**
     An mTreeBrick is a nodified ittf document.
     In the build-up of an mTree, the same mTreeBrick can be mixed
     or included many times, so it is created once then cloned.
     { mTreeBrick
     string uri       // The location of the source IttfDocument.
     string schema    // The source IttfDocument schema.
     { loadHistory    // The loadHistory object
     { frontMatter    // The frontMatter object
     [ lines          // parsed lines of source text
     [ nodes          // nodified lines of source text
     string sourceKey // key of the source info of the IttfDocument
     string brickKey  // key of the cloned mTreeBrick
    
     ... these are set by the mixer, on the cloned object
     boolean mixed          // true if has been mixed
     string $mixerBrickKey  // the brickKey of the mTreeBrick of the calling node (mixer)
     string $args           // the node-value of the mixer node
     string $argArray       // the $arg array of the mixer node
    
     ... these are set by the nodifier on the original mtree, then cloned
     string $params:        // the node-value of the $params node, if declared
    
     Methods
     load				// apply liner + nodifier to a Ittf source text
     setKeys
     clone
     parseFragmentParamsValues
     toIttf
     toText
     dump
*/
var path = require('path');
var util = require('util');
var verify = require('@wizzi/utils').verify;
var errors = require('../errors');
var types = require('../utils/types');
var liner = require('./liner');
var nodifier = require('./nodifier');
var MTreeBrick = (function () {
    function MTreeBrick(uri, loadHistory, frontMatter) {
        _classCallCheck(this, MTreeBrick);
        this.uri = uri;
        this.loadHistory = loadHistory;
        this.frontMatter = frontMatter;
        this.documentFragments = [];
    }
    MTreeBrick.prototype.load = function(ittfSourceTextContent, ittfDocumentData) {
        if (verify.isNotEmpty(ittfSourceTextContent) === false) {
            return error(
                'InvalidArgument', 'load', { parameter: 'ittfSourceTextContent', message: 'The ittfSourceTextContent parameter must be a string. Received: ' + ittfSourceTextContent }
            );
        }
        if (verify.isObject(ittfDocumentData) === false) {
            return error(
                'InvalidArgument', 'load', { parameter: 'ittfDocumentData', message: 'The ittfDocumentData parameter must be an object. Received: ' + ittfDocumentData }
            );
        }
        if (verify.isNotEmpty(ittfDocumentData.sourceKey) === false) {
            return error(
                'InvalidArgument', 'load', { parameter: 'ittfDocumentData.sourceKey', message: 'The ittfDocumentData.sourceKey parameter must be a string. Received: ' + ittfDocumentData.sourceKey }
            );
        }
        var lines = liner(ittfSourceTextContent, ittfDocumentData);
        if (lines && lines.__is_error) {
            return lines;
        }
        var nodes = nodifier(lines, this);
        if (nodes && nodes.__is_error) {
            return nodes;
        }
        this.nodes = nodes;
    }
    MTreeBrick.prototype.setKeys = function(sourceKey, brickKey) {
        this.sourceKey = sourceKey;
        this.brickKey = brickKey;
    }
    MTreeBrick.prototype.findNodeById = function(nodeId) {
        var i, i_items=this.nodes, i_len=this.nodes.length, node;
        for (i=0; i<i_len; i++) {
            node = this.nodes[i];
            var found = this._findNodeById(nodeId, node);
            if (found) {
                return found;
            }
        }
        return null;
    }
    MTreeBrick.prototype._findNodeById = function(nodeId, node) {
        if (node.id == nodeId) {
            return node;
        }
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            var found = this._findNodeById(nodeId, child);
            if (found) {
                return found;
            }
        }
        return null;
    }
    MTreeBrick.prototype.clone = function() {
        var clonedModel = new MTreeBrick(this.uri, this.loadHistory, this.frontMatter);
        if (this.$params) {
            clonedModel.$params = this.$params;
        }
        clonedModel.nodes = this._cloneNodes(this.nodes, null, clonedModel);
        return clonedModel;
    }
    MTreeBrick.prototype._cloneNodes = function(nodes, parent, clonedModel) {
        var self = this;
        var clnode,
            clnodes = [];
        var i, i_items=nodes, i_len=nodes.length, node;
        for (i=0; i<i_len; i++) {
            node = nodes[i];
            clnode = {
                id: self.loadHistory.getNewNodeId(), 
                parsedId: node.id, 
                name: node.name, 
                value: node.value, 
                tagSuffix: node.tagSuffix, 
                row: node.row, 
                col: node.col, 
                sourceKey: node.sourceKey, 
                hasMacro: node.hasMacro, 
                parent: parent, 
                model: clonedModel
             };
            // loog 'clone node', node.name, node.value, node.$params
            
            // $fragment
            if (node.$params) {
                clnode.$params = node.$params;
            }
            clnode.children = self._cloneNodes(node.children, clnode, clonedModel);
            clnodes.push(clnode);
        }
        return clnodes;
    }
    MTreeBrick.prototype.cloneNode = function(node, parent, clonedModel) {
        var self = this;
        var clnode;
        clnode = {
            id: self.loadHistory.getNewNodeId(), 
            parsedId: node.id, 
            name: node.name, 
            value: node.value, 
            tagSuffix: node.tagSuffix, 
            row: node.row, 
            col: node.col, 
            sourceKey: node.sourceKey, 
            hasMacro: node.hasMacro, 
            parent: parent, 
            model: clonedModel
         };
        // loog 'clone node', node.name, node.value, node.$params
        
        // $fragment
        if (node.$params) {
            clnode.$params = node.$params;
        }
        clnode.children = self._cloneNodes(node.children, clnode, clonedModel);
        return clnode;
    }
    /**
         Rules
         `$params` node command format
         > $params param1 [,param2 [,param-n]]
         param   : [&]name[:type][|[&]default]
         &name   : the paramater is an object passed by reference, the name can be used in IttfMacro expressions
         name    : the paramater is a value, the name can be used in IttfMacro expressions
         type    : the parameter type
         one-of : string(default), integer, float, boolean, date, object (implicit
         when '&' declared), macro (implicit, detected from IttfMacro delimiters
         contained in the default value)
         &default : the default is an object in the global context, default is its name
         default  : typed-value | @@null | @@empty | @@undefined
         // warning! `title|null` becomes title = "null" (the quoted string null)
         // if you want title to be null then : `title|@@null`
         string  : quotes are optional, example: `title|"my way"` and `title|my way` are the same
         boolean : true | false
         date    : yyyy/mm/dd
         macro   : an IttfMacro can be passed as a parameter to a mixin, when the parameter
         is referenced we have a double macro substitution
         TODO verify, explain how this works, macro or macros can be partial
         insides of the default value?
    */
    MTreeBrick.prototype.parseFragmentParamsValues = function(mixerArgs) {
        // string mixerArgs
        // optional
        var mTreeBrickRoot = this.nodes[0];
        var mixedParams = this.$params;
        var _mixedParamArray = [],
            _mixerArgsArray = [];
        if (verify.isNotEmpty(mixedParams)) {
            _mixedParamArray = mixedParams.trim().split(',');
        }
        if (verify.isNotEmpty(mixerArgs)) {
            _mixerArgsArray = mixerArgs.trim().split(',');
        }
        var result = [];
        for (var i = 0; i < _mixedParamArray.length; i++) {
            var name,
                type = 'string',
                defaultValue = null,
                value = null,
                hasparamvalue = false,
                hasdefaultvalue = false,
                defaultName = null;
            // a param may have the format
            // 1) name
            // 2) name|default
            // 3) name:type|default
            // valid types: string(default), integer, float, boolean, date
            if (_mixedParamArray[i].trim().length == 0) {
                return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ' , Parameter [' + i + '] cannot be empty. Expected name[:type[|default]]', mTreeBrickRoot);
            }
            //
            // Extract param default value
            var mixedParam_parts = _mixedParamArray[i].trim().split(/[|]/)
            ;
            if (mixedParam_parts.length > 2) {
                return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ' , Parameter [' + i + '] / `' + _mixedParamArray[i] + '` is malformed. Expected name[:type[|default]]', mTreeBrickRoot);
            }
            if (mixedParam_parts.length == 2) {
                defaultValue = mixedParam_parts[1].trim();
                hasdefaultvalue = true;
            }
            //
            // Extract param name:type
            mixedParam_parts = mixedParam_parts[0].trim().split(/[:]/)
            ;
            if (mixedParam_parts.length > 2) {
                return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ' , Parameter [' + i + '] / `' + _mixedParamArray[i] + '` is malformed. Expected name[:type[|default]]', mTreeBrickRoot);
            }
            // name
            name = mixedParam_parts[0];
            // type
            if (mixedParam_parts.length == 2) {
                type = mixedParam_parts[1];
                if (['string','integer','float','boolean','date'].indexOf(type) < 0) {
                    return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ', on param: [' + (i+1) + '] / `' + name + '` : invalid type `' + type + '`', mTreeBrickRoot);
                }
            }
            // by ref paramtype
            if (name.substr(0, 1) === '&') {
                name = name.substr(1);
                type = 'object';
            }
            if (_mixerArgsArray.length > i) {
                value = _mixerArgsArray[i].trim();
                if (type === 'object') {
                    if (value.substr(0, 1) !== '&') {
                        return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ', argument [' + i + '] must be an object reference. Found ' + value, mTreeBrickRoot);
                    }
                    else {
                        value = value.substr(1);
                    }
                }
                else {
                    value = verify.convert(value, type, true);
                    if (value && value.__is_error) {
                        return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ', converting parameter: [' + i + '] / `' + name + '` to type `' + type + '`', mTreeBrickRoot, value);
                    }
                }
                hasparamvalue = true;
            }
            else if (hasdefaultvalue) {
                if (defaultValue.substr(0, 1) === '&') {
                    defaultName = defaultValue.substr(1);
                }
                else {
                    value = verify.convert(defaultValue, type, true);
                    if (value && value.__is_error) {
                        return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ', converting parameter: [' + i + '] / `' + name + '` to type `' + type + '`', mTreeBrickRoot, value);
                    }
                }
            }
            else {
                return local_error('FragmentParamsError', 'parseFragmentParamsValues', 'Error evaluating: $params ' + mixedParams + ', missing value for not optional argument [' + i + '] = `' + name + '`', mTreeBrickRoot);
            }
            var isIttfMacro = verify.isIttfMacro(value);
            // loog 'wizzi-mtree.parseFragmentParamsValues.isIttfMacro', isIttfMacro, value
            result.push({
                name: name.substr(0, 1) === '&' ? name.substr(1) : name, 
                value: value, 
                type: type, 
                isIttfMacro: isIttfMacro, 
                isByRef: type === 'object', 
                defaultName: defaultName, 
                defaultIsByRef: defaultName != null
             })
        }
        return result;
    }
    MTreeBrick.prototype.dump = function(evaluated) {
        var buffer = [],
            ctx = {
                evaluated: evaluated, 
                loadHistory: this.loadHistory, 
                frontMatter: this.frontMatter
             };
        this.nodes.forEach(function(node) {
            _dumpNodeDeep(node, 1, buffer, ctx);
        })
        return buffer.join('\n');
    }
    MTreeBrick.prototype.toIttf = function(node) {
        var buffer = [];
        if (node && (node.children || verify.isArray(node))) {
            if (verify.isArray(node)) {
                node.forEach(function(item) {
                    _toIttfNodeDeep(item, 0, buffer);
                })
            }
            else {
                _toIttfNodeDeep(node, 0, buffer);
            }
        }
        else {
            this.nodes.forEach(function(item) {
                _toIttfNodeDeep(item, 0, buffer);
            })
        }
        return buffer.join('\n');
    }
    MTreeBrick.prototype.toText = function(node) {
        var buffer = [];
        if (node && node.children) {
            _toTextNodeDeep(node, 0, buffer);
        }
        else {
            if (this.nodes.length == 1) {
                var root = this.nodes[0];
                var i, i_items=root.children, i_len=root.children.length, child;
                for (i=0; i<i_len; i++) {
                    child = root.children[i];
                    _toTextNodeDeep(child, 0, buffer);
                }
            }
        }
        return buffer.join('\n');
    }
    return MTreeBrick;
})();

function _toIttfNodeDeep(node, indent, buffer) {
    if (node.name) {
        buffer.push(spaces(indent * 4) + node.name + ' ' + (node.value || ''))
    }
    else {
        buffer.push(spaces(indent * 4) + node.n + ' ' + (node.v || ''))
    }
    indent++;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _toIttfNodeDeep(child, indent, buffer);
    }
}
function _toTextNodeDeep(node, indent, buffer) {
    buffer.push(spaces(indent * 4) + node.n + ' ' + node.v || '')
    indent++;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _toTextNodeDeep(child, indent, buffer);
    }
}
function _dumpNodeDeep(node, indent, buffer, ctx) {
    if (ctx.evaluated && node.u) {
        var sourceUri = ctx.loadHistory.ittfDocumentDatas[node.u].ittfDocumentUri;
        var sourceUriName = path.basename(sourceUri);
        var sourceUriFolder = path.basename(path.dirname(sourceUri));
        buffer.push(spaces(indent * 2) + node.n + ' ' + (node.v || '') + '    r' + node.r + ',c' + node.c + '                        source:  ' + sourceUriFolder + '/' + sourceUriName)
    }
    else {
        buffer.push(spaces(indent * 2) + node.name + ' ' + (node.value || '') + '  r' + node.row + ',c' + node.col + '    ids: ' + node.parsedId + ' ' + node.id + ' brickKey: ' + node.model.brickKey + ' mixed by: ' + (node.model.$mixerBrickKey || 'none'))
    }
    if (node.model) {
        if (node.model.$args || node.model.$params) {
            if (!ctx[node.model.brickKey]) {
                ctx[node.model.brickKey] = node.model;
                buffer.push(spaces(indent * 2) + '  -- fragment: ' + node.model.uri)
                buffer.push(spaces(indent * 2) + '  -- $args: ' + node.model.$args + ' $params: ' + node.model.$params)
            }
        }
    }
    indent++;
    node.children.forEach(function(n) {
        _dumpNodeDeep(n, indent, buffer, ctx);
    })
}
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}
function local_error(errorName, method, message, node, inner) {
    var errorNames = [errorName];
    if (inner && inner.data && inner.data.errorNames) {
        errorNames = errorNames.concat(inner.data.errorNames);
    }
    else if (inner && inner.errorName) {
        errorNames = errorNames.concat([inner.errorName]);
    }
    return new errors.WizziError(message, errorName, errorNames, {
            source: {
                method: 'wizzi-mtree@0.8.32.loader.MTreeBrick.' + method
             }, 
            mtree: {
                mTreeBrickNode: node
             }, 
            inner: inner || null
         });
}

module.exports = {
    MTreeBrick: MTreeBrick
};
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.loader.mTreeBrick.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}