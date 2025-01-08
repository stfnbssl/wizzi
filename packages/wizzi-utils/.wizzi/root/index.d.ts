type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

/**
 * The fSystem Feature
 */
 export namespace fSystem {
    export interface FileDef {
        fullPath: string;
        relPath: string;
        content?: string;
    }
    
    export interface FolderDef {
        fullPath: string;
        relPath: string;
        documents?: FileDef[];
    }
    
    export interface GetFilesOptions {
        deep: boolean;
        extension?: string;
        documentContent?: boolean;
    }
    
    export interface GetFoldersOptions {
        deep: boolean;
        tFoldersOnly?: string;
        documentNames?: boolean;
    }
    
    export interface GlobOptions {
        removeRoot?: string;
    }
    
    export interface VFile {
        mkdir(folderPath: string, callback: cb<any>): void;
        read(filePath: string, callback: cb<string>): void;
        write(filePath: string, content: string, callback: cb<any>): void;
        exists(filePath: string, callback: cb<boolean>): void;
        unlink(filePath: string, callback: cb<any>): void;
        deleteFolder(folderPath: string, callback: cb<any>): void;
        copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
        moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
        copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
        moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
        moveFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
        rename(oldPath: string, newPath: string, callback: cb<any>): void;
        isFile(filePath: string, callback: cb<boolean>): void;
        isDirectory(folderPath: string, callback: cb<boolean>): void;
        getFiles(folderPath: string, options: GetFilesOptions, callback: cb<FileDef[]>): void;
        getFolders(folderPath: string, options: GetFoldersOptions, callback: cb<FolderDef[]>): void;
        glob(globExpr: string, options: GlobOptions, callback: cb<FileDef[]>): void;
    }
    
    export interface VFileFS {
        // Sync
        mkdir(folderPath: string): any;
        read(filePath: string): string;
        write(filePath: string, content: string): any;
        exists(filePath: string): boolean;
        unlink(filePath: string): any;
        // NOT IMPLEMENTED deleteFolder(folderPath: string): any;
        copyFile(fromFile: string, toFile: string): any;
        // NOT IMPLEMENTED copyFolder(fromFolder: string, toFolder: string): any;
        // NOT IMPLEMENTED moveFile(fromFile: string, toFile: string): any;
        // NOT IMPLEMENTED moveFolder(fromFolder: string, toFolder: string): any;
        isFile(filePath: string): boolean;
        isDirectory(folderPath: string): boolean;
        getFiles(folderPath: string, options: GetFilesOptions): FileDef[];
        getFolders(folderPath: string, options: GetFoldersOptions): FolderDef[];
        glob(globExpr: string, options?: GlobOptions): FileDef[];
        splitLines(text: string): string[];
        // Async
        mkdir(folderPath: string, callback: cb<any>): void;
        read(filePath: string, callback: cb<string>): void;
        write(filePath: string, content: string, callback: cb<any>): void;
        exists(filePath: string, callback: cb<boolean>): void;
        unlink(filePath: string, callback: cb<any>): void;
        deleteFolder(folderPath: string, callback: cb<any>): void;
        copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
        moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
        copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
        moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
        isFile(filePath: string, callback: cb<boolean>): void;
        isDirectory(folderPath: string, callback: cb<boolean>): void;
        getFiles(folderPath: string, options: GetFilesOptions, callback: cb<FileDef[]>): void;
        getFolders(folderPath: string, options: GetFoldersOptions, callback: cb<FolderDef[]>): void;
        glob(globExpr: string, options: GlobOptions, callback: cb<FileDef[]>): void;
        openWrite(filepath: string, callback: cb<any>): void;
    }
    
    interface ParsedUri {
        storeKind: string;
        userId: string;
        projectId: string;
        path: string;
        basename: string;
        extension: string;
        isIttfDocument: boolean;
    }
    
    export function uriParser(uri: string): ParsedUri;
    
    export function vfile(): VFileFS;
    
    interface FsImpl {
        stat(path: string, callback: cb<object>): any;
        // TODO and many others
    }
    
    export function vfile(fsImpl: FsImpl): VFileFS;
    
    interface VFileOptions {
        storeName?: string;
    }
    
    export function vfile(options: VFileOptions, callback: cb<VFile>): void;
    
    export interface FileInfo {
        name: string;
        basename: string;
        extension: string;
        isIttfDocument: boolean;
        isFragment: boolean;
        schema: string;
        relFolder: string;
        fullPath: string;
        destBasename: string;
        destRelPath: string;
        seedName: string;
    }
    export function fileInfoByPath(filePath: string, baseFolder?: string): FileInfo; 
 }

