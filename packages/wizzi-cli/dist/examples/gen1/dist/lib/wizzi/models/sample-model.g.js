/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\dist\node_modules\wizzi-legacy-v5\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\dist\lib\artifacts\wfschema\model\gen\ittf\wfschema-model.js.ittf
    utc time: Wed, 10 Feb 2021 10:19:47 GMT
*/
'use strict';
// generated by v5-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var wzutils = require('wizzi-utils');
var verify = wzutils.verify;
var _md = module.exports = {};
var wzSourceLineInfo = (function () {
    function wzSourceLineInfo(row, col, sourceKey) {
        _classCallCheck(this, wzSourceLineInfo);
        this.row = row;
        this.col = col;
        this.sourceKey = sourceKey;
    }
    wzSourceLineInfo.prototype.toString = function(instance) {
        if (instance) {
            return 'row: ' + this.row + ', col: ' + this.col + ', file: ' + instance.wzSourceFilepath(this.sourceKey);
        }
        else {
            return 'row: ' + this.row + ', col: ' + this.col + ', sourceKey: ' + this.sourceKey;
        }
    }
    return wzSourceLineInfo;
})();

_md.wzSourceLineInfo = wzSourceLineInfo;
var sampleBase = (function () {
    function sampleBase(name, sourceLineInfo) {
        _classCallCheck(this, sampleBase);
        this.wzName = name || '';
        this.wzParent = null;
        this.wzSourceLineInfo = sourceLineInfo;
        this.wzChildren = [];
    }
    sampleBase.prototype.wzRoot = function() {
        return this.wzParent == null ? this : this.wzParent.wzRoot();
    }
    sampleBase.prototype.wzSourceFilepath = function(sourceKey) {
        var sk = sourceKey || this.wzSourceLineInfo.sourceKey;
        return this.wzRoot().loadHistory.getIttfDocumentUri(sk);
    }
    sampleBase.prototype.wzSourceErrorLines = function(node, message) {
        return this.wzRoot().loadHistory.getIttfDocumentErrorLines(node.u, {
                row: node.r, 
                col: node.c, 
                description: message
            }, true);
    }
    sampleBase.prototype.wzVerify = function() {
    }
    sampleBase.prototype.wzInitialize = function() {
    }
    sampleBase.prototype.wzInitializeAsync = function(ctx, callback) {
        callback(null);
    }
    sampleBase.prototype.wzAddChild = function(node) {
        node.wzParent = this;
        this.wzChildren.push(node);
    }
    sampleBase.prototype.wzAddChildToColl = function(node, coll) {
        node.wzParent = this;
        node.wzMoved = true;
        coll.push(node);
    }
    sampleBase.prototype.wzMoveChildToColl = function(node, coll, fromColl) {
        var index = fromColl.indexOf(node);
        if (index < 0) {
            this.error('wzMoveChildToColl error. The from collection does not contain the node.', node);
        }
        fromColl.splice(index, 1);
        this.wzAddChildToColl(node, coll);
    }
    sampleBase.prototype.wzLoadToChildColl = function(child, type, coll) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        item.wzTag = child.n;
        if (child.wzMTreeData) {
            item.wzMTreeData = child.wzMTreeData;
        }
        item.wzParent = this;
        coll.push(item);
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    sampleBase.prototype.wzCreateChildColl = function(tag, name, type, coll) {
        var item = new type(name, this.wzSourceLineInfo);
        item.wzTag = tag;
        item.wzParent = this;
        item.wzCreated = true;
        coll.push(item);
        return item;
    }
    sampleBase.prototype.wzLoadToChildren = function(child, type) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        item.wzTag = child.n;
        item.wzParent = this;
        if (child.wzMTreeData) {
            item.wzMTreeData = child.wzMTreeData;
        }
        this.wzChildren.push(item);
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    sampleBase.prototype.wzLoadOneToOne = function(child, type, fieldName) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        if (child.wzMTreeData) {
            item.wzMTreeData = child.wzMTreeData;
        }
        item.wzParent = this;
        this[fieldName] = item;
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    sampleBase.prototype.wzRemove = function(fromColl) {
        var index = fromColl.indexOf(this);
        if (index < 0) {
            this.error('wzRemove error. The from collection does not contain the node.', this);
        }
        fromColl.splice(index, 1);
    }
    sampleBase.prototype.error = function(message, node) {
        throw new _md.sampleModelException(message, node, this);
    }
    return sampleBase;
})();

