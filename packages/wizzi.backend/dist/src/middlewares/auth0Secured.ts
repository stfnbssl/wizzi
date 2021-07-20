/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\auth0Secured.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
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
