/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\logger.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Application, Request, Response, RequestHandler} from 'express';
import {MiddlewareType} from '../features/app/types';
export const LoggerMiddleware: MiddlewareType = (app: Application) => 

    app.use((request: Request, response: Response, next) => {
    
        console.log(`${request.method} ${request.path}`)
        next();
    }
    )
;
