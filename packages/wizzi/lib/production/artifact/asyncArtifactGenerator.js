/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\artifact\asyncArtifactGenerator.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
var verify = require('@wizzi/utils').verify;
var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var GenContext = require('./genContext');
var g_generationsCheckCounter = 0;
var g_generationsCheck = {};
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}

/**
     Artifact generation functions are called by the `wizzi/lib/production/Runner`.
     A generation produces an array of wizzi/lib/production/artifact/genContext(s),
     text buffers containing the generated artifact.
     genContexts are accumulated into the productionStep.genContexts collection.
*/

var AsyncArtifactGenerator = 
/**
    * params
    * { productionStep
    * api-ref wizzi.lib.production.step.productionStep
    * { generator
    * api-ref wizzi-plugin.artifactGenerator
    * [ modelInfos
    * { modelInfo
    * api-ref wizzi.model.modelInfo
    * [ mainSourceModels
    * { mainSourceModel
    * # wizzi model or POJO
    * # 1 context model for each modelInfo
*/
{
    generate: function(productionStep, generator, modelInfos, mainSourceModels, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(productionStep) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep', message: 'The productionStep parameter must be an object. Received: ' + productionStep }
            ));
        }
        if (verify.isObject(productionStep.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager', message: 'The productionStep.productionManager parameter must be an object. Received: ' + productionStep.productionManager }
            ));
        }
        if (verify.isObject(productionStep.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager.wizziFactory', message: 'The productionStep.productionManager.wizziFactory parameter must be an object. Received: ' + productionStep.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(productionStep.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.options', message: 'The productionStep.options parameter must be an object. Received: ' + productionStep.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(modelInfos) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'modelInfos', message: 'The modelInfos parameter must be an array. Received: ' + modelInfos }
            ));
        }
        if (verify.isArray(mainSourceModels) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'mainSourceModels', message: 'The mainSourceModels parameter must be an array. Received: ' + mainSourceModels }
            ));
        }
        // loog 'wizzi.production.AsyncArtifactGenerator.generate, modelInfos', modelInfos, 'mainSourceModels', mainSourceModels
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generate', productionStep));
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var mainSourceModel = mainSourceModels[i];
            var genContext = new GenContext({
                model: null, 
                srcPath: modelInfo.src(), 
                srcFullPath: modelInfo.srcFullPath(), 
                options: productionStep.options, 
                pman: productionStep.productionManager
             });
            genItems.push({
                generator: generator, 
                mainSourceModel: mainSourceModel, 
                genContext: genContext
             })
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err, genContexts) {
            if (err) {
                return callback(err);
            }
            var i, i_items=genContexts, i_len=genContexts.length, item;
            for (i=0; i<i_len; i++) {
                item = genContexts[i];
                productionStep.addGenContext(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genContexts.count: ' + genContexts.length
             })
        })
    }, 
    generateModelCollection: function(productionStep, generator, modelInfos, mainSourceModelsOfModelCollection, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(productionStep) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep', message: 'The productionStep parameter must be an object. Received: ' + productionStep }
            ));
        }
        if (verify.isObject(productionStep.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager', message: 'The productionStep.productionManager parameter must be an object. Received: ' + productionStep.productionManager }
            ));
        }
        if (verify.isObject(productionStep.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager.wizziFactory', message: 'The productionStep.productionManager.wizziFactory parameter must be an object. Received: ' + productionStep.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(productionStep.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.options', message: 'The productionStep.options parameter must be an object. Received: ' + productionStep.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(modelInfos) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'modelInfos', message: 'The modelInfos parameter must be an array. Received: ' + modelInfos }
            ));
        }
        if (verify.isArray(mainSourceModelsOfModelCollection) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'mainSourceModelsOfModelCollection', message: 'The mainSourceModelsOfModelCollection parameter must be an array. Received: ' + mainSourceModelsOfModelCollection }
            ));
        }
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateModelCollection', productionStep));
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var mainSourceModels = mainSourceModelsOfModelCollection[i];
            for (var j = 0; j < mainSourceModels.length; j++) {
                var mainSourceModel = mainSourceModels[j];
                logme('AsyncArtifactGenerator.generateModelCollection', 'item', j, mainSourceModel);
                // api-ref wizzi.model.modelCollectionConfig
                var genContext = new GenContext({
                    model: mainSourceModel.___collItem, 
                    srcPath: modelInfo.src(), 
                    srcFullPath: modelInfo.srcFullPath(), 
                    options: productionStep.options, 
                    pman: productionStep.productionManager
                 });
                genItems.push({
                    generator: generator, 
                    mainSourceModel: mainSourceModel, 
                    genContext: genContext
                 })
            }
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err, genContexts) {
            if (err) {
                return callback(err);
            }
            var i, i_items=genContexts, i_len=genContexts.length, item;
            for (i=0; i<i_len; i++) {
                item = genContexts[i];
                productionStep.addGenContext(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genContexts.count: ' + genContexts.length
             })
        })
    }, 
    generateCodeWrite: function(productionStep, generator, contextModels, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(productionStep) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep', message: 'The productionStep parameter must be an object. Received: ' + productionStep }
            ));
        }
        if (verify.isObject(productionStep.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager', message: 'The productionStep.productionManager parameter must be an object. Received: ' + productionStep.productionManager }
            ));
        }
        if (verify.isObject(productionStep.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.productionManager.wizziFactory', message: 'The productionStep.productionManager.wizziFactory parameter must be an object. Received: ' + productionStep.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(productionStep.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'productionStep.options', message: 'The productionStep.options parameter must be an object. Received: ' + productionStep.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(contextModels) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'contextModels', message: 'The contextModels parameter must be an array. Received: ' + contextModels }
            ));
        }
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateCodeWrite', productionStep));
        }
        var mainSourceModel = {};
        var i, i_items=contextModels, i_len=contextModels.length, item;
        for (i=0; i<i_len; i++) {
            item = contextModels[i];
            mainSourceModel[item.___exportName] = item;
        }
        var genContext = new GenContext({
            model: null, 
            srcPath: null, 
            srcFullPath: null, 
            options: productionStep.options, 
            pman: productionStep.productionManager
         });
        new generator.gen(mainSourceModel, genContext);
        productionStep.addGenContext(genContext);
        callback(null, {
            oper: 'AsyncArtifactGenerator.generateCodeWrite', 
            status: 'success'
         })
    }, 
    _gen_item: function(genInfo, callback) {
        logme('AsyncArtifactGenerator._gen_item', 'genInfo.mainSourceModel', genInfo.mainSourceModel)
        var generatingPath = genInfo.genContext.srcPath;
        function checkCallback() {
            throw new Error(generatingPath + ' generation did not termitate');
        }
        var gNum = ++g_generationsCheckCounter;
        g_generationsCheck['timer' + gNum] = setTimeout(checkCallback, 4000);
        ;
        new genInfo.generator.gen(genInfo.mainSourceModel, genInfo.genContext, function(err, result) {
            if (err) {
                return callback(err);
            }
            // var timer = g_generationsCheck['timer' + gNum]
            clearTimeout(g_generationsCheck['timer' + gNum])
            return callback(null, result);
        });
    }
 };

module.exports = {
    AsyncArtifactGenerator: AsyncArtifactGenerator
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}