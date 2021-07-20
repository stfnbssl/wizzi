/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\auth\mongo\authuser.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IAuthUserModel} from "../types";
const crypto = require('crypto');

const AuthUserSchema = new Schema<IAuthUserModel>({
    userName: {
        type: String
     }, 
    realName: {
        type: String
     }, 
    email: {
        type: String
     }, 
    hash: {
        type: String
     }, 
    salt: {
        type: String
     }
 }, {
    collection: 'users'
 });
AuthUserSchema.methods.setPassword = function(password: string) {

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log('features.auth.mongo.AuthUser.setPassword.salt,hash', this.salt, this.hash);
}
;
AuthUserSchema.methods.validatePassword = function(password: string):  boolean {

    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log('features.auth.mongo.AuthUser.validatePassword.hash,this.hash', hash, this.hash);
    return this.hash === hash;
}
;

export type AuthUserModelType = Model<IAuthUserModel>;

let authUserModel: AuthUserModelType;

export function GetAuthUserModel():  AuthUserModelType {

    return authUserModel;
}

export const AuthUserModelBuilder: ModelBuilderType = {
    buildModel: () => 
    
        authUserModel = model<IAuthUserModel>("AuthUser", AuthUserSchema)
    
    
 };
