/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\config\index.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as defaults from './defaults';
import * as sdk from './sdk';
import {SDKVersion, PackiFile} from '../packi';

export type ConfigType = { 
    SERVER_URL: string;
    API_URL: string;
    AUTH_URL: string;
    AUTH_PROVIDERS_URL: string;
    VERSIONS: { 
        [version: string]: boolean;
    };
    DEFAULT_SDK_VERSION: SDKVersion;
    EDITOR_LOAD_FALLBACK_TIMEOUT: number;
    DEFAULT_PACKI_CODE: { 
        [path: string]: PackiFile;
    };
    PREFERENCES_KEY: string;
};

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const PLATFORM = process.env.PLATFORM ? process.env.PLATFORM : 'local';

let _config: ConfigType;

function getConfig() {

    if (_config == null) {
        _config = {
            SERVER_URL: 'http://localhost:5000', 
            API_URL: 'http://localhost:5000/api/v1', 
            AUTH_URL: 'http://localhost:5000/api/v1/auth', 
            AUTH_PROVIDERS_URL: 'http://localhost:5000/auth', 
            VERSIONS: sdk.versions, 
            DEFAULT_SDK_VERSION: sdk.DEFAULT_SDK_VERSION, 
            EDITOR_LOAD_FALLBACK_TIMEOUT: defaults.EDITOR_LOAD_FALLBACK_TIMEOUT, 
            DEFAULT_PACKI_CODE: defaults.DEFAULT_PACKI_CODE, 
            PREFERENCES_KEY: 'packi.preferences.config'
         };
        console.log('features.config', _config);
    }
    return _config;
}

export const config: ConfigType = getConfig();

export const DEFAULT_PACKI_CODE = config.DEFAULT_PACKI_CODE;

export default config;
