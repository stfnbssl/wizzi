/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\var.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.var';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment' && item.wzElement != 'commentmultiline') {
            count++;
        }
    }
    return count;
}
function writeComments(model, ctx) {
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
            __writeComments(item, ctx, false)
        }
        else if (item.wzElement == 'commentmultiline') {
            __writeComments(item, ctx, true)
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
function __writeComments(model, ctx, multi) {
    // log '__writeComments-model', model
    if (multi || model.statements.length > 0) {
        ctx.w('/**');
        ctx.indent();
        if (verify.isNotEmpty(model.wzName)) {
            ctx.w(model.wzName);
        }
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
    }
    else {
        ctx.w('// ' + model.wzName);
    }
    if (multi || model.statements.length > 0) {
        ctx.deindent();
        ctx.w('*/');
    }
}
function __writeCommentLine(model, ctx) {
    ctx.w('// ' + model.wzName);
    if (model.statements.length > 0) {
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
        ctx.deindent();
    }
}
md.load = function(cnt) {
    cnt.stm.xlet = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xlet');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xlet. Got: ' + callback);
        }
        cnt.stm._letvarconst(model, ctx, 'let', callback);
    }
    ;
    cnt.stm.xconst = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xconst');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xconst. Got: ' + callback);
        }
        cnt.stm._letvarconst(model, ctx, 'const', callback);
    }
    ;
    cnt.stm.xvar = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xvar');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xvar. Got: ' + callback);
        }
        cnt.stm._letvarconst(model, ctx, 'var', callback);
    }
    ;
    cnt.stm._letvarconst = function(model, ctx, symbol, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '._letvarconst');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '._letvarconst. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (hasStatements(xmodel) == false) {
            if (ctx.__inline) {
                ctx.write(symbol + ' ' + xmodel.wzName + u.semicolon(xmodel.wzName));
            }
            else {
                ctx.w(symbol + ' ' + xmodel.wzName + u.semicolon(xmodel.wzName));
            }
            return callback(null, null);
        }
        ctx.__inside_expr = true;
        ctx.write(symbol + ' ');
        if (xmodel.wzName && xmodel.wzName.length > 0) {
            ctx.write(xmodel.wzName + ' = ');
        }
        var indented,
            item = xmodel.statements[0];
        cnt.genItem(item, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            var len_1 = xmodel.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = xmodel.statements[index_1];
                if (ctx.__needs_comma) {
                    ctx.write(',');
                    ctx.__needs_comma = false;
                }
                
                // log 1001
                if (ctx.__needs_crlf) {
                    ctx.w();
                    ctx.__needs_crlf = false;
                }
                if (index_1 == 1) {
                    ctx.indent();
                    indented = true;
                }
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                })
            }
            repeater_1(1);
            function next_1() {
                if (ctx.__inline) {
                    ctx.write(';');
                }
                else {
                    ctx.w(';');
                }
                if (indented) {
                    ctx.deindent();
                }
                ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                return callback(null, null);
            }
        })
    }
    ;
    cnt.stm.decl = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.decl');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.decl. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        ctx.write(xmodel.wzName)
        if (countStatements(xmodel) > 0) {
            ctx.write(' = ');
            var len_1 = xmodel.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = xmodel.statements[index_1];
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                })
            }
            repeater_1(0);
            function next_1() {
                ctx.__needs_comma = true;
                ctx.__needs_crlf = true;
                return callback(null, null);
            }
        }
        else {
            ctx.__needs_comma = true;
            ctx.__needs_crlf = true;
            return callback(null, null);
        }
    }
    ;
    cnt.stm.initValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.initValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.initValue. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        ctx.write(' = ');
        ctx.write(xmodel.wzName)
        if (countStatements(xmodel) > 0) {
            cnt.genItem(xmodel.statements[0], ctx, callback)
        }
        else {
            return callback(null, null);
        }
    }
    ;
    cnt.stm.xnew = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xnew');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xnew. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (hasStatements(xmodel) == false) {
            if (xmodel.wzName.trim().substr(-1, 1) === ')') {
                ctx.write('new ' + xmodel.wzName);
            }
            else {
                ctx.write('new ' + xmodel.wzName + '()');
            }
            if (u.isTopStatement(xmodel, ctx)) {
                ctx.w(';');
            }
            return callback(null, null);
        }
        ctx.write('new ');
        xnew_type(xmodel, ctx, function(err, startArg) {
            if (err) {
                return callback(err);
            }
            var openParen = false;
            var len_1 = xmodel.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = xmodel.statements[index_1];
                if (u.isMemberAccess(item_1)) {
                    if (openParen) {
                        ctx.write(')');
                    }
                    return cnt.genItem(item_1, ctx, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            if (u.isTopStatement(xmodel, ctx)) {
                                ctx.w(';');
                            }
                            return callback(null, null);
                        });
                }
                if (index_1 == startArg) {
                    ctx.write('(');
                    openParen = true;
                }
                if (index_1 > startArg) {
                    ctx.write(', ');
                }
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                })
            }
            repeater_1(startArg);
            function next_1() {
                if (openParen) {
                    ctx.write(')');
                }
                if (u.isTopStatement(xmodel, ctx)) {
                    ctx.w(';');
                }
                return callback(null, null);
            }
        })
    }
    ;
    function xnew_type(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.xnew_type');
        }
        var xmodel = writeComments(model, ctx);
        if (xmodel.statements[0].wzElement === 'type') {
            ctx.write('(');
            cnt.genItem(xmodel.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null, 1);
            })
        }
        else {
            ctx.write(xmodel.wzName)
            return callback(null, 0);
        }
    }
    cnt.stm.type = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.type');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.type. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, callback)
    }
    ;
}
;
