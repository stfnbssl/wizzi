/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\errors.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Application, Request, Response, NextFunction} from 'express';
import {MiddlewareType} from '../features/app/types';
import HttpException from '../httpException';
export const ErrorsMiddleware: MiddlewareType = 
// catch 404 and forward to error handler

// development error handler

// will print stacktrace

// production error handler

// no stacktraces leaked to user
(app: Application) => {

    app.use(function(req: Request, res: Response, next: NextFunction) {
    
        var err = new HttpException(404, 'Not Found');
        next(err);
    })
    if (app.get('env') === 'development') {
        app.use(function(err: HttpException, req: Request, res: Response, next: NextFunction) {
        
            res.status(err.status || 500);
            res.render('error.html.ittf', {
                message: err.message, 
                error: err
             })
        })
    }
    app.use(function(err: HttpException, req: Request, res: Response, next: NextFunction) {
    
        res.status(err.status || 500);
        res.render('error.html.ittf', {
            message: err.message, 
            error: err
         })
    })
}
;
