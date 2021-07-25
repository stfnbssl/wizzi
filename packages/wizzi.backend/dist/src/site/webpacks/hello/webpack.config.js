/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\site\webpacks\hello\webpack.config.js.ittf
    utc time: Sun, 25 Jul 2021 19:40:37 GMT
*/
'use strict';
import path from 'path';
export const config = {
    mode: "development", 
    resolve: {
        extensions: [
            ".tsx", 
            ".ts", 
            ".js"
        ]
     }, 
    entry: path.resolve(__dirname, './src/index.ts'), 
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react', 
                            '@babel/preset-typescript'
                        ]
                     }
                 }
             }, 
            {
                test: /\.(css|scss)$/, 
                use: [
                    "css-loader"
                ]
             }, 
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, 
                use: [
                    "file-loader"
                ]
             }
        ]
     }, 
    output: {
        path: path.resolve(__dirname, 'static'), 
        filename: 'hello.bundle.js', 
        publicPath: '/webpacks/hello'
     }, 
    devtool: 'cheap-module-source-map'
 };