_md.sampleBase = sampleBase;
// element basic
var basic = (function (sampleBase) {
    _inherits(basic, sampleBase);
    function basic(name, sourceLineInfo) {
        _get(Object.getPrototypeOf(basic.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, basic);
        this.wzElement = "basic";
        // relation item
        this.items = [];
    }
    basic.prototype.addItem = function(name, sourceLineInfo) {
        var retval = new _md.item(name, sourceLineInfo);
        retval.wzParent = this;
        this.items.push(retval);
        return retval;
    }
    basic.prototype.getItem = function(name) {
        var found = null;
        this.items.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    basic.prototype.loadChild = function(child) {
        var name = child.n.toLowerCase();
        if (name === 'item') {
            return this.wzLoadToChildColl(child, _md.item, this.items);
        }
        return false;
    }
    basic.prototype.loadFromNode = function(node) {
        node.children.forEach((item) => {
            var loaded = this.loadChild(item);
            if (!loaded) {
                throw new _md.sampleModelException("Tag not recognized: " + item.n, item, this);
            }
        });
    }
    basic.prototype.wzVerify = function(ctx) {
        this.items.forEach((item) => {
            item.wzVerify(ctx);
        });
        _md.sampleBase.prototype.wzVerify.call(this, ctx);
    }
    basic.prototype.wzInitialize = function(ctx) {
        this.items.forEach((item) => {
            item.wzInitialize(ctx);
        });
        _md.sampleBase.prototype.wzInitialize.call(this, ctx);
    }
    return basic;
})(sampleBase);

_md.basic = basic;
// element item
var item = (function (sampleBase) {
    _inherits(item, sampleBase);
    function item(name, sourceLineInfo) {
        _get(Object.getPrototypeOf(item.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, item);
        this.wzElement = "item";
    }
    item.prototype.loadChild = function(child) {
        var name = child.n.toLowerCase();
        if (name === 'value') {
            this.value = child.v; return true;
        }
        return false;
    }
    item.prototype.loadFromNode = function(node) {
        node.children.forEach((item) => {
            var loaded = this.loadChild(item);
            if (!loaded) {
                throw new _md.sampleModelException("Tag not recognized: " + item.n, item, this);
            }
        });
    }
    return item;
})(sampleBase);

_md.item = item;
_md.__tagElementMapping = {  };
// model/replaceUnknownElement( )
var sampleModelException = (function () {
    function sampleModelException(message, node, instance) {
        _classCallCheck(this, sampleModelException);
        this.node = node;
        this.instance = instance;
        if (node && instance) {
            this.message = message + ', wzElement: ' + node.wzElement + ', wzName:' + (node.wzName || '') + ', row:' + node.r + ', col:' + node.c + ', source:' + instance.wzSourceFilepath(node.u);
            this.errorLines = instance.wzSourceErrorLines(node, message);
        }
        else if (instance) {
            this.message = message + instance.wzSourceLineInfo.toString(instance);
        }
        else {
            this.message = message;
        }
        console.log('message', this.message);
        this.stack = (new Error()).stack;
    }
    sampleModelException.prototype.toString = function() {
        var msg = [];
        msg.push(chalk.red('Error: ' + this.message));
        msg.push(chalk.red('  name: sampleModelException'));
        if (this.node) {
            msg.push(chalk.yellow('  row: ' + this.node.r + ', col: ' + this.node.c));
        }
        if (this.instance) {
            if (this.node) {
                msg.push(chalk.yellow('  uri: ' + this.instance.wzSourceFilepath(this.node.u)));
            }
            else {
                msg.push(chalk.yellow('  uri: ' + this.instance.wzSourceLineInfo.toString(this.instance)));
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
        return msg.join('\n');
    }
    return sampleModelException;
})();

_md.sampleModelException = sampleModelException;
var sampleContext = (function () {
    function sampleContext() {
        _classCallCheck(this, sampleContext);
        this.validationErrors = [];
    }
    sampleContext.prototype.schemaIsValid = function() {
        return this.validationErrors.length == 0;
    }
    sampleContext.prototype.addError = function(message, node) {
        var at = node ? ' At ' + node.wzSourceLineInfo.toString(node) : '';
        this.validationErrors.push(message + at);
    }
    return sampleContext;
})();

_md.sampleContext = sampleContext;
function parsestring(value, defaultValue, node) {
    if (isEmpty( value )) {
        return defaultValue;
    }
    return value;
}
function isString(value) {
    return (typeof value === 'string' || value instanceof String);
}
function isEmpty(value) {
    return !isString( value ) || value.length === 0;
}
function isBoolean(value) {
    return value === 'true' || value === 'false';
}
