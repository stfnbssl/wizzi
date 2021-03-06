/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\src\features\prettier\prettierCode.tsx.ittf
    utc time: Sat, 01 May 2021 05:18:20 GMT
*/
import {getFileLanguage} from '../file/index';
export default async function prettierCode(path: string, code: string):  Promise<string> {
    
        const language = getFileLanguage(path);
        let parser;
        let plugins;
        switch (language) {
            case 'javascript': {
                parser = 'babel';
                plugins = [
                    await import('prettier/parser-babel')
                ];
                break;
            }
            case 'typescript': {
                parser = 'typescript';
                plugins = [
                    await import('prettier/parser-typescript')
                ];
                break;
            }
            case 'markdown': {
                parser = 'markdown';
                plugins = await Promise.all([
                        import('prettier/parser-babel'), 
                        import('prettier/parser-typescript'), 
                        import('prettier/parser-markdown')
                    ]);
                ;
                break;
            }
        }
        if (parser && plugins) {
            const prettier = await import('prettier/standalone');
            const {
                default: config
             } = await import('./prettier.json') as any;
            return prettier.format(code, {
                    parser, 
                    plugins, 
                    ...config
                 });
        }
        return code;
    }
