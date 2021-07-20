/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\session.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Application, CookieOptions} from 'express';
import {MiddlewareType} from '../features/app/types';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import {config} from '../features/config';
export const SessionMiddleware: MiddlewareType = 
// const MongoStore = mongoSessionStore(session)

// log 'SessionMiddleware.config.sessionSecret', config.sessionSecret
(app: Application) => {

    console.log('SessionMiddleware', 'init');
    const cookieOptions: CookieOptions = {
        
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false, 
        httpOnly: true, 
        
        // expires in 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000
     };
    const sessionOptions: session.SessionOptions = {
        name: 'wizzi.backend.sid', 
        secret: config.sessionSecret, 
        store: MongoStore.create(
        // save session 14 days
        {
            mongoUrl: config.mongoConnectUrl, 
            ttl: 14 * 24 * 60 * 60
         }), 
        cookie: cookieOptions, 
        resave: false, 
        saveUninitialized: false
     };
    app.use(session(sessionOptions));
}
;
