/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\lint\lintCode.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import eslintrc from '../../configs/eslint.json';
import {Annotation} from '../annotations/index';
import {Linter} from '../vendor/eslint';
import {isTS} from '../file/fileUtilities';

export default function lintCode(fileName: string, code: string, config: object = eslintrc):  Annotation[] {
    
        const linter = new Linter();
        const errors: { 
            ruleId: string;
            line: number;
            column: number;
            message: string;
            severity: number;
        }[] = linter.verify(code, config);
        return errors.map((err) => {
                
                    const isParsingError = err.message.toLowerCase().startsWith('parsing error');
                    if (isParsingError && isTS(fileName) && err.message.match(/ (as|extends|typeof|private|public) /)) {
                        return null;
                    }
                    return {
                            location: {
                                fileName, 
                                startLineNumber: err.line, 
                                endLineNumber: err.line, 
                                startColumn: err.column, 
                                endColumn: err.column
                             }, 
                            message: `${err.message} (${err.ruleId})`, 
                            severity: isParsingError ? 4 : Math.max(err.severity, 2), 
                            source: 'ESLint'
                         };
                }
                ).filter(err => 
                
                    err
                ) as Annotation[];
    }
