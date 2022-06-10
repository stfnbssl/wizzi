/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\middlewares\auth0_openid.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import {auth} from 'express-openid-connect';

const config = {
    authRequired: false, 
    auth0Logout: true, 
    secret: 'a long, randomly-generated string stored in env', 
    baseURL: 'http://localhost:5000', 
    clientID: 'dJoAkgjkJmbElAgqMxqsBPlfoZ3xdAdV', 
    issuerBaseURL: 'https://dev-qwf9-zob.eu.auth0.com'
};

export const Auth0OpenIdMiddleware = (app) => {
    
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(config))
    
    // req.isAuthenticated is provided from the auth router
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.oidc.isAuthenticated;
        next();
    })
};
