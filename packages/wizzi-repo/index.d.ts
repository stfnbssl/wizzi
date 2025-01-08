import { fSystem } from '@wizzi/utils';
type cb<T> = (err: any, result: T|never) => void;

/**
 * The json store types
 * JsonFs: implements an in-memory set of documents organized in a tree of folders.
 *         Is the internal content manager of a json store system.
 * JsonFsDocumentManager: wraps JsonFs and exposes filesystem-like methods
 *                        Is an internal interface.
 * JsonFsImpl: wraps JsonFsDocumentManager and implements the VFile interface.
 *             Is the pubblic interface of the json store system.
 */

/**
 * @interface JsonFsItemData
 * @description An item object (directory or file) of a JSON file system (JsonFs)
 * @property _id               Object ID of the item
 * @property basename          The base name of the item filepath
 * @property parentId          Object ID of the parent item
 * @property dirname           Folder name of the item filepath
 * @property path              Item filepath
 * @property kind              Item kind: one-of 0 (directory), 1 (file)
*/
interface JsonFsItemData {
    _id: ObjectID;
    basename: string;
    parentId: ObjectID;
    dirname: string;
    path: string;
    kind: number;
}

/**
 * @interface JsonFsDocumentData
 * @description A text content of an item file object (kind = 1) of a JSON file system (JsonFs)
 * @property _id               Object ID of the item
 * @property content           Text content of the item
 * @property lastModified      Date of last modification of the content
*/
interface JsonFsDocumentData {
    _id: ObjectID;
    content: string;
    lastModified: Date;
}

type ObjectID = object;

interface JsonFsInsertResult {
    code: string;
    insertedId: ObjectID;
    insertedCount: number;
    item: JsonFsItemData;
}

interface JsonFsDeleteResult {
    code: string;
    deletedCount: number;
    ok: boolean;
}

interface JsonFsUpdateResult {
    code: string;
    updatedCount: number;
    item: JsonFsItemData;
}

interface JsonFsWriteResult {
    code: string;
    item: JsonFsItemData;
}

/**
 * @interface JsonFs
 * @description A JSON file system database
 * @property items              Array of path infos, directories and files (JsonFsItemData[])
 * @property documents          Array of content data files (JsonFsDocumentData[])
 */
interface JsonFs {
    items: JsonFsItemData[];
    documents: JsonFsDocumentData[];
    getItem(key: object, callback: cb<JsonFsItemData>): void;
    getItemById(id: ObjectID, callback: cb<JsonFsItemData>): void;
    getItemByPath(path: string, callback: cb<JsonFsItemData>): void;
    getItemByNameAndParent(name: string, parent: ObjectID, callback: cb<JsonFsItemData>): void;
    getItemChildren(parentId: ObjectID, callback: cb<JsonFsItemData[]>): void;
    insertItem(item: JsonFsItemData, callback: cb<JsonFsInsertResult[]>): void;
    updateItem(item: JsonFsItemData, callback: cb<JsonFsUpdateResult[]>): void;
    deleteItem(id: ObjectID, callback: cb<JsonFsDeleteResult[]>): void;
    readDocument(id: ObjectID, callback: cb<string>): void;
    writeDocument(id: ObjectID, content: string, callback: cb<JsonFsWriteResult>): void;
    toJson(callback: cb<JsonFsData>): void;
    toFiles(options: { removeRoot: string }, callback: cb<fSystem.FileDef[]>): void;
}

interface UploadedFileDef {
    relPath: string;
    dest: string;
    result: any;
}

interface JsonFsDocumentManager {
    fsdb: JsonFs;
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
    items: JsonFsItemData[];
    documents: JsonFsDocumentData[];
}

/**
 * @interface JsonFsImplOptions
 * @description Contains two arrays of item objects (path info and content) of a JSON file system
 * @property jsonFs          A JSON file system database
 * @property jsonFsData      Items and content of a JSON file system database (alternative to jsonFs)
 */
 interface JsonFsImplOptions {
    jsonFsData: JsonFsData;
    jsonFs: JsonFs;
}

/**
 * @interface JsonFsImpl
 * @description Implements the `fsimpl` interface for a json backed file system.
 *              It is used by repo/jsonDbStore that implements the json repo store.
 *              uses a json/DocumentManager instance to manage an in-memory json filesystem (JsonFs) 
*/
interface JsonFsImpl extends fSystem.FsImpl {
    jsonFs: JsonFs;
    docManager: JsonFsDocumentManager;
    init(options: JsonFsImplOptions, callback: cb<JsonFsDocumentManager>): void;
}

export namespace JsonComponents {
    export function createJsonFs(documents: JsonDocumentDto[], callback: cb<JsonFs>): void;
    export function createDocumentManager(jsonFsDataOrJsonFs: JsonFsData | JsonFs): JsonFsDocumentManager;
    export function createJsonFsData(documents: JsonDocumentDto[], callback: cb<JsonFsData>): void;
    export function addToJsonFsData(jsonFsData: JsonFsData, documents: JsonDocumentDto[], callback: cb<object>): void;
}

export function jsonfile(options: { jsonFsData?: JsonFsData, jsonFs?: JsonFs }, callback: cb<fSystem.VFile>): void;

export type StoreKind = 'filesystem' | 'mongodb' | 'json';

/**
 * The interface implemented by Wizzi Store Systems
 * @param storeKind            One of 'filesystem', 'mongodb', 'json'
 * @param storeUri             When storeKind == 'mongodb', the mongodb uri
 * @param storeBaseFolder      When storeKind == 'mongodb', the mongodb filesystem base folder (alternative to storeUri)
 * @param storeJsonFsData      When storeKind == 'json', a JsonFsData object to initialise the JSON file system (alternative to jsonFs) 
 * @param storeJsonFs          When storeKind == 'json', a JsonFs object to initialise the JSON file system (alternative to jsonFsData) 
 */
interface CreateStoreFactoryOptions {
    storeKind: StoreKind;
    storeUri?: string;
    storeBaseFolder?: string;
    storeJsonFsData?: JsonFsData;
    storeJsonFs?: JsonFs;
}

/**
 * @type StoreInitOptions
 * @member storeUri          When storeKind == 'mongodb', the mongodb uri
 * @member storeBaseFolder   When storeKind == 'mongodb', the mongodb filesystem base folder (alternative to storeUri)
 * @member jsonFsData        When storeKind == "json", JsonFsData instance (alternative to jsonFs) 
 * @member jsonFs            When storeKind == "json", JsonFs instance (alternative to jsonFsData)
*/
type StoreInitOptions = {
    storeUri?: string;
    storeBaseFolder?: string;
    jsonFsData? : JsonFsData,
    jsonFs?: JsonFs
}

/**
 * The interface implemented by Wizzi Store Systems
 */
interface Store {
    init(options: StoreInitOptions, callback: cb<fSystem.VFile>): void;
    documentExists(filePath: string, callback: cb<boolean>): void;
    getModelContent(filePath: string, callback: cb<string>): void;
}

export type createStoreFn = (callback: cb<Store>) => void;

export function createStoreFactory(options: CreateStoreFactoryOptions, callback: cb<createStoreFn>): void;