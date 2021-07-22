/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\services\mongodb.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import mongoose from 'mongoose';
import {ModelBuilderType} from '../features/app';
import {ConfigType} from '../features/config';

export function mongodbStart(config: ConfigType, modelBuilders: ModelBuilderType[]) {

    
    let connectUrl: string;
    const { mongoHost, mongoUser, mongoPassword, mongoPath } = config;
    if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
        connectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
    }
    // example 'mongodb://localhost/test'
    else {
        connectUrl = `${mongoPath}`;
    }
    
        // TODO (VIA) set mongoose.Promise = global.Promise
    return mongoose.connect(connectUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
         }).then(() => {
        
            console.log('Mongodb. Connected to', mongoPath);
            modelBuilders.forEach(builder => 
            
                builder.buildModel()
            )
            return 'Connected';
        }
        , (err) => {
        
            throw new Error('\n\nMongodb. \nCannot connect to \n"' + connectUrl + '". \n\n' + err.message + '\n\n');
        }
        )
    ;
}

export const close = () => 

    mongoose.connection.close()
;
