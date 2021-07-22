/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\file\getFilesFromQuery.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {QueryInitParams, PackiFiles} from '../packi/index';
import {isEntryPoint} from './fileUtilities';

export default function getFilesFromQuery(query: QueryInitParams, defaultFiles: PackiFiles):  any {
    
        let files;
        try {
            if (query?.sourceUrl) {
                files = {
                    'App.js': {
                        type: 'CODE', 
                        url: query.sourceUrl
                     }
                 };
            }
            else {
                if (query?.files) {
                    files = JSON.parse(query.files);
                }
                else {
                    if (query?.code) {
                        files = {
                            'App.js': {
                                type: 'CODE', 
                                contents: query.code
                             }
                         };
                    }
                    else {
                        files = defaultFiles;
                    }
                }
            }
            if (typeof files !== 'object') {
                throw new Error('not an object');
            }
            if (!Object.keys(files).find(isEntryPoint)) {
                throw new Error('no entry point found');
            }
            for (const path in files) {
                const file = files[path];
                if (typeof file !== 'object' || (file.type !== 'CODE' && file.type !== 'ASSET')) {
                    throw new Error(`'${path}' is not a valid file object`);
                }
                if (!file.contents && !file.url) {
                    throw new Error(`'${path}' should contain either contents or a url`);
                }
            }
            return files;
        } 
        catch (e) {
            throw new Error(`Invalid files ${e.message}`);
        } 
    }
