/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\root\webpack.config.js.ittf
    utc time: Sat, 01 May 2021 05:18:16 GMT
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
    // eslint-disable import/no-commonjs
*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
function env(key, def) {
    const value = process.env[key];
    if (value !== undefined) {
        return value;
    }
    throw new Error(`Environment variable ${key} isn't specified`);
}
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', 
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map', 
    entry: [
        './src/index.tsx'
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
                test: /\.(ts|tsx)?$/, 
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
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
             }, 
            {
                test: /\.scss$/, 
                exclude: /(node_modules)/, 
                use: [
                    'sass-loader'
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
             }, 
            {
                
                // graphql-request includes this polyfill
                test: path.resolve(__dirname, 'node_modules/cross-fetch/dist/browser-polyfill.js'), 
                use: 'null-loader'
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
            ".ts", 
            ".jsx", 
            ".tsx", 
            ".json"
        ], 
        
        // https://github.com/Khan/aphrodite#disabling-important
        alias: {
            aphrodite: 'aphrodite/no-important'
         }, 
        fallback: {
            
         }
     }, 
    output: {
        globalObject: 'self', 
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].bundle.js', 
        chunkFilename: '[id].[hash].chunk.js'
     }, 
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env('NODE_ENV')), 
                SERVER_URL: JSON.stringify(env('SERVER_URL')), 
                API_SERVER_URL: JSON.stringify(env('API_SERVER_URL')), 
                SNACK_SEGMENT_KEY: JSON.stringify(env('SNACK_SEGMENT_KEY')), 
                SNACK_AMPLITUDE_KEY: JSON.stringify(env('SNACK_AMPLITUDE_KEY')), 
                SNACK_WEBPLAYER_URL: JSON.stringify(env('SNACK_WEBPLAYER_URL')), 
                IMPORT_SERVER_URL: JSON.stringify(env('IMPORT_SERVER_URL')), 
                DEPLOY_ENVIRONMENT: JSON.stringify(env('DEPLOY_ENVIRONMENT')), 
                BUILD_TIMESTAMP: JSON.stringify(Date.now())
             }
         }), 
        new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/), 
        new WorkerPlugin(), 
        new MiniCssExtractPlugin(), 
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: 'index.html'
         })
    ], 
    devServer: {
        contentBase: path.join(__dirname, 'src')
     }
 };
