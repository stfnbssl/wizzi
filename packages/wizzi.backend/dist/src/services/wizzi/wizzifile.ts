/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\services\wizzi\wizzifile.ts.ittf
    utc time: Sun, 25 Jul 2021 19:40:41 GMT
*/
import util from 'util';
import path from 'path';
import chokidar from 'chokidar';
import {getConfigValues} from './config';
import {ConfigType} from '../../features/config';
import {WizziConfigType} from './types';
const FACTORY_SITE = 'site';
const MODEL_TICKET_MAINSITE = 'mainsite';
var appConfig: ConfigType;
var wizziConfig: WizziConfigType;
var runnerModelsFolder: string;
var watcher: chokidar.FSWatcher;
const md: { 
    [k: string]: any;
} = {};
md.setAppConfig = function(config: ConfigType) {

    appConfig = config;
    wizziConfig = getConfigValues(appConfig.ittfPath, appConfig.dataPath)
    ;
    console.log('wizziConfig', wizziConfig);
    runnerModelsFolder = path.join(appConfig.ittfPath, 'meta', 'models')
    ;
    watcher = chokidar.watch(runnerModelsFolder + '/**/*.ittf', {
        persistent: true
     })
    ;
    console.log('wizzifile is watching', runnerModelsFolder + '/**/*.ittf');
}
;
md.models = {};
let runnerServerInstance: any = null;
md.onConfig = function(wizziConfig: any, callback: Function) {

    /**
        // 
        // Set the path of the html page
        // for metaediting of IttfDocuments
        // 
    */
    /**
        // *
        // Set the path of the html page
        // for browsing an ittf folder path
        // 
    */
    wizziConfig.set('meta-html-ittf-path', path.join(appConfig.ittfPath, 'meta', 'html', 'index.html.ittf'))
    /**
        // *
        // Set the path of the html page
        // for browsing an ittf folder path
        // 
    */
    /**
        // 
        // Set the path of the html page
        // for simple text editing of non IttfDocuments
        // 
    */
    wizziConfig.set('meta-folder-ittf-path', path.join(appConfig.ittfPath, 'meta', 'folder', 'index.html.ittf'))
    /**
        // 
        // Set the path of the html page
        // for simple text editing of non IttfDocuments
        // 
    */
    wizziConfig.set('meta-html-text-path', path.join(appConfig.ittfPath, 'meta', 'text', 'index.html.ittf'))
    console.log('wizzifile.onConfig');
    callback(null);
}
;

md.onStart = function(runnerServer: any, wizziConfig: any, callback: Function) {

    console.log('wizzifile.onStart.enter');
    runnerServerInstance = runnerServer;
    runnerServer.registerFsNoAclFactory(FACTORY_SITE, {
        plugins: {
            pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages', 
            items: [
                './wizzi-core/dist/index.js', 
                './wizzi-js/dist/index.js', 
                './wizzi-web/dist/index.js', 
                './wizzi-meta/dist/index.js'
            ]
         }
     })
    runnerServer.registerApi('default', md.defaultApi);
    console.log('wizzifile.onStart.exit');
    callback(null);
}
;

md.onPrepare = function(factoryName: string, runnerServer: any, wizziConfig: any, callback: Function) {

    console.log('wizzifile.onPrepare.enter.factoryName', factoryName);
    if (factoryName === FACTORY_SITE) {
        loadRuntimeModels(function(err: any) {
        
            if (err) {
                return callback(err);
            }
            const loading = false;
            console.log('wizzifile.setting watcher', watcher);
            watcher.on('change', () => {
            
                console.log('wizzifile.reloading watched');
                loadRuntimeModels();
            }
            )
            watcher.on('add', () => {
            
                console.log('wizzifile.reloading watched');
                loadRuntimeModels();
            }
            )
            return callback();
        })
    }
    else {
        callback(null);
    }
}
;

md.defaultApi = function(name: string, query: string) {

    console.log('wizzifile.defaultApi.request', name, query);
    if (name === 'demos') {
        const model = md.models['mainsite'];
        return model.getDemosByPath(query);
    }
    else {
        if (name === 'categories') {
            const model = md.models['mainsite'];
            return model.getCategoriesByPath(query);
        }
        else {
            if (name === 'links') {
                const model = md.models['mainsite'];
                return model.getLinksByPath(query);
            }
        }
    }
    throw new Error('wizzifile.defaultApi. Unknown api name: ' + name);
}
;

function loadRuntimeModels(callback?: Function) {

    var mainSiteIttfPath = path.join(runnerModelsFolder, 'main.site.ittf');
    console.log('wizzifile loading', mainSiteIttfPath);
    runnerServerInstance.loadModel(FACTORY_SITE, MODEL_TICKET_MAINSITE, 'site', mainSiteIttfPath, {}, function(err: any, wizziModel: any) {
    
        if (err) {
            if (callback) {
                return callback(err);
            }
            else {
                throw err;
            }
        }
        md.models[MODEL_TICKET_MAINSITE] = wizziModel;
        console.log('wizzifile loaded', mainSiteIttfPath);
        if (callback) {
            callback(null);
        }
    })
}
export default md;
