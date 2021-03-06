/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\wizzi\models\text-factory.g.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
//
var path = require('path');
var util = require('util');
var stringify = require('json-stringify-safe');
var verify = require('wizzi-utils').verify;

var textmodel = require('./text-model.g');

var md = module.exports = {};

// called from the wizzi.wizziFactory.getLoadModel method
// params
md.createLoadModel = function(wizziObject) {
    if (verify.isObject(wizziObject) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject', message: 'The wizziObject parameter must be an object. Received: ' + wizziObject }
        );
    }
    if (verify.isFunction(wizziObject.loadMTree) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.loadMTree', message: 'The wizziObject.loadMTree parameter must be a function. Received: ' + wizziObject.loadMTree }
        );
    }
    if (verify.isObject(wizziObject.file) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.file', message: 'The wizziObject.file parameter must be an object. Received: ' + wizziObject.file }
        );
    }
    if (verify.isObject(wizziObject.errors) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.errors', message: 'The wizziObject.errors parameter must be an object. Received: ' + wizziObject.errors }
        );
    }
    var options = wizziObject.options || {};
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var errors = wizziObject.errors;
    var wizziFactory = wizziObject.wizziFactory;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, options, callback) {
        // log 'wizzi-core.wizzi.models.text-factory.g, loaded from mTree'
        textmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
    }
    if (options.loadFromMTree) {
        // Load a WizziModel of type 'text' from an mTree
        return function(mTree, wizziModelRequest, callback) {
                if (verify.isFunction(callback) !== true) {
                    callback = wizziModelRequest;
                    wizziModelRequest = {};
                }
                if (verify.isFunction(callback) !== true) {
                    throw new TypeError('callback must be a function');
                }
                if (verify.isObject(mTree) !== true) {
                    return callback(error('InvalidArgument', 'mTree', 'The mTree parameter must be an object'));
                }
                loadModelFromMTree(mTree, 'Unavailable (loaded from mTree)', wizziModelRequest || {}, {
                    wizziFactory: wizziFactory
                }, callback)
            };
    }
    else {
        //
        return function loadModel(ittfDocumentUri, requestContext, callback) {
                if (typeof callback !== 'function') {
                    throw new TypeError('callback must be a function');
                }
                if (typeof ittfDocumentUri !== 'string') {
                    return callback(error(999, 'loadModel', 'ittfDocumentUri parameter must be a string, received: ' + typeof(ittfDocumentUri), new Error('inner track')));
                }
                if (verify.isObject(requestContext) !== true) {
                    return callback(error(999, 'loadModel', 'requestContext parameter must be an object', new Error('inner track')));
                }
                if (verify.isObject(requestContext.__productionManager) !== true) {
                    return callback(error(999, 'loadModel', 'requestContext.__productionManager parameter must be an object', new Error('inner track')));
                }
                requestContext.mTreeBuildUpContext = Object.assign({}, requestContext.__productionManager.globalContext(), requestContext.mTreeBuildUpContext);
                // STOP set context.sourcePreprocessor = preprocessText
                var wizziModelRequest = requestContext.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, requestContext, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // log 'Loaded mTree instance for pseudo schema text from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms'
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2))
                    }
                    // log 'wizzi-core.wizzi.models.text-factory.g current __dirname', __dirname
                    // log 'wizzi-core.wizzi.models.text-factory.g, loaded from ittfDocumentUri: ', ittfDocumentUri, mTree
                    textmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
                })
            };
    }
};
function isCommandNode(line) {
    var state = 0;
    var i, i_items=line, i_len=line.length, ch;
    for (i=0; i<i_len; i++) {
        ch = line[i];
        if (state == 1) {
            if (ch == ' ' || ch == '\t') {
                return false;
            }
            if (ch == '(') {
                return true;
            }
        }
        else {
            if (ch !== ' ' && ch !== '\t') {
                if (ch == '$') {
                    return true;
                }
                else {
                    state = 1;
                }
            }
        }
    }
    return false;
}
function preprocessText(text) {
    // log 'wizzi-core.wizzi.models.text-factory.g.preprocessText text: ' + text
    if (!text || text.length == 0) {
        return text;
    }
    var len = text.length,
        ch,
        line = [],
        indent = 0,
        seenNotWs = false;
    var sb = [ 'text' ];
    for (var i = 0; i<len; i++) {
        ch = text[i];
        if (ch === '\n' || ch === '\r') {
            // log 'wizzi-core.wizzi.models.text-factory.g.preprocessText line[0]', line[0]
            if (isCommandNode(line)) {
                sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
            }
            else {
                sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
                // + ??
            }
            line = [];
            indent = 0;
            seenNotWs = false;
            if (i < len-1) {
                if ((ch === '\n' && text[i+1] === '\r') || (ch === '\r' && text[i+1] === '\n')) {
                    // log 'wizzi-core.wizzi.models.text-factory.g. preprocessText skip'
                    i++;
                }
            }
        }
        else {
            if (!seenNotWs) {
                if (ch === ' ') {
                    indent++;
                }
                else if (ch === '\t') {
                    indent += 4;
                }
                else {
                    seenNotWs = true;
                }
            }
            line.push(ch);
        }
    }
    if (isCommandNode(line)) {
        sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
    }
    else if (line.length > 0) {
        sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
        // + ??
    }
    console.log('wizzi-core.wizzi.models.text-factory.g.preprocessText result', sb.join('\n'));
    return sb.join('\n');
}
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
        method: 'wizzi-core.lib.wizzi.models.text-factory.g.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
