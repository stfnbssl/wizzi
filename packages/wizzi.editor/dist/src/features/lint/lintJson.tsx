/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\lint\lintJson.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import parse from 'json-to-ast';
import {Annotation} from '../annotations/index';

export default function lintJson(fileName: string, code: string):  Annotation[] {
    
        try {
            parse(code, {
                source: fileName
             })
            return [];
        } 
        catch (e) {
            return [
                    {
                        location: {
                            fileName, 
                            startLineNumber: e.line || 0, 
                            endLineNumber: e.line || 0, 
                            startColumn: e.column || 0, 
                            endColumn: e.column || 0
                         }, 
                        message: e.message, 
                        severity: 4, 
                        source: 'JSON'
                     }
                ];
        } 
    }
