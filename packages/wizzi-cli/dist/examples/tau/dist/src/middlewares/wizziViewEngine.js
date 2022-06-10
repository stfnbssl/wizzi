/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\middlewares\wizziViewEngine.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import path from 'path';
import stringify from 'json-stringify-safe';
import {wizziProds} from '../features/wizzi/index.js';
export const WizziViewEngineMiddleware = (app) => {
    app.engine('ittf', async function(filePath, options, callback) {
        // define the template engine
        const twinJsonContext = await wizziProds.inferAndLoadContextFs(filePath, 'mpage');
        const context = {
            ...options, 
            locals: options._locals, 
            ...twinJsonContext
        };
        console.log('WizziViewEngineMiddleware.context', stringify(context, null, 2));
        wizziProds.generateArtifactFs(filePath, context).then((generated) =>
            callback(null, generated.artifactContent)).catch((err) =>
            callback(err))
    })
    const viewsFolder = path.resolve(__dirname, '..', 'site', 'views');
    console.log('WizziViewEngineMiddleware.views folder', viewsFolder);
    // specify the views directory
    app.set('views', viewsFolder);
    // register the template engine
    app.set('view engine', 'ittf');
};
