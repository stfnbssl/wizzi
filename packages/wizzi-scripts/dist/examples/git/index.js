/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-scripts\.wizzi\examples\git\index.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var util = require('util');
var file = require('wizzi-utils').file;
var packageIndex = require('../../index');
var manager = new packageIndex.Manager();
var codemods = new packageIndex.Codemods();
var scriptsConsole = packageIndex.console;
var MockResponse = (function () {
    function MockResponse() {
        _classCallCheck(this, MockResponse);
        this.head = null;
        this.stdout = '';
        this.stderr = '';
        this.opened = true;
    }
    MockResponse.prototype.writeHead = function(retcode, headers) {
        if (this.opened == false) {
            throw new Error('Cannot call res.writeHead after end.');
        }
        this.head = {
            retcode: retcode, 
            headers: headers
         };
    }
    MockResponse.prototype.write = function(str) {
        if (this.opened == false) {
            throw new Error('Cannot call res.write after end.');
        }
        this.stdout += str;
    }
    MockResponse.prototype.end = function(str) {
        if (this.opened == false) {
            throw new Error('Cannot call res.end after end.');
        }
        this.stdout += str;
        this.opened = false;
    }
    return MockResponse;
})();

var gitOptions1 = {
    scriptPath: [
        'cd C:\\My\\wizzi\\v5\\github\\wizzi-utils', 
        'git add .', 
        'git commit -m "0.5.1 commit"', 
        'git push -u origin master'
    ].join('\n')
 };
var gitOptions2 = {
    scriptPath: [
        'cd C:\\My\\wizzi\\v5\\github\\wizzi-mtree', 
        'git add .', 
        'git commit -m "0.5.1 commit"', 
        'git push -u origin master'
    ].join('\n')
 };
addCommit(function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('addCommit.result', result);
    addCommitToEventStream(function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('addCommitToEventStream.result', result);
    })
})
function addCommit(callback) {
    manager.gitExec(gitOptions1, callback)
}
function addCommitToEventStream(callback) {
    var res = new MockResponse();
    manager.gitExecToEventStream(gitOptions2, res, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('addCommitToEventStream.res.head', res.head);
        console.log('addCommitToEventStream.res.stdout', res.stdout);
        console.log('addCommitToEventStream.res.stderr', res.stderr);
        callback(null, result)
    })
}