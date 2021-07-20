/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\utils\sendResponse.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Response} from 'express';
import HttpException from '../httpException';
function sendContent(res: Response, contentType: string, content: string) {

    res.writeHead(200, {
        'Content-Type': contentType, 
        'Content-Length': content ? content.length : 0
     })
    res.end(content);
}
export const sendHtml = (res: Response, content: string) => 

    sendContent(res, 'text/html', content)
;
export const sendFailure = (res: Response, error: any, status: number) => {

    res.status(error && error.status ? error.status : status)
    res.type('application/json');
    res.send(error);
}
;
export const sendSuccess = (res: Response, message: any) => {

    res.status(200);
    res.type('application/json');
    res.send(message);
}
;
export function sendPromiseResult<T>(res: Response, message: Promise<T>) {

    message.then((result: T) => 
    
        // console.log('sendPromiseResult.ok', result);
        sendSuccess(res, result)
    ).catch((err: any) => {
    
        console.log('sendPromiseResult.err', err);
        sendFailure(res, err, 500);
    }
    )
}
export function sendPromiseLikeResult<T>(res: Response, message: PromiseLike<T>) {

    message.then(
    // log 'sendPromiseLikeResult.ok', result
    (result: T) => 
    
        sendSuccess(res, result)
    )
}
