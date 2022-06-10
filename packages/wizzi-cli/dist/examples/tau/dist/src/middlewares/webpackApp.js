/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\middlewares\webpackApp.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
import express from 'express';
import {config as config_hello} from '../site/webpacks/hello/webpack.config.js';
import {config as config_blog} from '../site/webpacks/blog/webpack.config.js';
console.log('WebpackAppMiddleware config_hello', config_hello);
console.log('WebpackAppMiddleware config_blog', config_blog);
export const WebpackAppMiddleware = (app) => {
    let webpack = null;
    let webpackDevMiddleware = null;
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        app.use('/webpacks/hello/dist', express.static(config_hello.output.publicPath))
    }
    else {
        if (!webpack) {
            webpack = require('webpack');
        }
        if (!webpackDevMiddleware) {
            webpackDevMiddleware = require('webpack-dev-middleware');
        }
        const compiler = webpack(config_hello);
        app.use(webpackDevMiddleware(compiler, {
            writeToDisk: !!false, 
            publicPath: config_hello.output.publicPath
        }))
        console.log('WebpackAppMiddleware.pack hello on path', config_hello.output.publicPath, 'writeToDisk',  !!false);
    }
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        app.use('/webpacks/blog/dist', express.static(config_blog.output.publicPath))
    }
    else {
        if (!webpack) {
            webpack = require('webpack');
        }
        if (!webpackDevMiddleware) {
            webpackDevMiddleware = require('webpack-dev-middleware');
        }
        const compiler = webpack(config_blog);
        app.use(webpackDevMiddleware(compiler, {
            writeToDisk: !!false, 
            publicPath: config_blog.output.publicPath
        }))
        console.log('WebpackAppMiddleware.pack blog on path', config_blog.output.publicPath, 'writeToDisk',  !!false);
    }
};
