/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\auth\manager.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import passport from 'passport';
import {GetAuthUserModel} from './mongo/authuser';
import {GetAccountModel, AccountModelType} from './mongo/account';
import {IAccount} from './types';
import {createStrategy as createLocalStrategy} from './strategies/local';
import {createStrategy as createGithubStrategy} from './strategies/github';
import {resolve} from 'path';
import {rejects} from 'assert';
let initialized = false;

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
function initPassport() {

    const authUserModel = GetAuthUserModel();
    passport.use(createLocalStrategy());
    passport.use(createGithubStrategy());
    passport.serializeUser(function(user: any, done: any) {
    
        console.log('============================================================');
        console.log('features.auth.manager.serializeUser', 'user', user);
        done(null, user);
    })
    passport.deserializeUser(function(id: string, done: any) {
    
        console.log('============================================================');
        console.log('features.auth.manager.deserializeUser', 'id', id);
        return done(null, id);
        authUserModel.findById(id, function(err: any, user: any) {
        
            console.log('features.auth.manager.deserializeUser', 'err', err, 'user', user);
            done(err, user || false);
        })
    })
    initialized = true;
}

function getTokenFromHeaders(req: any) {

    const {
        headers: {
            authorization
         }
     } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
}

export function getPassport() {

    if (initialized == false) {
        initPassport();
    }
    return passport;
}

export function authenticate(strategyName: string, options: passport.AuthenticateOptions, callback?: any) {

    console.log('============================================================');
    console.log('auth.manager.authenticate', 'strategyName', strategyName, 'options', options);
    return passport.authenticate(strategyName, options, callback);
}

export async function getAccessTokenFromAccount(uid: string, domain: string):  Promise<string> {

    const AccountModel = GetAccountModel();
    return new Promise((resolve, reject) => 
        
            AccountModel.findOne({
                uid, 
                domain
             }, (err: any, account: IAccount) => {
            
                if (err) {
                    return reject(err);
                }
                if (account) {
                    return resolve(account.tokens[0].token);
                }
                else {
                    return reject('Token not found');
                }
            }
            )
        );
}

export async function getLoggedUserFromAccount(uid: string, domain: string):  Promise<any> {

    const AccountModel = GetAccountModel();
    return new Promise((resolve, reject) => 
        
            AccountModel.findOne({
                uid, 
                domain
             }, (err: any, account: IAccount) => {
            
                if (err) {
                    return reject(err);
                }
                if (account) {
                    return resolve({
                            _id: 'Unavailable', 
                            uid, 
                            username: account.username, 
                            displayName: account.displayName, 
                            picture: account.avatar_url
                         });
                }
                else {
                    return reject('Account not found');
                }
            }
            )
        );
}
