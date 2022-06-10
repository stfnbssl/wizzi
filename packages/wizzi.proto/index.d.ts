type cb<T> = (err: any, result: T) => void;

type PackiCodeFile = { 
    type: 'CODE';
    contents: string;
    generated?: boolean;
    bothRealAndGenerated?: boolean;
    error?: Error;
};        

type PackiAssetFile = { 
    type: 'ASSET';
    contents: string | File | Blob | FormData;
    generated?: boolean;
    bothRealAndGenerated?: boolean;
    error?: Error;
};

type PackiFile = PackiCodeFile | PackiAssetFile;

type PackiFiles = { 
    [path: string]: PackiFile;
};

type Packi = {
    owner: string,
    name: string,
    mainIttf: string,
    packiFiles: PackiFiles,
    dependencies: [string]
}

type Dependency = {
    owner: string,
    name: string,
    packiFiles: PackiFiles,
}

type TransformationResult = { 
    sourcePath: string, 
    modelTransformer: string
    transformResult: any
}

type GenerationResult = { 
    content: string,
    contentLength: number,
    contentType: string
}

type UserActivity = { 
    openPackies: [string],
    openFiles: [string]
}

type UserActivityUpdate = { 
    openPacki: string,
    openFile: string
}

type LastPackiActivity = { 
    found: Boolean,
    packiItemId: string,
    owner: string,
    name: string,
    selectedFile: string,
    packiFiles: PackiFiles,
    mainIttf: string,
    wizziSchema: string,
}

/**
* Start the api
*/
export function start(
    defaultOwner: string, defaultContext: any, callback: cb<void>
): void;

/**
* Get the packies of an user.
*/
export function getPackiList(
    defaultOwner: string
): Promise<[Packi]>;

/**
* Get a packi ready for productions, with its dependencies resolved.
*/
export function getPacki(
    defaultOwner: string, name: string
): Promise<[Packi]>;

/**
* Get a packi object by id, with its dependencies not resolved.
*/
export function getPackiItem_Object_By_Id(
    id: string
): Promise<[Packi]>;

/**
* Get a packi object by owner and name, with its dependencies not resolved.
*/
export function getPackiItem_Object_By_Owner_Name(
    defaultOwner: string, name: string
): Promise<[Packi]>;

/**
* Save a packi (Insert or update).
*/
export function savePacki(
    owner: string, name: string, wizziSchema: string, mainIttf: string, packiFiles: PackiFiles
): Promise<any>;

/**
* Get a packi context.
*/
export function getDefaultContext() : any;

/**
* Get a packi context.
*/
export function getPackiContext(
    owner: string, queryContext?: string, defaultContext: any
): Promise<Object>;

/**
* Apply a wizzi transformation to a packi and get the transformed object.
*/
export function getPackiTransformation(
    owner: string, name: string, context: any, transformerName: string
): Promise<TransformationResult>;

/**
* Apply a wizzi generation to a packi and get the generated code string.
*/
export function getPackiGeneration(
    owner: string, name: string, context: any
): Promise<GenerationResult>;

/**
* Get the activities of an user
*/
export function getUserActivity(
    userid: string
): Promise<UserActivity>;

/**
* Save (Update) the activities of an user.
*/
export function saveUserActivity(
    userid: string, items: UserActivityUpdate
): Promise<void>;

/**
* Get the last activities of an user on a packi.
*/
export function getLastPackiActivity(): Promise<LastPackiActivity>;

/**
* Validate a new username
*/
export function validateUsername(username: string): Promise<any>;

/**
* Validate that an username and an email are not used
*/
export function validateUserNotUsed(username: string, email: string): Promise<any>;

/**
* Get an existing user by the profile of a github signon
*/
export function getUserByGithubLogin(profile: any): Promise<any>;

/**
* Save a new user from the profile of a github signon
*/
export function saveUserFromGithubLogin(username: string, profile: any): Promise<any>;

