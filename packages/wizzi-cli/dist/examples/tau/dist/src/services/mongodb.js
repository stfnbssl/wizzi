/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\services\mongodb.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import mongoose from 'mongoose';
export function mongodbStart(config, modelBuilders) {
    const { mongoUser, mongoPassword, mongoPath } = config;
    const connectUrl = `mongodb+srv://${mongoUser}:${mongoPassword}${mongoPath}`;
    mongoose.Promise = global.Promise;
    return mongoose.connect(connectUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }).then(() => {
            console.log('Mongodb. Connected to', mongoPath);
            modelBuilders.forEach((builder) =>
                builder.buildModel())
            return 'Connected';
        }, (err) => {
            throw new Error('\n\nMongodb. \nCannot connect to \n"' + connectUrl + '". \n\n' + err.message + '\n\n');
        })
    ;
}
