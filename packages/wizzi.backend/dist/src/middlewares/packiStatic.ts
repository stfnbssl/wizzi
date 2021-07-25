/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\packiStatic.ts.ittf
    utc time: Sun, 25 Jul 2021 19:40:41 GMT
*/
import util from 'util';
import path from 'path';
import stringify from 'json-stringify-safe';
import parseUrl from 'parseurl';
import axios from 'axios';
import {Application, RequestHandler, Request, Response} from 'express';
import {MiddlewareType} from '../features/app/types';
import {config} from '../features/config';
const myname = 'express.middleware.packiStatic';
export const PackiStaticMiddleware: MiddlewareType = (app: Application) => {

    console.log('PackiStaticMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'ittf'));
    app.use('/packi', ittfMiddleware(path.resolve(__dirname, '..', '..', 'ittf'), '/ittf'));
}
;
function ittfMiddleware(basePath: string, routePath: string):  RequestHandler {

    return async (request: Request, response: Response, next: Function) => {
        
            if (request.method !== 'GET' && request.method !== 'HEAD') {
                return next();
            }
            const parsedUrl = parseUrl(request);
            if (!parsedUrl || !parsedUrl.pathname) {
                return next();
            }
            console.log('packiStatic parsedUrl', parsedUrl);
            console.log('packiStatic request.path', request.path);
            const reqpath = parsedUrl && parsedUrl.path;
            if (false) {
                return response.redirect(307, 'http://localhost:3000/packi' + reqpath);
            }
            else {
                console.log('packiStatic parsedUrl.path', reqpath);
                axios.get('http://localhost:3000/packi' + reqpath).then((res: any) => {
                
                    console.log(myname + '. res', typeof res, Object.keys(res));
                    console.log(myname + '. res.headers', res.headers);
                    console.log(myname + '. res.data.length', res.data.length);
                    response.status(200);
                    response.set('Content-Type', res.headers['content-type']);
                    response.set('Content-Length', res.data.length);
                    response.set('Cache-Control', res.headers['cache-control']);
                    response.set('Expires', res.headers['expires']);
                    response.set('Pragma', res.headers['pragma']);
                    response.send(res.data);
                }
                ).catch((err: any) => {
                
                    console.log(myname + '.packiItem.err', err);
                    sendError(response, err, {
                        format: 'json'
                     })
                }
                )
            }
        }
    ;
}

function sendError(response: Response, err: any, options: any) {

    options = options || {};
    const code = options.code || 999;
    let errEmit: any = err;
    delete errEmit.__is_error
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, {
                depth: null
             })
            ;
        }
        errEmit = err.replace(RegExp('\n', 'g'), '<br>');
    }
    else {
        if (err.stack && err.stack.split) {
            const stackArray: string[] = [];
            (err.stack as string).split('\n').forEach(element => 
            
                stackArray.push('    ' + element)
            )
            errEmit.stack = stackArray;
        }
    }
    response.setHeader('Content-Type', 'application/json');
    response.send(stringify({
        code, 
        error: errEmit
     }, null, 4))
}
