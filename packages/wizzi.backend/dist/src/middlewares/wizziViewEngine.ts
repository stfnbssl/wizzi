/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\middlewares\wizziViewEngine.ts.ittf
    utc time: Sun, 25 Jul 2021 19:40:41 GMT
*/
import path from 'path';
import {Application} from 'express';
import {MiddlewareType} from '../features/app/types';
import {wizziProds} from '../features/wizzi';
export const WizziViewEngineMiddleware: MiddlewareType = 
// log 'WizziViewEngineMiddleware.views folder', viewsFolder
(app: Application) => {

    app.engine('ittf', // log 'WizziViewEngineMiddleware.options', JSON.stringify(options, null, 2)
    async function(filePath: string, options: any, callback: any) {
    
        try {
            const twinJsonContext = await wizziProds.inferAndLoadContextFs(filePath, 'mpage');
            const context = {
                ...options, 
                locals: options._locals, 
                ...twinJsonContext
             };
            // log 'WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2)
            // log 'WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2)
            wizziProds.generateArtifactFs(filePath, context).then((generated) => {
            
                return callback(null, generated.artifactContent);
            }
            ).catch((err) => {
            
                return callback(err);
            }
            )
        } 
        catch (ex) {
            callback(ex);
        } 
    })
    const viewsFolder = path.resolve(__dirname, '..', 'site', 'views');
    app.set('views', viewsFolder);
    // specify the views directory
    // register the template engine
    app.set('view engine', 'ittf');
}
;
