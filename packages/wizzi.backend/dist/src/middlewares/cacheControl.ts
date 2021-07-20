/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\cacheControl.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Application} from 'express';
import {MiddlewareType} from '../features/app/types';
import {config} from '../features/config/index';
export const CacheControlMiddleware: MiddlewareType = (app: Application) => {

    if (config.noCache) {
        app.use((req, res, next) => {
        
            res.set('Cache-Control', 'no-store');
            next();
        }
        )
    }
}
;
