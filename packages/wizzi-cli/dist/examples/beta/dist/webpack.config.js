/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\beta\.wizzi\root\webpack.config.js.ittf
    utc time: Mon, 15 Feb 2021 13:20:08 GMT
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development", 
    entry: [
        './src/index.js'
    ], 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
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
                    'style-loader', 
                    'css-loader'
                ]
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
            ".json"
        ], 
        alias: {
            
        }, 
        fallback: {
            
        }
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'scripts'), 
        filename: '.js'
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html'
        }), 
        new webpack.HotModuleReplacementPlugin()
    ], 
    devtool: 'cheap-module-source-map', 
    devServer: {
        open: true, 
        hot: true
    }
};
