/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\root\.eslintrc.js.ittf
    utc time: Sun, 25 Jul 2021 18:49:09 GMT
*/
'use strict';
// https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
module.exports = {
    
    // do not look in parent folders for configuration files
    root: true, 
    
    /**
        * This allows ESLint to understand TypeScript syntax.
        * This is required, or else ESLint will throw errors
        * as it tries to parse TypeScript code as if it were regular JavaScript.
    */
    parser: '@typescript-eslint/parser', 
    parserOptions: {
        ecmaVersion: 2018, 
        sourceType: "module"
     }, 
    env: {
        browser: true, 
        es6: true
     }, 
    extends: [
        'standard', 
        'eslint:recommended', 
        'plugin:@typescript-eslint/eslint-recommended', 
        'plugin:@typescript-eslint/recommended'
    ], 
    plugins: [
        'prettier', 
        '@typescript-eslint'
    ], 
    settings: {
        react: {
            version: '16.8'
         }
     }, 
    rules: {
        'spaced-comment': [
            'warn', 
            'always', 
            {
                block: {
                    balanced: true
                 }
             }
        ]
     }, 
    overrides: [
        {
            files: [
                '*.ts', 
                '*.tsx', 
                '*.d.ts'
            ], 
            parserOptions: {
                project: './tsconfig.json'
             }, 
            rules: {
                '@typescript-eslint/naming-convention': [
                    'warn', 
                    {
                        selector: 'typeLike', 
                        format: [
                            'PascalCase'
                        ]
                     }, 
                    {
                        selector: 'enumMember', 
                        format: [
                            'UPPER_CASE'
                        ]
                     }
                ], 
                'no-unused-expressions': 'off', 
                '@typescript-eslint/no-unused-expressions': 'warn'
             }
         }
    ]
 };