/**
 * The ITTF Graph Feature
 * This feature try to represent the fragments graph of ITTF Documents,
 * extracting raw representations of ITTF Nodes,
 * before the evaluation of Template commands and JsWizzi expressions.
 * This feature is used by the ITTF Scan Feature
 */
export namespace ittfGraph {
    /**
     * Single bread crumb of a filepath
     */
    interface BreadCrumb {
        uri: string;
        name: string;
        isLast: boolean;
    }
    /**
     * Raw content and ITTF Pretty content of an ITTF Source Unit.
     */
    interface IttfDocumentContent {
        content: string;
        pretty: string;
    }
    /**
     * Represents an ITTF Fragment, for the ITTF Scan Feature
     * TODO manage fragments mixed or included by this fragment
     */
    export interface IttfMTreeFragment {
        id: string;
        oper: string;
        name: string;
        uri: string;
        baseUri: string;
        relUri: string;
        hash: string;
        ittfContent: string;
        ittfPretty: string;
    }
    /**
     * Represents the structure of the ITTF Source Units of an ITTF Document,
     * once mixed and included fragments are fully resolved in depth, for the ITTF Scan Feature.
     */
    export interface IttfMTreeState {
        id: string;
        primaryPath: string;
        primaryUri: string;
        breadCrumbs: BreadCrumb[];
        primaryHash: string;
        primaryIttf: IttfDocumentContent;
        mTree: ittfGraph.IttfDocumentGraph;
        fragments: IttfMTreeFragment[];
        ittfReferences: IttfMTreeReference[];
        errorFragments: IttfMTreeFragmentError[];
    }
    /**
     * TODO Represents a reference to ???
     */
    export interface IttfMTreeReference {
        id: string;
        oper: string;
        name: string;
        uri: string;
        baseUri: string;
        relUri: string;
        documentState: IttfMTreeState,
    }
    export interface IttfMTreeFragmentError extends IttfMTreeFragment {
        message: string;
    }
    /**
     * Represents an ITTF Node, for the ITTF Scan Feature
     */
    export interface IttfMTreeExNode {
        name: string;
        value: string;
        children: IttfMTreeExNode[];
    }
    /**
     * Represents a not yet processed mTree of an ITTF Document, for the ITTF Scan Feature.
     * Contains the fragments structure and the raw content of ITTF Nodes.
     * But Template Commands and JsWizzi expressions are not evaluated.
     */
    export interface IttfDocumentGraph extends IttfMTreeExNode {
        fragments: IttfMTreeFragment[];
        ittfReferences: IttfMTreeReference[];
        errorFragments: IttfMTreeFragmentError[];
    }
    export interface CreateDocumentGraphOptions {
        fromString: boolean,
        clean: boolean
    }
    export function createIttfDocumentGraphFrom(
        mTreeOrFilepathOrContent: string | object, 
        options: CreateDocumentGraphOptions, 
        callback: cb<IttfDocumentGraph>
        ): void;
}

/**
 * The ITTF Scanner Feature
 */
