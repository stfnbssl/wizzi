/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli\.wizzi\src\cmds\meta.js.ittf
    utc time: Fri, 26 Apr 2024 11:13:43 GMT
*/
'use strict';
import wizzi, { MetaPluginsOptions, PluginsOptions, WizziModel, FactoryServiceContext } from "@wizzi/factory";
import {packi, fSystem, verify} from '@wizzi/utils';
import path  from 'path';
import {createFsWizziFactory, createJsonWizziFactoryAndJsonFs} from './factory'

type cb<T> = (err: any, result: T|null) => void;

export function generateMeta(
    metaCtxPath: string, 
    destPath: string, 
    pluginsInfo: PluginsOptions, 
    metaPluginsInfo: MetaPluginsOptions, 
    globalContext: {[key:string]: any}, 
    callback: cb<{[key:string]: any}>) {
    loadMetaContext(metaCtxPath, pluginsInfo, (err: any, metaCtx: {[key: string]: any} | null) => {
        if (err) {
            return callback(err, null);
        }
        createJsonWizziFactoryAndJsonFs({}, pluginsInfo, metaPluginsInfo, (err, wf_and_jsonFs) => {
            if (err) {
                return callback(err, null);
            }
            if (metaCtx) {
                metaCtx.__wz_fsc = new FactoryServiceContext();
            }
            wf_and_jsonFs?.wf.executeMetaProduction({
                metaCtx: metaCtx || {}, 
                paths: {
                    metaProductionTempFolder: '___template', 
                    metaProductionWizziFolder: '.wizzi'
                 }, 
                globalContext: globalContext
             }, (err, wizziPackiFiles) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw err;
                }
                // loog 'wizzi.cli.meta.result.wizziPackiFiles.keys', Object.keys(wizziPackiFiles)
                if (metaCtx) {
                    metaCtx.__wz_fsc.dumpDebugObjects({
                        kind: 'packi', 
                        destFolder: path.join(__dirname, 'dumps', 'packi')
                    })
                }
                writePackifiles(destPath, wizziPackiFiles)
            }
            )
        }
        )
    }
    )
}

export function loadMetaContext(metaCtxPath: string, pluginsInfo: PluginsOptions, callback: cb<{[key: string]: any}>) {
    createFsWizziFactory({}, pluginsInfo, (err, wf) => {
        if (err) {
            return callback(err, null);
        }
        wf.loadModel('json', metaCtxPath, {
            mTreeBuildUpContext: {
                metaCtx: {}
             }
         }, (err: any, wizziModel: {[key: string]: any}) => {
             if (err) {
                return callback(err, null);
            }
            return callback(null, wizziModel);
        }
        )
    }
    )
}

export function writePackifiles(folderPath: string, packiFiles: packi.PackiFiles) {
    const file = fSystem.vfile();
    for (var k in packiFiles) {
        file.write(path.join(folderPath, k), packiFiles[k].contents)
    }
}

export const pluginOptions = {
    items: [
        "./wizzi.plugin.html/index", 
        "./wizzi.plugin.js/index", 
        "./wizzi.plugin.css/index", 
        "./wizzi.plugin.ittf/index", 
        "./wizzi.plugin.json/index"
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
}

export const metaPluginOptions = {
    items: [
        "./wizzi.meta.cloud/index", 
        "./wizzi.meta.commons/index", 
        "./wizzi.meta.docs/index", 
        "./wizzi.meta.documents/index", 
        "./wizzi.meta.js/index", 
        "./wizzi.meta.js.db/index", 
        "./wizzi.meta.js.express/index", 
        "./wizzi.meta.js.node/index", 
        "./wizzi.meta.js.vanilla/index", 
        "./wizzi.meta.js.react/index", 
        "./wizzi.meta.ts/index", 
        "./wizzi.meta.ts.express/index", 
        "./wizzi.meta.ts.nextjs/index", 
        "./wizzi.meta.ts.react/index", 
        "./wizzi.meta.ts.remix/index", 
        "./wizzi.meta.ts.db/index", 
        "./wizzi.meta.web/index", 
        "./wizzi.meta.wizzi/index"
    ], 
    metaPluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.metas/packages", 
}