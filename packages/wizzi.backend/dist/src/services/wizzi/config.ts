/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\services\wizzi\config.ts.ittf
    utc time: Sun, 25 Jul 2021 19:40:41 GMT
*/
import path from 'path';
import {WizziConfigType} from './types';
export function getConfigValues(ittfPath: string, dataPath: string):  WizziConfigType {

    return {
            repoBasePath: path.join(ittfPath, 'repo'), 
            metaBasePath: path.join(dataPath, 'meta'), 
            studioBasePath: path.join(dataPath, 'studio'), 
            jobsBasePath: path.join(dataPath, 'jobs'), 
            crawlBasePath: path.join(dataPath, 'crawl'), 
            githubBasePath: path.join(dataPath, 'github'), 
            cheatsheetsBasePath: path.join(dataPath, 'models', 'cheatsheets'), 
            siteMetaBasePath: path.join(dataPath, 'models', 'json'), 
            jsonDataMetaBasePath: path.join(dataPath, 'models', 'sitemaps'), 
            storeKind: 'filesystem', 
            plugins: [
                'wizzi-core', 
                'wizzi-meta', 
                'wizzi-js', 
                'wizzi-web'
            ], 
            pluginsBasePath: 'TODO'
         };
}
