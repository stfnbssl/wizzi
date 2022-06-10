import dotenv from 'dotenv';
import {cleanEnv, str, bool, port} from 'envalid';

function validateEnv() {
    dotenv.config();
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(), 
        SESSION_SECRET: str(), 
        CORS_CLIENT_ORIGIN: str(), 
        MONGO_HOST: str(), 
        MONGO_USER: str(), 
        MONGO_PASSWORD: str(), 
        MONGO_PATH: str(), 
        GITHUB_CLIENT_ID: str(), 
        GITHUB_CLIENT_SECRET: str(), 
        GITHUB_CALLBACK_URL: str(), 
        GOOGLE_CLIENT_ID: str(), 
        GOOGLE_CLIENT_SECRET: str(), 
        GOOGLE_CALLBACK_URL: str(), 
    });
    return checkedEnv;
}

let config = null;

export default function create() {
    if (config == null) {
        const checkedEnv = validateEnv();
        config = {
            port: checkedEnv.PORT, 
            sessionSecret: checkedEnv.SESSION_SECRET, 
            corsClientOrigin: checkedEnv.CORS_CLIENT_ORIGIN, 
            mongoHost: checkedEnv.MONGO_HOST, 
            mongoUser: checkedEnv.MONGO_USER, 
            mongoPassword: checkedEnv.MONGO_PASSWORD, 
            mongoPath: checkedEnv.MONGO_PATH, 
            githubClientId: checkedEnv.GITHUB_CLIENT_ID, 
            githubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET, 
            githubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL, 
            googleClientId: checkedEnv.GOOGLE_CLIENT_ID, 
            googleClientSecret: checkedEnv.GOOGLE_CLIENT_SECRET, 
            googleCallbackURL: checkedEnv.GOOGLE_CALLBACK_URL, 
        };
        Object.keys(config).forEach((element) => {
            if (element.indexOf("Pass") < 0 && element.indexOf("Secr") < 0) {
                console.log('Created config', element, (config)[element])
            }
        })
    }
    return config;
}