import session from 'express-session';
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
import {config} from '../config/index';



export const SessionMiddleware = (app) => {
    console.log('SessionMiddleware', 'init');
    const cookieOptions = {
        
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false, 
        httpOnly: true, 
        
        // expires in 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000
    };
    if (app.get('env') === 'production') {
        server.set('trust proxy', 1); // trust first proxy
    }
    
    console.log('SessionMiddleware.config.sessionSecret', config.sessionSecret);    
    const sessionOptions = {
        name: 'express.account.sid', 
        secret: config.sessionSecret, 
        store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/test', 
            ttl: 14 * 24 * 60 * 60
        }), 
        cookie: cookieOptions, 
        resave: false, 
        saveUninitialized: false
    };
    app.use(session(sessionOptions));
};
