/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\config\env.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import path from 'path';
import dotenv from 'dotenv';
import {cleanEnv, str, bool, port} from 'envalid';
import {ConfigType} from './types';
function validateEnv() {

    dotenv.config();
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(), 
        SESSION_SECRET: str(), 
        NO_CACHE: bool(), 
        CORS_CLIENT_ORIGIN: str(), 
        MONGO_HOST: str(), 
        MONGO_USER: str(), 
        MONGO_PASSWORD: str(), 
        MONGO_PATH: str(), 
        AUTH0_DOMAIN: str(), 
        AUTH0_PACKI_CLIENT_ID: str(), 
        AUTH0_PACKI_CLIENT_SECRET: str(), 
        AUTH0_PACKI_CALLBACK_URL: str(), 
        AUTH0_PACKI_API_ID: str(), 
        AUTH0_PACKI_BACKEND_APP_ID: str(), 
        AUTH0_PACKI_BACKEND_APP_SECRET: str(), 
        AUTH0_ISSUER_BASE_URL: str(), 
        AUTH0_CLIENT_ID: str(), 
        AUTH0_BASE_URL: str(), 
        AUTH0_SECRET: str(), 
        GITHUB_CLIENT_ID: str(), 
        GITHUB_CLIENT_SECRET: str(), 
        GITHUB_CALLBACK_URL: str(), 
        GOOGLE_CLIENT_ID: str(), 
        GOOGLE_CLIENT_SECRET: str(), 
        GOOGLE_CALLBACK_URL: str(), 
        IS_WIZZI_DEV: bool(), 
        PACKI_STORE_FOLDER: str(), 
        PACKI_TEMPLATES_FOLDER: str(), 
        PACKI_API_ENDPOINT: str()
     });
    process.env.PACKI_API_ENDPOINT = checkedEnv.PACKI_API_ENDPOINT;
    console.log('config/env.ts, PACKI_API_ENDPOINT after', process.env.PACKI_API_ENDPOINT);
    return checkedEnv;
}
export const packiFilePrefix = 'c:/json/';
let config: ConfigType;
export default function create():  ConfigType {
    
        if (config == null) {
            const checkedEnv = validateEnv();
            const __rootPath = path.join(__dirname, '..', '..', '..');
            const __ittfPath = path.join(__rootPath, 'ittf');
            const __dataPath = path.join(__rootPath, 'data');
            config = {
                port: checkedEnv.PORT, 
                sessionSecret: checkedEnv.SESSION_SECRET, 
                noCache: checkedEnv.NO_CACHE, 
                corsClientOrigin: checkedEnv.CORS_CLIENT_ORIGIN, 
                mongoHost: checkedEnv.MONGO_HOST, 
                mongoUser: checkedEnv.MONGO_USER, 
                mongoPassword: checkedEnv.MONGO_PASSWORD, 
                mongoPath: checkedEnv.MONGO_PATH, 
                mongoConnectUrl: '', 
                auth0Domain: checkedEnv.AUTH0_DOMAIN, 
                auth0PackiClientId: checkedEnv.AUTH0_PACKI_CLIENT_ID, 
                auth0PackiClientSecret: checkedEnv.AUTH0_PACKI_CLIENT_SECRET, 
                auth0PackiCallbackUrl: checkedEnv.AUTH0_PACKI_CALLBACK_URL, 
                auth0PackiApiId: checkedEnv.AUTH0_PACKI_API_ID, 
                auth0PackiBackendAppId: checkedEnv.AUTH0_PACKI_BACKEND_APP_ID, 
                auth0PackiBackendAppSecret: checkedEnv.AUTH0_PACKI_BACKEND_APP_SECRET, 
                auth0IssuerBaseURL: checkedEnv.AUTH0_ISSUER_BASE_URL, 
                auth0ClientId: checkedEnv.AUTH0_CLIENT_ID, 
                auth0BaseURL: checkedEnv.AUTH0_BASE_URL, 
                auth0Secret: checkedEnv.AUTH0_SECRET, 
                githubClientId: checkedEnv.GITHUB_CLIENT_ID, 
                githubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET, 
                githubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL, 
                googleClientId: checkedEnv.GOOGLE_CLIENT_ID, 
                googleClientSecret: checkedEnv.GOOGLE_CLIENT_SECRET, 
                googleCallbackURL: checkedEnv.GOOGLE_CALLBACK_URL, 
                isWizziDev: checkedEnv.IS_WIZZI_DEV, 
                ittfPath: __ittfPath, 
                dataPath: __dataPath, 
                metaHtmlIttfPath: path.join(__ittfPath, 'meta', 'html', 'index.html.ittf'), 
                metaFolderIttfPath: path.join(__ittfPath, 'meta', 'folder', 'index.html.ittf'), 
                metaHtmlTextPath: path.join(__ittfPath, 'meta', 'text', 'index.html.ittf'), 
                packiStoreFolder: checkedEnv.PACKI_STORE_FOLDER, 
                packiTemplatesFolder: checkedEnv.PACKI_TEMPLATES_FOLDER, 
                packiApiEndpoint: checkedEnv.PACKI_API_ENDPOINT
             };
            const { mongoHost, mongoUser, mongoPassword, mongoPath } = config;
            if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
                config.mongoConnectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
            }
            // example 'mongodb://localhost/test'
            else {
                config.mongoConnectUrl = `${mongoPath}`;
            }
            Object.keys(config).forEach((element) => {
            
                if (element.indexOf("Pass") < 0 && element.indexOf("Secr") < 0) {
                    console.log('Created config', element, (config as any)[element])
                }
            }
            )
        }
        return config;
    }
