/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\auth\strategies\local.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {Strategy} from 'passport-local';
import {GetAuthUserModel, AuthUserModelType} from '../mongo/authuser';
import {config} from '../../config';
let authUserModel: AuthUserModelType;
export function createStrategy() {

    authUserModel = GetAuthUserModel();
    console.log('features.auth.strategies.local.createStrategy');
    return new Strategy({
            usernameField: 'user[email]', 
            passwordField: 'user[password]'
         }, (email: string, password: string, done: any) => {
        
            console.log('features.auth.strategies.local.verify.email,password', email, password);
            authUserModel.findOne({
                email
             }).then((user: any) => {
            
                if (!user || !user.validatePassword(password)) {
                    console.log('features.auth.strategies.local.verify.false');
                    return done(null, false, {
                            errors: {
                                'email or password': 'is invalid'
                             }
                         });
                }
                console.log('features.auth.strategies.local.verify.true.user', user);
                return done(null, user);
            }
            ).catch(done)
        }
        );
}
