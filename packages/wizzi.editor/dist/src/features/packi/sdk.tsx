/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\sdk.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import sdks from './sdks';
import features from './sdks/features';
import {SDKVersion} from './sdks/types';
export function validateSDKVersion(sdkVersion: SDKVersion):  SDKVersion {

    if (Object.keys(sdks).indexOf(sdkVersion) < 0) {
        throw new Error(`Invalid SDKVersion, the following versions are supported: ${Object.keys(sdks)}`);
    }
    return sdkVersion;
}
export function isTFolderPreloaded(name: string, sdkVersion: SDKVersion, coreTFoldersOnly?: boolean):  boolean {

    const sdk = sdks[sdkVersion];
    if (!sdk) {
        return false;
    }
    return !!(sdk.coreTFolders[name] || (!coreTFoldersOnly));
}
    //
    