export namespace ittfScanner {
    interface FolderScanOptions {
        /**
        * the name of the 'wzpackage' ITTF Document that
        * will be generated from this folder
        */
        name: string;
        /**
        * the base path to the 'main' generated artifact
        */
        gitPath?: string;
        /**
        * the Virtual Store System used for scanning the folder
        * default: filesystem
        */
        file?: fSystem.VFileFS;
    }
    interface IttfDocumentScannerOptions {
        rootFolder: string;
        baseIdCounter?: number;
        /**
        * the Virtual Store System used for scanning the folder
        * default: filesystem
        */
        file?: fSystem.VFileFS;
    }
    interface TextDocumentScannerOptions {
        /*
        * the Virtual Store System used for scanning the folder
        * default: filesystem
        */
        file?: fSystem.VFileFS;
    }
    /**
     * Folder or document item of a folder scanned by ittfScanner.browseFolder
     */
    interface FsItem {
        isFolder?: boolean;
        /**
         * dirname + '/' + basename
         */
        uri: string;
        /**
         * without extension
         */
        name: string;         
        /**
         * name + '.' + mime
         */
        basename?: string;    
        dirname: string;
        isIttfDocument?: boolean;
        /**
         * when true then isIttfDocument == true
         */
        isFragment?: boolean; 
        /**
         * Wizzi Schema of document == 'wfschema'
         */
        isSchema?: boolean;   
        /**
         * Wizzi Schema of document == 'wzjob'
         */
        isJob?: boolean; 
        /**
         * Wizzi Schema, when isIttfDocument == true
         */
        schema?: string;      
        /**
         * extension without dot '.'
         */
        mime?: string;        
        hash?: string;
        content?: string;
    }
    /**
     * Result of a folder scanned by ittfScanner.browseFolder
     */
    interface FolderBrowseResult {
        folderPath: string;
        folderUri: string;
        breadCrumbs: ittfGraph.BreadCrumb[];
        fsitems: FsItem[];
    }
    interface FolderBrowseOptions {
        rootFolder?: string;
        /*
        * the Virtual Store System used for scanning the folder
        * default: filesystem
        */
        file?: fSystem.VFileFS;
    }
    export function scanFolder(
        folderPath: string, 
        options: FolderScanOptions, 
        callback: cb<ittfGraph.IttfDocumentGraph>
        ): void;
    export function scanIttfDocument(
        folderPath: string, 
        options: IttfDocumentScannerOptions, 
        callback: cb<ittfGraph.IttfDocumentGraph>
        ): void;
    export function scanTextDocument(
        documentPath: string, 
        options: TextDocumentScannerOptions, 
        callback: cb<ittfGraph.IttfDocumentGraph>
        ): void;
    export function browseFolder(
        folderPath: string, 
        options: FolderBrowseOptions, 
        callback: cb<FolderBrowseResult>
        ): void;
}

/**
 * The Meta Feature
 */
interface MetaOptions {
    destFolder: string;
    depth: number;
    compressFolders: [string];
}
export namespace meta {
    export function metify(folderPath: string, rootFolder: string, metaProductionName: string, options: MetaOptions, callback:cb<string>): void;
}

/**
 * The Pretty Feature
 */
export namespace pretty {
    export function prettifyIttfHtml(rootNode: ittfGraph.IttfDocumentGraph, callback:cb<string>): void;
    export function prettifyIttfHtmlFromString(ittfContent: string, callback:cb<string>): void;
}

/**
 * The Packi Feature
 */
export interface PackiToFsOptions {
    file: fSystem.VFile
}
export namespace packi {
    export const filePrefix = "json:/";
    /**
     * @type PackiFile
     * @description The content of a file included in a PackiFiles object
     * @type File type. For now "CODE" only is managed.
     * @contents The file content (textual data).
     * @generated If the file content is an IttfDocument may contain the generated artifact.
     * @error The error object
    */
    export type PackiFile = {
        type: 'CODE';
        contents: string;
        generated?: boolean;
        error?: Error;
    }
    /**
     * @type PackiFiles
     * @description Contains a file system in an object. The key is the path name and the value is a PackiFile
    */
    export type PackiFiles = {
        [path: string]: PackiFile;
    }

	export function ensurePackiFilePrefix(filePath: string) : string;
    export function packiFilesToFs(folderPath: string, packiFiles: PackiFiles, options: any, callback: cb<any>) : void;
}

/**
 * The Crypto Feature
 */
 export namespace crypto {
    export function encrypt(text: string): string;
    export function decrypt(text: string): string;
    export function encryptSimple(text: string): string;
    export function decryptSimple(text: string): string;
}

/**
 * The Helpers Feature
 */
export namespace helpers {
    export namespace fail {
        export function fatal(e: any, errCode?: number): void;
        export function warn(e: any, errCode?: number): void;
    }
    export namespace node {
        type Node = {
            name: string;
            value: string;
            children: Node[];
        }
        type Lines = {
            text: string;
            lines: string[];
        }
        type LinesOptions = {
            singleLine: boolean;
        }
        export function nodeToTextLine(node: Node): string;
        export function inlinedTextToTextLines(text: string, options?: LinesOptions): Lines;
        export function replace(item: Node, replacers: Node[]): void;
        export function remove(item: Node): void;
    }
    export namespace lineParser {
        type ParsedLine = {
            name(): string;
            value(): string;
            hasValue(): boolean;
        }
        export function parseNameValueRaw(text: string): ParsedLine;
    }
    type RequireOptions = {
        appendPaths?: string[];
        prependPaths?: string[];
    }
    export function requireFromString(code: string, filename: string, options?: RequireOptions): any;
    export namespace regexpExt {
        export function getAllRegExp(regexp: RegExp): RegExp;
        export function namedRegExp(regexp: RegExp): RegExp;
    }
    export namespace textIndentParser {
        interface IndentedLine {
            indent: number;
            content: string;
        }
        export function parse(textContent: string): IndentedLine[];
    }
}

