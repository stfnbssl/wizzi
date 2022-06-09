/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\es6\get.js.ittf
*/
'use strict';
var u = require('../../../../../js/module/gen/codegen/util/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.ts.artifacts.module.gen.codegen.es6.get';
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
    ctx.write('get ' + model.wzName + '()');
    if (model.typeReturn) {
        ctx.write(': ');
        statement.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            get_step_1(model, ctx, callback)
        }
        )
    }
    else {
        get_step_1(model, ctx, callback)
    }
}
;
function get_step_1(model, ctx, callback) {
    ctx.w(' {');
    statement.genItems(model.statements, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null, null);
    }
    )
}
