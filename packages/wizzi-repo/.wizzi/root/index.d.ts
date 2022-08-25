import {
    fSystem,
} from 'wizzi-utils';
type cb<T> = (err: any, result: T) => void;

/**
 * The json store types
 * FsJson: implements an in-memory set of documents organized in a tree of folders
 * FsJsonDocumentManager: wraps FsJson and exposes filesystem-like methods
 * FsJsonImpl: wraps FsJsonDocumentManager and implements the VFile interface
 */

/**
 * @interface FsJsonItemData
 * @description An item object (directory or file) of a JSON file system
 * @property _id               Object ID of the item
 * @property basename          The base name of the item filepath
 * @property parentId          Object ID of the parent item
 * @property dirname           Folder name of the item filepath
 * @property path              Item filepath
 * @property kind              Item kind: one-of 0 (directory), 1 (file)
*/
interface FsJsonItemData {
    _id: ObjectID;
    basename: string;
    parentId: ObjectID;
    dirname: string;
    path: string;
    kind: number;
}

/**
 * @interface FsJsonDocumentData
 * @description The text content of an item object (file) of a JSON file system
 * @property _id               Object ID of the item
 * @property content           Text content of the item
 * @property lastModified      Date of last modification of the content
*/
interface FsJsonDocumentData {
    _id: ObjectID;
    content: string;
    lastModified: Date;
}

type ObjectID = object;

interface FsJsonInsertResult {
    code: string;
    insertedId: ObjectID;
    insertedCount: number;
    item: FsJsonItemData;
}

interface FsJsonDeleteResult {
    code: string;
    deletedCount: number;
    ok: boolean;
}

interface FsJsonUpdateResult {
    code: string;
    updatedCount: number;
    item: FsJsonItemData;
}

interface FsJsonWriteResult {
    code: string;
    item: FsJsonItemData;
}

/**
 * @interface FsJson
 * @description A JSON file system database
 * @property items              Array of path infos (directories and files) of a JSON file system
 * @property documents          Array of content data (files) of a JSON file system 
 */
interface FsJson {
    items: FsJsonItemData[];
    documents: FsJsonDocumentData[];
    getItem(key: object, callback: cb<FsJsonItemData>): void;
    getItemById(id: ObjectID, callback: cb<FsJsonItemData>): void;
    getItemByPath(path: string, callback: cb<FsJsonItemData>): void;
    getItemByNameAndParent(name: string, parent: ObjectID, callback: cb<FsJsonItemData>): void;
    getItemChildren(parentId: ObjectID, callback: cb<FsJsonItemData[]>): void;
    insertItem(item: FsJsonItemData, callback: cb<FsJsonInsertResult[]>): void;
    updateItem(item: FsJsonItemData, callback: cb<FsJsonUpdateResult[]>): void;
    deleteItem(id: ObjectID, callback: cb<FsJsonDeleteResult[]>): void;
    readDocument(id: ObjectID, callback: cb<string>): void;
    writeDocument(id: ObjectID, content: string, callback: cb<FsJsonWriteResult>): void;
    toJson(callback: cb<JsonFsData>): void;
    toFiles(options: { removeRoot: string }, callback: cb<fSystem.FileDef[]>): void;
}

interface UploadedFileDef {
    relPath: string;
    dest: string;
    result: any;
}

interface FsJsonDocumentManager {
    fsdb: FsJson;
    createFolder(folderPath: string, callback: cb<any>): void;
    readFile(filePath: string, callback: cb<string>): void;
    writeFile(filePath: string, content: string, callback: cb<any>): void;
    exists(filePath: string, callback: cb<boolean>): void;
    deleteFile(filePath: string, callback: cb<any>): void;
    deleteFolder(folderPath: string, callback: cb<any>): void;
    copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    isFile(filePath: string, callback: cb<boolean>): void;
    isDirectory(folderPath: string, callback: cb<boolean>): void;
    getFiles(folderPath: string, options: fSystem.GetFilesOptions, callback: cb<fSystem.FileDef[]>): void;
    getFolders(folderPath: string, options: fSystem.GetFoldersOptions, callback: cb<fSystem.FolderDef[]>): void;
    glob(globExpr: string, options: fSystem.GlobOptions, callback: cb<fSystem.FileDef[]>): void;
    uploadFolder(sourcePath: string, destPath: string, callback: cb<UploadedFileDef[]>): void; 
}

/**
 * @interface JsonDocumentDto
 * @description Data of a single text file to load or retrieved from a JSON file system
 * @property path            The file path
 * @property content         The text content
 */
interface JsonDocumentDto {
    path: string;
    content: string;
}

/**
 * @interface JsonFsData
 * @description Contains two arrays of item objects (path info and content) of a JSON file system
 * @property items              Array of path infos (directories and files) of a JSON file system
 * @property documents          Array of content data (files) of a JSON file system 
 */
interface JsonFsData {
    items: FsJsonItemData[];
    documents: FsJsonDocumentData[];
}

export namespace JsonComponents {
    export function createFsJson(documents: JsonDocumentDto[], callback: cb<FsJson>): void;
    export function createDocumentManager(fsJsonDataOrFsJson: JsonFsData | FsJson): FsJsonDocumentManager;
    export function createJsonFsData(documents: JsonDocumentDto[], callback: cb<JsonFsData>): void;
    export function addToJsonFsData(fsJsonData: JsonFsData, documents: JsonDocumentDto[], callback: cb<object>): void;
}

export function jsonfile(options: { jsonFsData?: JsonFsData, fsJson?: FsJson }, callback: cb<fSystem.VFile>): void;

/**
 * The interface implemented by Wizzi Store Systems
 * @param storeKind            One of 'filesystem', 'mongodb', 'json'
 * @param storeUri             When storeKind == 'mongodb', the mongodb uri
 * @param storeBaseFolder      When storeKind == 'mongodb', the mongodb filesystem base folder (alternative to storeUri)
 * @param storeJsonFsData      When storeKind == 'json', a JsonFsData object to initialise the JSON file system
 */
interface CreateStoreFactoryOptions {
    storeKind: string;
    storeUri?: string;
    storeBaseFolder?: string;
    storeJsonFsData?: JsonFsData;
}

interface StoreInitOptions {
    storeUri?: string;
    storeBaseFolder?: string;
    jsonFsData? : JsonFsData,
    fsJson?: FsJson
}

/**
 * The interface implemented by Wizzi Store Systems
 */
interface Store {
    init(options: StoreInitOptions, callback: cb<fSystem.VFile>): void;
    documentExists(filePath: string, callback: cb<boolean>): void;
    getModelContent(filePath: string, callback: cb<string>): void;
}

type createStoreFn = (callback: cb<Store>) => void;

export function createStoreFactory(options: CreateStoreFactoryOptions, callback: cb<createStoreFn>): void;

interface FileInfo {
    name: string;
    basename: string;
    isIttfDocument: boolean;
    isFragment: boolean;
    schema: string;
    mime: string;
    relFolder: string;
    fullPath: string;
    destBasename: string;
    destRelPath: string;
}

export function fileInfoByPath(filePath: string, baseFolder: string): FileInfo; 
