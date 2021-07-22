/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\static.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import * as path from 'path';
import {Application, static as expressStatic} from 'express';
import {MiddlewareType} from '../features/app/types';
export const StaticFilesMiddleware: MiddlewareType = (app: Application) => {

    console.log('StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'static'));
    app.use('/static', expressStatic(path.resolve(__dirname, '..', '..', 'static')));
    console.log('StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'ittf'));
    // simply browse ittfs when IttfDocumentsMiddleware is not used
    app.use('/ittf', expressStatic(path.resolve(__dirname, '..', '..', 'ittf')));
    console.log('StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'dist'));
    app.use('/dist', expressStatic(path.resolve(__dirname, '..', '..', 'dist')));
}
;
