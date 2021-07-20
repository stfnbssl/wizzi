/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\auth\strategies\github.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Strategy} from 'passport-github2';
import {GetAuthUserModel, AuthUserModelType} from '../mongo/authuser';
import {GetAccountModel, AccountModelType} from '../mongo/account';
import {config} from '../../config';
import {AuthRequest} from '../types';

// let authUserModel: AuthUserModelType;
let accountModel: AccountModelType;
export function createStrategy() {

    
    // authUserModel = GetAuthUserModel();
    accountModel = GetAccountModel();
    console.log('============================================================');
    console.log('features.auth.strategies.github.createStrategy', 'config.githubClientId', config.githubClientId, 'config.clientSecret', config.githubClientSecret, 'config.githubCallbackURL', config.githubCallbackURL);
    return new Strategy({
            clientID: config.githubClientId, 
            clientSecret: config.githubClientSecret, 
            callbackURL: config.githubCallbackURL, 
            passReqToCallback: true
         }, function(req: AuthRequest, accessToken: string, refreshToken: string, profile: any, done: any) {
        
            console.log('============================================================');
            console.log('features.auth.strategies.github.callback', 'req.session.socketId', req.session.socketId, 'req.session.socketUserId', req.session.socketUserId, 'req.sessionID', req.sessionID, 'req.session', req.session, 'req.user', req.user, 'accessToken', accessToken, 'refreshToken', refreshToken, 'profile', profile);
            var account = new accountModel();
            account.domain = 'github.com';
            account.uid = profile.id;
            account.username = profile.username;
            account.displayName = profile.displayName;
            account.avatar_url = profile._json.avatar_url;
            var t = {
                kind: 'oauth', 
                token: accessToken, 
                attributes: {
                    refreshToken
                 }
             };
            account.tokens.push(t);
            return done(null, account);
        });
}
