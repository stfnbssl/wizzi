/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\tests\mocks\jsmodel\jsnode.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _ = require('lodash');
function checkKeyword(name) {
    if (name == 'default') {
        return 'defaultValue';
    }
    return keywords.indexOf(name) > -1 ? 'x' + name : __tagElementMapping[name] ? __tagElementMapping[name] : name;
}
var keywords = [
    'abstract', 
    'arguments', 
    'async', 
    'await', 
    'boolean', 
    'break', 
    'byte', 
    'case', 
    'catch', 
    'char', 
    'class', 
    'const', 
    'continue', 
    'debugger', 
    'default', 
    'delete', 
    'do', 
    'double', 
    'else', 
    'enum', 
    'eval', 
    'export', 
    'extends', 
    'false', 
    'final', 
    'finally', 
    'float', 
    'for', 
    'function', 
    'goto', 
    'if', 
    'implements', 
    'import', 
    'in', 
    'instanceof', 
    'int', 
    'interface', 
    'let', 
    'long', 
    'native', 
    'new', 
    'null', 
    'package', 
    'private', 
    'protected', 
    'public', 
    'return', 
    'short', 
    'static', 
    'super', 
    'switch', 
    'synchronized', 
    'this', 
    'throw', 
    'throws', 
    'transient', 
    'true', 
    'try', 
    'typeof', 
    'var', 
    'void', 
    'volatile', 
    'while', 
    'with', 
    'yield'
];
var __tagElementMapping = { '+': 'statement', '++': 'statementmultiline', '#': 'comment', '##': 'commentmultiline', 'var': 'xvar', 'wz-var': 'wzVar', 'wzvar': 'wzVar', 'const': 'xconst', 'wz-const': 'wzConst', 'wzconst': 'wzConst', 'let': 'xlet', '{': 'jsObject', '[': 'jsArray', '@': 'jsPropertyOrValue', 'jst': 'jsonStatementTree', 'import': 'ximport', 'export': 'xexport', 'delete': 'xdelete', 'if': 'xif', 'else': 'xelse', 'for': 'xfor', 'break': 'xbreak', 'continue': 'xcontinue', 'while': 'xwhile', 'do': 'xdo', 'switch': 'xswitch', 'case': 'xcase', 'default': 'xdefault', 'try': 'xtry', 'catch': 'xcatch', 'finally': 'xfinally', 'throw': 'xthrow', 'function': 'xfunction', '=>': 'arrowfunction', 'function*': 'generatorfunction', 'm': 'method', 'wz-iife': 'wzIife', 'wziife': 'wzIife', 'wz-function': 'wzFunction', 'wzfunction': 'wzFunction', 'yield': 'xyield', 'return': 'xreturn', 'class': 'xclass', 'wz-class': 'wzClass', 'wzclass': 'wzClass', 'new': 'xnew', '_': 'call', '._': 'memberCall', '@_': 'decoratorCall', '(': 'callOnValue', '.': 'memberAccess', '.[': 'memberAccessComputed', 'void': 'xvoid', '||': 'or', '&&': 'and', '===': 'op_eq_strict', '!==': 'op_noteq_strict', '==': 'op_eq', '!=': 'op_noteq', 'minus': 'op_minus', 'plus': 'op_plus', 'times': 'op_times', 'divide': 'op_div', 'power': 'op_power', 'mod': 'op_mod', 'xor': 'op_xor', 'xand': 'op_xand', 'gt': 'op_gt', '>=': 'op_ge', 'lt': 'op_lt', '<=': 'op_le', 'wz-require': 'wzRequire', 'wzrequire': 'wzRequire', 'react': 'reactComponent', 'react-f': 'reactFunction', 'reactf': 'reactFunction', 'set-state': 'setState', 'setstate': 'setState', 'will-mount': 'willMount', 'willmount': 'willMount', 'did-mount': 'didMount', 'didmount': 'didMount', 'will-unmount': 'willUnmount', 'willunmount': 'willUnmount', 'should-update': 'shouldUpdate', 'shouldupdate': 'shouldUpdate', 'did-update': 'didUpdate', 'didupdate': 'didUpdate', 'will-update': 'willUpdate', 'willupdate': 'willUpdate', 'will-receive-props': 'willReceiveProps', 'willreceiveprops': 'willReceiveProps', 'array-of': 'arrayOf', 'arrayof': 'arrayOf', 'instance-of': 'instanceOf', 'instanceof': 'instanceOf', 'object-of': 'objectOf', 'objectof': 'objectOf', 'one-of': 'oneOf', 'oneof': 'oneOf', 'one-of-type': 'oneOfType', 'oneoftype': 'oneOfType', 'event': 'htmlevent', '<': 'htmlelement', '@style': '_style', 'color-profile': 'color_profile', 'colorprofile': 'color_profile', 'font-face': 'font_face', 'fontface': 'font_face', 'font-face-format': 'font_face_format', 'fontfaceformat': 'font_face_format', 'font-face-name': 'font_face_name', 'fontfacename': 'font_face_name', 'font-face-src': 'font_face_src', 'fontfacesrc': 'font_face_src', 'font-face-uri': 'font_face_uri', 'fontfaceuri': 'font_face_uri', 'missing-glyph': 'missing_glyph', 'missingglyph': 'missing_glyph', '!!': 'assert', '!!=': 'assert_equal', 'log?': 'inspect', 'log-info': 'log_info', 'loginfo': 'log_info', 'it-async': 'itAsync', 'itasync': 'itAsync', 'before-async': 'beforeAsync', 'beforeasync': 'beforeAsync', 'before-each': 'beforeEach', 'beforeeach': 'beforeEach', 'after-async': 'afterAsync', 'afterasync': 'afterAsync', 'after-each': 'afterEach', 'aftereach': 'afterEach', 'sa-get': 'saGet', 'saget': 'saGet', 'sa-post': 'saPost', 'sapost': 'saPost', 'sa-put': 'saPut', 'saput': 'saPut', 'sa-end': 'saEnd', 'saend': 'saEnd' };
function isAttribute(name) {
    console.log('isAttribute', name);
    return attributes.indexOf(name) > -1 ? true : false;
}
var attributes = [
    'xclass/xsuper', 
    'method/xstatic', 
    'property/xstatic', 
    'prop/defaultValue'
];
var JsNode = (function () {
    function JsNode(element, name) {
        _classCallCheck(this, JsNode);
        this.wzElement = checkKeyword(element);
        this.wzName = name || '';
        this.statements = [];
        this.wzParent = null;
    }
    JsNode.prototype.addStatement = function(element, name) {
        console.log('addStatement', element, name, checkKeyword(element));
        if (isAttribute(this.wzElement + '/' + checkKeyword(element))) {
            this[checkKeyword(element)] = name;
            return this;
        }
        else {
            var s = new JsNode(element, name);
            s.wzParent = this;
            this.statements.push(s);
            return s;
        }
    }
    JsNode.prototype.getParams = function() {
        if (!this.params) {
            this.params = [];
            var stms = [];
            var i, i_items=this.statements, i_len=this.statements.length, item;
            for (i=0; i<i_len; i++) {
                item = this.statements[i];
                if (item.wzElement == 'param') {
                    console.log('param', item.wzName);
                    this.params.push(item.wzName);
                }
                else {
                    stms.push(item);
                }
            }
            this.statements = stms;
        }
        return this.params;
    }
    JsNode.prototype.findCtor = function() {
        return _.find(this.statements, function(item) {
                return item.wzElement === 'ctor';
            });
    }
    JsNode.prototype.getBaseArgs = function(name) {
        if (!this.bases) {
            this.bases = [];
            var stms = [];
            var i, i_items=this.statements, i_len=this.statements.length, item;
            for (i=0; i<i_len; i++) {
                item = this.statements[i];
                if (item.wzElement == 'base') {
                    console.log('base', item.wzName);
                    this.bases.push(item);
                }
                else {
                    stms.push(item);
                }
            }
            this.statements = stms;
        }
        var found = null;
        this.bases.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
            return found;
        })
    }
    JsNode.prototype.loadFromMTree = function(mTree) {
        
        if (mTree.nodes.length != 1) {
            throw new Error('JsNode.loadFromMTree error: mTree.nodes.length must be == 1');
        }
        var n = mTree.nodes[0];
        this.wzElement = checkKeyword(n.n);
        this.wzName = checkKeyword(n.v);
        
        var i, i_items=n.children, i_len=n.children.length, item;
        for (i=0; i<i_len; i++) {
            item = n.children[i];
            statement(this, item);
        }
        
        function statement(jsnode, node) {
            var c_jsnode = jsnode.addStatement(node.n, node.v);
            var i, i_items=node.children, i_len=node.children.length, item;
            for (i=0; i<i_len; i++) {
                item = node.children[i];
                statement(c_jsnode, item);
            }
        }
    }
    return JsNode;
})();

module.exports = JsNode;
