/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\root\webpack.config.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:24 GMT
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', 
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map', 
    entry: [
        './src/index.js'
    ], 
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, 
                exclude: /(node_modules|(vendor\/.+\.js))/, 
                use: {
                    loader: 'babel-loader', 
                    options: {
                        cacheDirectory: true
                     }
                 }
             }, 
            {
                test: /\.html$/, 
                use: [
                    {
                        loader: "html-loader"
                     }
                ]
             }, 
            {
                test: /\.css$/, 
                use: [
                    'css-loader'
                ]
             }, 
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|ttf)$/, 
                use: {
                    loader: "file-loader", 
                    options: {
                        outputPath: 'assets/'
                     }
                 }
             }
        ]
     }, 
    resolve: {
        modules: [
            path.resolve(__dirname, "src"), 
            "node_modules"
        ], 
        extensions: [
            ".js", 
            ".jsx", 
            ".json"
        ], 
        alias: {
            
         }, 
        fallback: {
            
         }
     }, 
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'scripts'), 
        filename: 'demo.js.react.js'
     }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: 'index.html'
         }), 
        new webpack.HotModuleReplacementPlugin()
    ], 
    devServer: {
        open: true, 
        hot: true
     }
 };
