/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.account\.wizzi\server\src\middlewares\auth0Secured.ts.ittf
    utc time: Tue, 25 May 2021 12:34:40 GMT
*/
import {Request, Response} from 'express';
export default function getSecured() {
    
        console.log('getSecured called');
        return function secured(req: Request, res: Response, next: Function) {
            
                console.log('secured called', req.user);
                if (req.user) {
                    return next();
                }
                (req.session as any).returnTo = req.originalUrl;
                res.redirect('/account/login');
            };
    }
    //
