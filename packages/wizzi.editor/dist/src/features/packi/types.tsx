/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\types.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {ThemeName} from '../preferences/index';
import {SDKVersion} from './sdks/types';

export type Packi = { 
    id: string;
    files: PackiFiles;
    dependencies?: { 
        [key: string]: string;
    };
};
export type PackiTemplate = { 
    id: string;
    files: PackiFiles;
    dependencies?: { 
        [key: string]: string;
    };
};

export type PackiCodeFile = { 
    type: 'CODE';
    contents: string;
    generated?: boolean;
    bothRealAndGenerated?: boolean;
    error?: Error;
};
    //
    

export type PackiAssetFile = { 
    type: 'ASSET';
    // string = url
    contents: string | File | Blob | FormData;
    generated?: boolean;
    bothRealAndGenerated?: boolean;
    // string = url
    error?: Error;
};
    //
    

export type PackiFile = PackiCodeFile | PackiAssetFile;
    //
    

export type PackiFiles = { 
    [path: string]: PackiFile;
};
    //
    
export type PackiDependencyVersions = { 
    [name: string]: string;
};
    //
    
export type PackiDependency = { 
    version: string;
    handle?: string;
    peerDependencies?: PackiDependencyVersions;
    wantedVersion?: string;
    error?: Error;
};
    //
    
export type PackiDependencies = { 
    [name: string]: PackiDependency;
};
    //
    
export type PackiMissingDependency = { 
    dependents: string[];
    wantedVersion?: string;
};
    //
    
export type PackiMissingDependencies = { 
    [name: string]: PackiMissingDependency;
};
    //
    

export interface PackiError extends Error {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
}
    //
    

export type PackiUser = { 
    sessionSecret?: string;
    accessToken?: string;
};
    //
    

export type PackiState = { 
    /**
        // 
        // Files that make up the content (code & assets) of the Packi.
        // 
    */
    files: PackiFiles;
    owner: string;
    /**
        // 
        // Optional name. The name is used when saving or downloading the Packi; and is used
        // for the onlineName property.
        // 
    */
    name: string;
    /**
        // 
        // Additional description of the Packi. The description is used when saving the Packi
        // and may also be used for searching purposes.
        // 
    */
    description: string;
    packiProduction?: PackiProduction;
    mainIttf?: string;
    wizziSchema?: string;
    /**
        // 
        // Unique experience url which can be used to open the Wizzi client and connect
        // to the Packi (e.g. "exp://expo.io/@packi/sdk.38.0.0-78173941").
        // 
    */
    url: string;
    user?: PackiUser;
    /**
        // 
        // Unsaved status of the Packi. Becomes `true` when the Packi code is changed and
        // `false` whenever the Packi is saved.
        // 
    */
    unsaved: boolean;
    /**
        // 
        // Id of the saved Packi.
        // 
    */
    id?: string;
    /**
        // 
        // URL of the saved Packi.
        // The URL is empty when no save "id" is available.
        // 
    */
    saveURL?: string;
    /**
        // 
        // URL to use to when loading the web-preview in an iframe.
        // 
        // Web-preview is supported from SDK 40 and higher.
        // To enable it, set the `webPreviewRef` to the contentWindow
        // of the iframe.
        // 
    */
    previewURL?: string;
    /**
        // 
        // Disabled state. When the Packi is disabled it will not resolve any dependencies
        // or upload any asset files. It also disables the ability to go online.
        // 
    */
    disabled: boolean;
};

export type SaveStatus = 'unsaved' | 'edited' | 'saving-draft' | 'saved-draft' | 'publishing' | 'published' | 'changed';

export type SaveHistory = { 
    hashId: string;
    savedAt: string;
    isDraft?: boolean;
}[];

export type PackiListenerSubscription = () => any;

export type SavedPacki = { 
    id: string;
    created: string;
    code?: string | PackiFiles;
    manifest: PackiManifest;
    history?: SaveHistory;
    isDraft?: boolean;
};

export type PackiManifest = { 
    name: string;
    description: string;
    sdkVersion?: SDKVersion;
};

export type PackiDefaults = { 
    name: string;
};

export type PackiWindowRef = { 
    current: Window | null;
};

export type PackiOptions = { 
    sdkVersion?: SDKVersion;
    name?: string;
    description?: string;
    mainIttf?: string;
    wizziSchema?: string;
    dependencies?: PackiDependencies;
    files?: PackiFiles;
    apiURL?: string;
    host?: string;
    verbose?: boolean;
    disabled?: boolean;
    codeChangesDelay?: number;
    user?: PackiUser;
    id?: string;
    webPreviewRef?: PackiWindowRef;
    packiProduction?: PackiProduction;
};

export type PackiSaveOptions = { 
    isDraft?: boolean;
    ignoreUser?: boolean;
    excludeFromHistory?: boolean;
};

export type PackiStateListener = (state: PackiState, prevState: PackiState) => any;

export type QueryInitParams = { 
    code?: string;
    sourceUrl?: string;
    name?: string;
    description?: string;
    dependencies?: string;
    files?: string;
    sdkVersion?: SDKVersion;
    iframeId?: string;
    waitForData?: 'boolean';
    saveToAccount?: 'true' | 'false';
};

export type QueryStateParams = { 
    preview?: 'true' | 'false';
    theme?: ThemeName;
    verbose?: 'true' | 'false';
    hideQueryParams?: 'true' | 'false';
};

export type QueryParams = QueryInitParams & QueryStateParams;

export type RouterData = { 
    type: "success";
    packi?: SavedPacki;
    defaults: PackiDefaults;
} | { 
    type: "error";
    error: { 
        message: string;
    };
    defaults: PackiDefaults;
};

export type PackiFilesOrKind = PackiFiles | string;

export type PackiProduction = 'artifact' | 'package' | 'meta' | 'tfolder';

export type PackiUploadPayload = { 
    name?: string;
    description?: string;
    mainIttf?: string;
    wizziSchema?: string;
    files?: PackiFiles;
};
