/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\jswizzi\jsWizziRunner.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var createStoreFactory = require('wizzi-repo').createStoreFactory;
function getFSDocumentStore(callback) {
    createStoreFactory({
        kind: 'filesystem'
    }, function(err, storeFacory) {
        if (err) {
            return callback(err);
        }
        return storeFacory(callback);
    })
}

var JsWizziContext = require('../../../lib/jswizzi/jsWizziContext');
var jsWizziRunner = require('../../../lib/jswizzi/jsWizziRunner');

function evaluate(uri, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
    };
    MTreeBrickProvider.createFromUri(uri, loadContext, function(err, provider) {
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, callback)
            })
        })
    })
}

describe("jsWizziRunner", function() {
    var declares = [
        {
            code: 'var x = { a:1, b:\'alfa\', c:4 }; return x;', 
            expected_equal: {
                a: 1, 
                b: 'alfa', 
                c: 4
            }
        }, 
        {
            code: 'var x = [ 1, \'alfa\', 4 ]; return x;', 
            expected_equal: [
                1, 
                'alfa', 
                4
            ]
        }
    ];
    var mathExpressions = [
        {
            code: '2 + 10', 
            expected: 12
        }, 
        {
            code: '2 - 10', 
            expected: -8
        }, 
        {
            code: '2 * 10', 
            expected: 20
        }, 
        {
            code: '2 / 10', 
            expected: 0.2
        }, 
        {
            code: 'var x = 10; x += 2; return x;', 
            expected: 12
        }, 
        {
            code: 'var x = 10; x -= 2; return x;', 
            expected: 8
        }, 
        {
            code: 'var x = 10; x *= 2; return x;', 
            expected: 20
        }, 
        {
            code: 'var x = 10; x /= 2; return x;', 
            expected: 5
        }
    ];
    var stringExpressions = [
        {
            code: 'var x = \'alba\'; x = x.toUpperCase(); return x;', 
            expected: 'ALBA'
        }, 
        {
            code: 'var x = \'a,b,c,d\'; x = x.split(\',\'); return x;', 
            expected_equal: ['a', 'b', 'c', 'd']
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.indexOf(\'b1\'); return x;', 
            expected_number: 3
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.substr(-2,2); return x;', 
            expected: 'd1'
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.substring(0,5); return x;', 
            expected: 'a1,b1'
        }, 
        {
            code: 'String.fromCodePoint(65, 90)', 
            expected: 'AZ'
        }, 
        {
            code: 'String.fromCodePoint(65, 66, 67)', 
            expected: 'ABC'
        }
    ];
    var logicalExpressions = [
        {
            code: 'true && false', 
            expected_equal: false
        }, 
        {
            code: 'true || false', 
            expected_equal: true
        }, 
        {
            code: '!true', 
            expected_equal: false
        }, 
        {
            code: '\'aa\' == \'aa\'', 
            expected_equal: true
        }, 
        {
            code: '\'aa\' === \'aa\'', 
            expected_equal: true
        }, 
        {
            code: '3 > 2', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3 && 4 < 5', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3 && 4 <= 4', 
            expected_equal: true
        }
    ];
    var unaryExpressions = [
        {
            code: 'var x = 2; x = -x; return x', 
            expected_number: -2
        }, 
        {
            code: 'var x = 2; x = +x; return x', 
            expected_number: 2
        }, 
        {
            code: 'var x = 2; x++; return x', 
            expected_number: 3
        }, 
        {
            code: 'var x = 2, y = 2; y = x++; return y', 
            expected_number: 2
        }, 
        {
            code: 'var x = 2, y = 2; y = ++x; return y', 
            expected_number: 3
        }, 
        {
            code: 'var x = 2, y = 2; y = --x; return { x:x, y:y }', 
            expected_equal: {
                x: 1, 
                y: 1
            }
        }, 
        {
            code: 'var x = 2, y = 2; y = x--; return { x:x, y:y }', 
            expected_equal: {
                x: 1, 
                y: 2
            }
        }
    ];
    var memberAccesses = [
        {
            code: 'var x = { a: [ { b:[9] } ] }; return x.a[0].b[0];', 
            expected_number: 9
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b;', 
            expected_equal: [
                'abcd'
            ]
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0];', 
            expected_equal: 'abcd'
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0].toUpperCase();', 
            expected_equal: 'ABCD'
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0].toUpperCase()[1];', 
            expected_equal: 'B'
        }
    ];
    var conditionals = [
        {
            code: '10 > 9 ? 1 : 0', 
            expected_number: 1
        }, 
        {
            code: 'var x = 10, y = 0; if ( x > 5 ) { y += 2; } return y;', 
            expected_number: 2
        }, 
        {
            code: 'var x = 10, y = 0; if ( x > 15 ) { y += 2; } else { y -= 2; } return y;', 
            expected_number: -2
        }
    ];
    var iterations = [
        {
            code: 'var x = 10, y = 0; for( var i=0; i<x; i++) { y += 2; } return y;', 
            expected_number: 20
        }, 
        {
            code: 'var x = 10, y = 0; for( var i=0; i<x; i++) { if (i > 4) { continue; } y += 2; } return y;', 
            expected_number: 10
        }, 
        {
            code: 'var x = 10, y = 0; while( x > 0 ) { y += 2; x--; } return y;', 
            expected_number: 20
        }, 
        {
            code: 'var x = 10, y = 0; while( x > 0 ) { y += 2; x--; if (x < 6) { break; } } return y;', 
            expected_number: 10
        }, 
        {
            code: 'var x = 10, y = 0; do { y += 2; x--; } while( x > 0 ) return y;', 
            expected_number: 20
        }
    ];
    var builtinFunctions = [
        {
            code: 'return isFinite(99)', 
            expected: true
        }, 
        {
            code: 'return isNaN("alpha")', 
            expected: true
        }, 
        {
            code: 'return isNaN(99)', 
            expected: false
        }, 
        {
            code: 'return parseFloat("18.02")', 
            expected: 18.02
        }, 
        {
            code: 'return parseInt("18.02")', 
            expected: 18
        }, 
        {
            code: 'return encodeURI("aaa")', 
            expected: "aaa"
        }, 
        {
            code: 'return decodeURI("aaa")', 
            expected: "aaa"
        }, 
        {
            code: 'return encodeURIComponent("aaa")', 
            expected: "aaa"
        }, 
        {
            code: 'return decodeURIComponent("aaa")', 
            expected: "aaa"
        }
    ];
    var builtinFunctions_underscore = [
        {
            code: 'var x = "lady"; return _.pluralize(x)', 
            expected: 'ladies'
        }, 
        {
            code: 'var x = "lady"; return _.capitalize(x)', 
            expected: 'Lady'
        }, 
        {
            code: 'var x = "LadyMary"; return _.camelize(x)', 
            expected: 'ladyMary'
        }, 
        {
            code: 'var x = "lady-mary"; return _.dashToCamelCase(x)', 
            expected: 'ladyMary'
        }, 
        {
            code: 'var x = "\\\\ \\\""; return _.escape(x)', 
            expected: '\\\\ \\"'
        }, 
        {
            code: 'var x = "alphabeta"; return _.replace(x, "beta","gamma")', 
            expected: 'alphagamma'
        }, 
        {
            code: 'var x = ""; return _.isEmpty(x);', 
            expected: true
        }, 
        {
            code: 'var x = "a"; return _.isNotEmpty(x);', 
            expected: true
        }, 
        {
            code: 'var x = {}; return _.isObject(x);', 
            expected: true
        }, 
        {
            code: 'var x = []; return _.isArray(x);', 
            expected: true
        }, 
        {
            code: 'var x = "a"; return _.isString(x);', 
            expected: true
        }, 
        {
            code: 'var x = 4; return _.isNumber(x);', 
            expected: true
        }, 
        {
            code: 'var x = new Date(); return _.isDate(x);', 
            expected: true
        }, 
        {
            code: 'var x = typeof(nemo); return x;', 
            expected: 'undefined'
        }, 
        {
            code: 'var x = ["d", "a", "c", "b"]; return _.sort(x);', 
            expected: ['a', 'b', 'c', 'd']
        }, 
        {
            code: 'var x = [{p1: "d"}, {p1: "a"}, {p1: "c"}, {p1: "b"}]; return _.sort(x, "p1");', 
            expected: [{p1: "a"}, {p1: "b"}, {p1: "c"}, {p1: "d"}]
        }, 
        {
            code: 'var x = [{p1: "d"}, {p1: "a"}, {p1: "c"}, {p1: "b"}]; return _.filter(x, "p1", "c");', 
            expected: [{p1: "c"}]
        }, 
        {
            code: 'var x = ["b", "a", "a", "b"]; return _.unique(_.sort(x));', 
            expected: ['a', 'b']
        }
    ];
    var builtinFunctions_verify = [
        {
            code: 'var x = "lady"; return _.pluralize(x)', 
            expected: 'ladies'
        }
    ];
    var builtinFunctions_dateUtil = [
        {
            code: 'var x = new Date(1957, 2, 10); return dateUtil.GMY(x)', 
            expected: '10/3/1957'
        }, 
        {
            code: 'var x = new Date(1957, 2, 10, 1, 30); return dateUtil.GMYHM(x)', 
            expected: '10/3/1957:1:30'
        }
    ];
    it("should run declares", function() {
        runGroup(declares);
    });
    it("should run string expressions", function() {
        runGroup(stringExpressions);
    });
    it("should run math expressions", function() {
        var i, i_items=mathExpressions, i_len=mathExpressions.length, expr;
        for (i=0; i<i_len; i++) {
            expr = mathExpressions[i];
            expect(runExpression(expr.code)).to.be.a('number');
            expect(runExpression(expr.code)).to.be(expr.expected);
        }
    });
    it("should run logical expressions", function() {
        runGroup(logicalExpressions);
    });
    it("should run unary expressions", function() {
        runGroup(unaryExpressions);
    });
    it("should run member accesses", function() {
        runGroup(memberAccesses);
    });
    it("should run conditional statements", function() {
        runGroup(conditionals);
    });
    it("should run iteration statements", function() {
        runGroup(iterations);
    });
    it("should run builtinFunctions expressions", function() {
        runGroup(builtinFunctions);
    });
    it("should run builtinFunctions_underscore expressions", function() {
        runGroup(builtinFunctions_underscore);
    });
    it("should run builtinFunctions_verify expressions", function() {
        runGroup(builtinFunctions_verify);
    });
    it("should run builtinFunctions_dateUtil expressions", function() {
        runGroup(builtinFunctions_dateUtil);
    });
    function runGroup(items) {
        var i, i_items=items, i_len=items.length, expr;
        for (i=0; i<i_len; i++) {
            expr = items[i];
            if (typeof(expr.expected_equal) !== 'undefined') {
                // loose equality works for objects
                expect(runExpression(expr.code)).to.eql(expr.expected_equal);
            }
            else if (typeof(expr.expected_number) !== 'undefined') {
                expect(runExpression(expr.code)).to.be.a('number');
                expect(runExpression(expr.code)).to.be(expr.expected_number);
            }
            else {
                // log 'expr.code, expr.expected', expr.code, expr.expected
                if (verify.isBoolean(expr.expected) && expr.expected) {
                    expect(runExpression(expr.code)).to.be(true);
                }
                else if (verify.isBoolean(expr.expected) && !expr.expected) {
                    expect(runExpression(expr.code)).to.be(false);
                }
                else if (verify.isNumber(expr.expected)) {
                    expect(runExpression(expr.code)).to.be.a('number');
                    expect(runExpression(expr.code)).to.be(expr.expected);
                }
                else if (verify.isArray(expr.expected)) {
                    // loose equality works for objects
                    expect(runExpression(expr.code)).to.eql(expr.expected);
                }
                else {
                    expect(runExpression(expr.code)).to.be.a('string');
                    expect(runExpression(expr.code)).to.be(expr.expected);
                }
            }
        }
    }
    function runExpression(code) {
        // without ctor arguments means: isForInterpolation
        var jsWizziContext = new JsWizziContext();
        // run the expression embedded in a var declaration 'result'
        var scriptCode = code.indexOf('return ') > -1 ? 'var result = function dummy() { ' + code + ' }();' : 'var result = ' + code + ';';
        // log 'runExpression.scriptCode', scriptCode
        var hr = jsWizziRunner.run(scriptCode, jsWizziContext, {
            verbose: false
        });
        // log 'runExpression.hr', hr
        if (hr instanceof Error) {
            throw hr;
        }
        // log 'runExpression.result', jsWizziContext.getValue('result')
        // return the 'result' var from the context
        return jsWizziContext.getValue('result');
    }
});
