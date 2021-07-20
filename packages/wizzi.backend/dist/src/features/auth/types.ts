/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\auth\types.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/

import {Request} from 'express';
import {Document} from "mongoose";

export interface AuthRequest extends Request {
    session: any;
}

export type IAuthUser = { 
    userName: string;
    realName: string;
    email: string;
    hash: string;
    salt: string;
    createdAt: Date;
    lastAccess: Date;
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
    generateJWT(): any;
};

export interface IAuthUserModel extends IAuthUser, Document {
}

export type IToken = { 
    kind: string;
    token: string;
    attributes: { 
        [k: string]: string;
    };
};

export interface ITokenModel extends IToken, Document {
}

export type IAccount = { 
    domain: string;
    uid: string;
    username: string;
    displayName: string;
    avatar_url: string;
    tokens: [IToken];
};

export interface IAccountModel extends IAccount, Document {
}