/**
 * The Errors Feature
 */
 export namespace errors {
    interface WizziModelDOMNodeError {
        message: string;
    }
}

/**
 * Options for lorem text generation
 */
 interface LoremOptions {
    count: number;
    sentenceLowerBound?: number;
    sentenceUpperBound?: number;
    paragraphLowerBound?: number;
    paragraphUpperBound?: number;
    htmlTag?: string;
    suffix?: string;
}
export function lorem(options: LoremOptions): string;

/**
 * Return value of the verify.parseNameValue() function
 */
interface ParseNameValueReturn {
    name(): string;
    value(): string;
    hasValue(): boolean;
}

/**
 * Helper functions
 */
export namespace verify {
    export function startsWith(text: string, prefix: string): string;
    export function endsWith(text: string, suffix: string): string;
    export function unquote(text: string): string;
    export function capitalize(text: string): string;
    export function dashToCamelCase(text: string): string;
    export function escapeRegExp(text: string): string;
    export function htmlEscape(text: string): string;
    export function resolveToString(value: any): string;
    export function makeInline(text: string): string;
    export function unixifyPath(text: string): string;
    export function replaceAll(text: string, find: string, repl: string): string;
    export function isDefined(test?: any): boolean;
    export function isUndefined(test?: any): boolean;
    export function isDefined(test?: any): boolean;
    export function isNullOrUndefined(test?: any): boolean;
    export function isString(test?: any): boolean;
    export function isEmpty(text?: any): boolean;
    export function isNotEmpty(text?: any): boolean;
    export function isNumber(test?: any): boolean;
    export function isBoolean(test?: any): boolean;
    export function isDate(test?: any): boolean;
    export function isPrimitive(test?: any): boolean;
    export function isObject(test?: any): boolean;
    export function isArray(test?: any): boolean;
    export function isArrayOrObject(test?: any): boolean;
    export function isFunction(test?: any): boolean;
    export function isRegExp(test?: any): boolean;
    export function isError(test?: any): boolean;
    export function isAbsolutePath(test?: any): boolean;
    export function isIttfMacro(test?: any): boolean;
    export function isSingleQuoteLiteral(test?: any): boolean;
    export function isDoubleQuoteLiteral(test?: any): boolean;
    export function isCssLength(test?: any): boolean;
    export function isEmail(test?: any): boolean;
    export function isEmails(test?: any): boolean;
    export function isMinLength(test: any, length: number): boolean;
    export function isMaxLength(test: any, length: number): boolean;
    export function isExactLength(test: any, length: number): boolean;
    export function isGreaterThan(value: any, test: any): boolean;
    export function isLessThan(value: any, test: any): boolean;
    export function isGreaterEqualThan(value: any, test: any): boolean;
    export function isLessEqualThan(value: any, test: any): boolean;
    export function isAlpha(value: any): boolean;
    export function isAlphaNumeric(value: any): boolean;
    export function isIp(value: any): boolean;
    export function isBase64(value: any): boolean;
    export function isUrl(value: any): boolean;
    export function isGreaterThanDate(value: any, date: any): boolean;
    export function isLessThanDate(value: any, date: any): boolean;
    export function isGreaterEqualDate(value: any, date: any): boolean;
    export function isLessEqualDate(value: any, date: any): boolean;
    export function escapeQuotes(text?: any): string;
    export function splitLines(text?: any, options?: { numbered: boolean }): string;
    export function stripIttfExtension(path_string: any): string;
    export function stripExtension(path_string: string): string;
    export function replaceExtension(path_string: string, newExtension: string): string;
    export function parseNameValue(text: string, node?: any, options?: { objectProperty: boolean }): ParseNameValueReturn;
    export function convert(value: any, type: string, unquote?: boolean): any;
    export function canConvert(value: any, type: string): boolean;
    export function fatal(err: any, errcode?: number): void;
    export function loginfo(msg: string): void;
    export function logwarn(msg: string): void;
    export function logerror(msg: string): void;
    export function dumpStack(err: any): void;
}