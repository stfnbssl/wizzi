/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\es6\property.js.ittf
*/
'use strict';
var u = require('../../../../../js/module/gen/codegen/util/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.ts.artifacts.module.gen.codegen.es6.property';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    u.writeComments(model, ctx);
    u.genAccessorsAndExtra(model, ctx)
    if (model.static) {
        ctx.write('static ');
    }
    ctx.write(model.wzName);
    var ptype = u.extractTSSimpleType(model);
    if (ptype) {
        ctx.write(': ');
        statement.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            property_step_1(model, ctx, callback)
        }
        )
    }
    else {
        property_step_1(model, ctx, callback)
    }
}
;
function property_step_1(model, ctx, callback) {
    // log 'property_step_1', model
    var ivalue = u.extractTS(model, 'typeInitValue');
    if (ivalue) {
        ctx.write(' = ');
        statement.stm[ivalue.wzElement](ivalue, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(';');
            return callback(null, null);
        }
        )
    }
    else if (model.statements.length > 0 && model.statements[0].wzElement === 'jsPropertyOrValue') {
        ctx.indent();
        model.wzElement = 'jsObject';
        statement.gen(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            model.wzElement = 'p';
            ctx.deindent();
            ctx.w(';');
            return callback(null, null);
        })
    }
    else if (model.statements.length == 1) {
        ctx.write(' = ');
        statement.gen(model.statements[0], ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w(';');
            return callback(null, null);
        })
    }
    else if (model.statements.length > 1) {
        return callback(ctx.error('es6.property more than 1children not managed. children: ' + model.statements.length, model));
    }
    else {
        ctx.w(';');
        return callback(null, null);
    }
}
