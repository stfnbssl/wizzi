/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\errors.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var util = require('util');
var chalk = require('chalk');
var nodeUtils = require('./utils/node');
var md = module.exports = {};
function IttfNotFoundError(resourceType, name, sourceUri) {
    this.name = 'IttfNotFoundError';
    this.resourceType = resourceType;
    this.name = name;
    this.sourceUri = sourceUri;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = resourceType + ': ' + name +' not found, processing document ' + md.getSrcPathInfo(sourceUri);
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfNotFoundError.prototype.toString = function() {
    return this.message;
}
;
IttfNotFoundError.prototype = Object.create(Error.prototype);
IttfNotFoundError.prototype.constructor = IttfNotFoundError;
md.IttfNotFoundError = IttfNotFoundError;

function IttfLoadError(message, srcPath, node, ex) {
    this.name = 'IttfLoadError';
    this.message = message;
    this.srcPath = srcPath;
    this.node = node;
    this.ex = ex;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = message;
    if (srcPath) {
        this.message += '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    }
    
    // TODO set this.nodeInfo = new NodeError('', node)
    if (node) {
        this.message += ('\n' + new NodeError('', node).message);
    }
    // TODO set this.inner = ex ???
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfLoadError.prototype.toString = function() {
    return this.message;
}
;
IttfLoadError.prototype = Object.create(Error.prototype);
IttfLoadError.prototype.constructor = IttfLoadError;
md.IttfLoadError = IttfLoadError;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message;
    this.uri = uri;
    this.innerEx = innerEx;
    this.__is_error = true;
    this.__is_wizzi_error = true;
    this.message = message + '\nuri: ' + uri;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoIOError.prototype.toString = function() {
    return this.message;
}
;
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

class WizziError extends Error {
    constructor(message, errorName, errorNames, other) {
        super(message);
        this.name = this.errorName = errorName;
        this.errorNames = errorNames;
        // legacy error test, some code could still use it
        this.__is_error = true;
        this.data = {
            ...other||{}
         };
        // _ Error.captureStackTrace(this, this.constructor)
        
        if (this.data.mtree) {
            var d = this.data.mtree;
            var loadHistory = d.loadHistory ? d.loadHistory : d.mTreeBrick ? d.mTreeBrick.loadHistory : d.mTreeBrickNode ? d.mTreeBrickNode.model.loadHistory : null;
            
            // loog 'WizziError.mTreeNode', mTreeBrickNode
            if (d.mTreeBrickErrorNodeId && loadHistory) {
                var mTreeBrickNode = loadHistory.findNodeById(d.mTreeBrickErrorNodeId);
                if (mTreeBrickNode) {
                    // TODO : this.data.inner.errorName??? do explain
                    this.addHint('ittfErrorLines', md.nodeErrorLines(mTreeBrickNode.mTreeNode, {
                        errorName: this.data.inner ? this.data.inner.errorName : '', 
                        description: this.message
                     }, true))
                }
            }
            else if (d.mTreeBrickNode || d.mTreeBrickLine) {
                var node = d.mTreeBrickNode || d.mTreeBrickLine;
                var mTreeBrick = d.mTreeBrick || node.model;
                this.addHint('ittfErrorLines', mTreeBrick.loadHistory.getIttfDocumentErrorLines(node.sourceKey, {
                    row: node.row, 
                    col: node.col, 
                    pos: node.col + node.name.length, 
                    errorName: errorName, 
                    description: message
                 }, true))
            }
        }
        
        this.setDeepestHint();
    }
    addHint(name, value) {
        this.data.hint = this.data.hint || {};
        this.data.hint[name] = value;
    }
    setDeepestHint() {
        var errorName = this.errorName;
        var message = this.message;
        var hint = this.data.hint;
        var inner = this.data.inner;
        while (inner != null) {
            hint = inner.data ? (inner.data.hint ? inner.data.hint: hint) : hint;
            errorName = inner.errorName || errorName;
            message = inner.message;
            inner = inner.data ? inner.data.inner : null;
            // log inner != null
        }
        if (hint) {
            hint.errorName = errorName;
            hint.message = message;
        }
        this.hint = hint;
        if (this.data && this.data.inner) {
            this.inner = this.data.inner;
            if (this.data.inner && this.data.inner.data) {
                this.inner2 = this.data.inner.data.inner;
            }
        }
    }
    toString() {
        var msg = [];
        msg.push(chalk.red('Error: ' + this.message));
        msg.push(chalk.red('  name: ' + this.errorName));
        var node = this.data.node || (this.data.jswizzi ? this.data.jswizzi.node : null);
        if (node) {
            msg.push(chalk.yellow('  row: ' + node.row + ', col: ' + node.col));
        }
        if (this.data.mTreeBrick) {
            msg.push(chalk.yellow('  uri: ' + this.data.mTreeBrick.uri));
        }
        else if (this.data.uri) {
            msg.push(chalk.yellow('  uri: ' + this.data.uri));
        }
        else if (this.data.mtree) {
            msg.push(chalk.yellow('  uri: ' + this.data.mtree.ittfDocumentUri));
            if (this.data.mtree.mixerIttfDocumentUri) {
                msg.push(chalk.yellow('  mixer uri: ' + this.data.mtree.mixerIttfDocumentUri));
            }
        }
        else {
            msg.push(chalk.yellow('  uri: unknown'));
        }
        if (this.errorLines) {
            var i, i_items=this.errorLines, i_len=this.errorLines.length, line;
            for (i=0; i<i_len; i++) {
                line = this.errorLines[i];
                msg.push(chalk.yellow('  ' + line));
            }
        }
        if (this.data.hint && this.data.hint.mTreeBuildUpScriptErrorLines && this.data.hint.mTreeBuildUpScriptErrorLines.lines) {
            var i, i_items=this.data.hint.mTreeBuildUpScriptErrorLines.lines, i_len=this.data.hint.mTreeBuildUpScriptErrorLines.lines.length, line;
            for (i=0; i<i_len; i++) {
                line = this.data.hint.mTreeBuildUpScriptErrorLines.lines[i];
                msg.push(chalk.yellow('  ' + line));
            }
        }
        if (this.errorName === 'JsWizziError') {
            msg.push(chalk.yellow('  onStatement: ' + this.data.onStatement));
        }
        if (this.data.inner) {
            msg.push(chalk.magenta('  Inner error: ' + this.data.inner.name + ': ' + this.data.inner.message));
        }
        return msg.join('\n');
    }
}
md.WizziError = WizziError;
class InternalError extends WizziError {
    constructor(error) {
        super(error.message);
        this.data = {
            error
         };
    }
}
md.InternalError = InternalError;
md.getSrcPathInfo = function(srcPath) {
    if (typeof (srcPath) === 'string') {
        return srcPath;
    }
    if (srcPath && (typeof (srcPath) === 'object')) {
        var msg = md.getSrcPathInfoFromNode(srcPath);
        return msg ? msg : srcPath.toString();
        ;
    }
    return 'unavailable';
}
;
md.getSrcPathInfoFromNode = function(node) {
    var msg = [];
    if (node) {
        if (node.WmtSourceLineInfo) {
            var info = node.WmtSourceLineInfo;
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.source));
            msg.push((', in file: ' + 'TODO'));
        }
        else if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
    }
    return msg.length == 0 ? null : msg.join('');
    ;
}
;
md.nodeErrorLines = function(node, errorData, json) {
    console.log('nodeErrorLines.errorData', errorData, __filename);
    var parent = node.parent;
    var child = node.children[0];
    var ret = [];
    if (errorData.errorName == 'FragmentParamsError') {
        var brick = node.model;
        var rootNode = brick.nodes[0];
        ret.push(formatLineNumber(rootNode.row) + spaces(rootNode.col) + rootNode.name + ' ' + (rootNode.value || ''))
        ret.push(formatLineNumber(rootNode.row+1) + spaces(rootNode.col+4) + '$params ' + brick.$params)
        ret.push(spaces(rootNode.col+16) + '^ ' + errorData.description)
    }
    else {
        var prev = nodeUtils.previousSibling(node);
        var next = nodeUtils.nextSibling(node);
        if (prev) {
            ret.push(formatLineNumber(prev.row) + spaces(prev.col) + prev.name + ' ' + (prev.value || ''))
        }
        else {
            ret.push(formatLineNumber(parent.row) + spaces(parent.col) + parent.name + ' ' + (parent.value || ''))
            if (parent.model.$params) {
                ret.push(formatLineNumber(parent.row+1) + spaces(parent.col+4) + '$params ' + parent.model.$params)
            }
        }
        ret.push(formatLineNumber(node.row) + spaces(node.col) + node.name + ' ' + (node.value || ''))
        ret.push(spaces(node.col + 4) + '^ ' + errorData.description)
        if (next) {
            ret.push(formatLineNumber(next.row) + spaces(next.col) + next.name + ' ' + (next.value || ''))
        }
        else if (child) {
            ret.push(formatLineNumber(child.row) + spaces(child.col) + child.name + ' ' + (child.value || ''))
        }
    }
    return json ? ret : ret.join('\n');
}
;
function formatLineNumber(num) {
    if (num > 999) {
        return num;
    }
    if (num > 99) {
        return ('0' + num);
    }
    if (num > 9) {
        return ('00' + num);
    }
    return ('000' + num);
}
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}