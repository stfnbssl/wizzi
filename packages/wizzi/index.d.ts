import { packi } from '@wizzi/utils';
import { JsonFsData, JsonFs } from '@wizzi/repo';
type cb<T> = (err: any, result: T|never) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

export const costants: {
    packiFilePrefix: string,
    packiFilePrefixExtract: string,
    metaProductionTempFolder: string,
    metaProductionWizziFolder: string
};

/**
 * Parsed line of an ittf document.
 */
declare interface MTreeBrickLine {
    indent: number;
    name: string;
    value: string; // always trimmed
    row: number;
    col: number;
    sourceKey: string;
    tagSuffix?: string; // undefined; || '(',
    hasMacro: boolean;
}

/**
 * Nodified parsed line of an ittf document.
 */
declare interface MTreeBrickNode extends MTreeBrickLine {
    parent: MTreeBrickNode;     // parent mTreeBrick
    model: MTreeBrick;          // the mTreeBrick to which the node belongs
    children: MTreeBrickNode[]; // the children mTreeBricks
    id: number;                 // unique id
}

/**
 * The parsed tree of an ittf document.
 */
declare interface MTreeBrick {
    uri: string;                       // The location of the source IttfDocument.
    schema: string;                     // The source IttfDocument schema.
    loadHistory: WizziModelLoadHistory; // The loadHistory object
    lines: MTreeBrickLine[];           // parsed lines of source text
    nodes: MTreeBrickNode[];           // nodified lines of source text
    sourceKey: string;                 // key of the source info of the IttfDocument
    brickKey: string;                  // key of the cloned mTreeBrick
    // these are set by the mixer, on the cloned object
    mixed: boolean;                    // true if has been mixed
    $mixerBrickKey: string;            // the brickKey of the mTreeBrick of the calling node (mixer)
    $args: string;                     // the node-value of the mixer node
    $argArray: string[]                // the $arg array of the mixer node
    // these are set by the nodifier on the original mtree, then cloned
    $params: string;                   // the node-value of the $params node, if declared
}

/**
 * An history object containing the text source of an ittf document.
 */
declare interface IttfDocumentData {
    ittfDocumentUri: string;
    sourceKey: string;
    content: string;
}

/**
 * An history object containing the parsed tree of an ittf document.
 */
declare interface MTreeBrickData {
    ittfDocumentUri: string;
    schema: string;
    sourceKey: string;
    brickKey: string;
    mTreeBrick: MTreeBrick;
}

/**
 * The container of all the parsed ittf documents that compose an MTree.
 */
declare interface WizziModelLoadHistory {
    ittfDocumentDatas: Readonly<string, IttfDocumentData>;
    mTreeBrickDatas: Readonly<string, MTreeBrickData>;
    getIttfDocumentContent(sourceKey: string): string;
    getSourceKey(ittfDocumentUri: string): string;
}

/**
 * The node of the builded final tree. See the [[MTree]] interface.
 */
declare interface MTreeNode {
    // The value of the source ittf node name
    n: string;
    // The value of the source ittf node value
    v: string;
    // The source ittf node row position
    r: number;
    // The source ittf node name column position
    c: number;
    /* The key of the ittfDocumentData of the ittf source document
        to which this node belongs. The ittfDocumentData object
        can be retrieved, with this key, from the wizzi-mtree.mTree.loadHistory object, 
        available as a property of the wizzi-mtree.mTree.*/
    s: string;
    /* The key of the mTreeBrick to which this node belongs.
        The mTreeBrick object can be retrieved, with this key, from the 
        wizzi-mtree.mTree.loadHistory object, available as a property 
        of the wizzi-mtree.mTree.*/
    u: string;
    // Children nodes
    children: MTreeNode[];
}

/**
 * The builded final tree, after composition and template processing.
 */
declare interface MTree {
    uri: string;
    $schema: string;
    loadHistory: WizziModelLoadHistory;
    nodes: MTreeNode[];
}

/**
 * Source map of an element of a Wizzi Model.
 */
declare interface SourceLineInfo {
    row: number;
    col: number;
    sourceKey: string;
}

/**
 * Context object used during validation and initialization of a Wizzi Model.
 */
declare interface WizziModelLoadContext {
    validationErrors: string[];
    schemaIsValid(): boolean;
    addError(message: string, node?: WizziModelElement): void;
    verifyEnum(
        valueType: string, valueName: string, value: string, allowed: string[], node?: WizziModelElement
    ): void
}

/**
 * The root element of a Wizzi Model.
 */
declare interface WizziModelRoot extends WizziModelElement {
    loadHistory: WizziModelLoadHistory;
}

/**
 * An element of a Wizzi Model.
 */
declare interface WizziModelElement {
    wzTag: string;
    wzName: string;
    wzElement: string;
    wzSourceLineInfo: SourceLineInfo;
    wzRoot(): WizziModelRoot;
    wzSourceFilepath(): string;
    wzVerify(ctx: WizziModelLoadContext): void;
    wzInitialize(ctx: WizziModelLoadContext): void;
}

/**
 * A Wizzi Model.
 */
declare interface WizziModel extends WizziModelElement { }


/**
 * WIZZI FACTORY CREATION
 */

/**
 * Supported repository kinds for ittf document sources and artifacts persistence.
 */
type StoreKind = "filesystem" | "mongodb" | "json" | "browserfs";


/**
 * Repository config options. 
 * A Wizzi Factory instance may have one single repository.
 */
type RepositoryOptions = {
    storeKind: string;
    storeUri?: string;
    storeBaseFolder?: string;
    storeJsonFs?: JsonFs;
}

/**
 * JSON repository config options. 
 * A Wizzi Factory instance may have one single repository.
 */
 type JSONRepositoryOptions = {
    storeKind: string;
    storeJsonFs?: JsonFs;
}

/**
 * Required plugins.
 * The pluginsBaseFolder option is for local plugins.
 */
type PluginsOptions = {
    items: string[];
    pluginsBaseFolder?: string;
}

/**
 * No filesystem meta plugins, implemented with json objects,
 * that can be built in memory or retrieved from a database.
 */
type InMemoryMetaPluginOptions = {
    name: string;
    pluginMetaProductions: [MetaProvidesProduction];
    metaPackiFiles: packi.PackiFiles;
}

/**
 * Required plugins.
 * The metaPluginsBaseFolder option is for local plugins.
 */
type MetaPluginsOptions = {
    items: string[];
    metaPluginsBaseFolder?: string;
    inMemoryItems?: [InMemoryMetaPluginOptions];
}

/**
 * Options parameter for testing the wizzi factory.
 */
type FactoryTestOptions = {
    testOnlyMockBaseDir?: string;
    dumps?: {
        dumpsBaseFolder: string;
        mTreeBuildUpJsWizziScript: {
            dump?: boolean;
        }
    };
}

/**
 * The wizzi factory configuration object
 */
type FactoryOptions = {
    repo: RepositoryOptions;
    plugins: PluginsOptions;
    metaPlugins?: MetaPluginsOptions;
    globalContext?: object;
    test?: FactoryTestOptions;
}

/**
 * The JSON wizzi factory configuration object
 */
 type JSONFactoryOptions = {
    jsonFs: JsonFs;
    plugins: PluginsOptions;
    metaPlugins?: MetaPluginsOptions;
    globalContext?: object;
    test?: FactoryTestOptions;
}

/**
 * Creates a wizzi factory.
 */
export function createFactory(options: FactoryOptions, callback: cb<WizziFactory>): void;
export function fsFactory(options: FactoryOptions, callback: cb<WizziFactory>): void;
export function jsonFactory(options: JSONFactoryOptions, callback: cb<WizziFactory>): void;

/**
 * WIZZI FACTORY PRODUCTION MANAGER
 */

type ArtifactOptions = {
    // TODO basedir should not to be here
    basedir: string;
    isDebug?: boolean,
    CRLF?: string,
    indentSpaces?: number,
    dotgExtensionPrefix?: boolean,
    dumps?: object,
}

interface CodeLine {
    containsFilePath?: boolean,
    text: string[],
    indentValue: number,
    options: ArtifactOptions,
}

interface CodeBlock {
    lines: CodeLine[];
    options: ArtifactOptions,
    indentValue: number,
    currentline?: CodeLine,
}

interface GenContext {
    block: CodeBlock;
    values: object;
    isEmpty: boolean;
    artifactGenerationErrors: object[],
    wizziFactory: WizziFactory,
}

interface ModelInfo {
    id: string;
    config: object;
    schema: string;
    format?: string;
    isCompile: boolean;
    contexts?: object[];
    transformers?: string[];
    coll?: object;
    exportName?: string;
    generatorRequireContextOnly: boolean;
}

type ArtifactDestFolder = {
    baseFolder: string;
    folder: string;
    extension: string;
}

type ArtifactDestPath = {
    path?: string;
    extension: string;
}

interface ArtifactConfig {
    // from wfjob.artifact.wzName
    name: string;
    options: ArtifactOptions;
    model: {
        cwd: string,     // from wfjob.line.cwdFolder
        src: string,     // from wfjob.artifact.src
        ignore?: string,  // from wfjob.artifact.ignore
        schema: string,  // from wfjob.artifact.schema
        contexts?: object[],
        transformers?: string[], // from wfjob.artifact.transformers
    },
    contexts?: object[],
    isWfJob?: boolean, // from wfjob.artifact.isWfJob
    gen: {
        generator: string, // from wfjob.artifact.generator
    },
    dest: ArtifactDestPath | ArtifactDestFolder
}

interface ArtifactInfo {
    name: string;
    options: ArtifactOptions;
    modelInfo: ModelInfo;
    contextInfos: object[],
    transformers: string[],
    gen: {
        generator: string,
    },
    dest: ArtifactDestPath | ArtifactDestFolder,
    isWfJob?: boolean, // from wfjob.artifact.isWfJob
    isWfModelType?: boolean, // from wfjob.artifact.isWfJob
    genContexts: GenContext[],
}

interface PManJobRequest {
    wfjob: {
        ittfDocumentUri: string,
    }
}

interface PManPersistResult {
    oper: string;
    item: {
        filepath: string,
    };
    status: string;
}

interface ProductionContext {
    evaluationContext: {[key: string]: any}
}

interface ProductionManager {
    productionContext: ProductionContext;
    wizziFactory: WizziFactory;
    addArtifactRequest(request: ArtifactConfig): void;
    addJobRequest(jobRequest: PManJobRequest): void;
    run(callback: cb<ArtifactInfo[]>): void;
    persistToFile(callback: cb<PManPersistResult[][]>): void;
    terminate(): void;
}

export function createProductionManager(options?: ProductionOptions, globalContext?: object): ProductionManager;

/**
 * WIZZI FACTORY OPERATIONS
 */

/**
* The configuration of the loading of a complex Wizzi Model.
*/
type ModelLoadConfig = {
    src: string;
    cwd: string;
    schema: string;
    format?: string;
    exportName?: string;
    contexts: ModelLoadConfig[];
    transformers: string[];
}

/**
* @type ModelFormatOptions
* @description               The required result format of a loaded Wizzi Model.
* @property ittfSources      If true returns not the Wizzi Model but its ittf source documents.

*/
type ModelFormatOptions = {
    ittfSources: boolean;
}

/**
* @type ModelLoadContext
* @description A Wizzi Model Loading context.
* @property mTreeBuildUpContext     The loading context object, a Wizzi Model or POJO
* @property formatOptions           Loading options
*/
type ModelLoadContext = {
    mTreeBuildUpContext?: object;
    formatOptions?: ModelFormatOptions;
}

/**
* An artifact generation context.
*/
type GenerationContext = {
    modelRequestContext?: {
        mTreeBuildUpContext?: {}
    };
    artifactRequestContext?: {};
}

/**
* An artifact generation context.
*/
type TransformationContext = {
    // This become the mTreeBuildUpContext of the ModelLoadContext
    modelRequestContext?: {};
    transformRequestContext?: {};
}

/**
* Job dump options.
*/
/**
 * @type DumpsOptions
 * @description Wizzi Job mTreeBuildUpJsWizziScript options
 * @property dump     The mTreeBuildUpJsWizziScript should be dumped
*/
type mTreeBuildUpJsWizziScriptOptions = {
    dump: boolean;
}
/**
* Job dump options.
*/
/**
 * @type DumpsOptions
 * @description Wizzi Job dumps options
 * @property dumpsBaseFolder            The folder path for dumps
 * @property mTreeBuildUpJsWizziScript  Optional. Not implemented yet
*/
type DumpsOptions = {
    dumpsBaseFolder: string;
    mTreeBuildUpJsWizziScript: mTreeBuildUpJsWizziScriptOptions;
}

/**
* Job production options.
*/
/**
 * @type ProductionOptions
 * @description Wizzi Job production options
 * @property indentSpaces      Optional. Default: 4. The number of spaces of one indentation in a generated artifact
 * @property basedir           Optional. Not implemented yet
 * @property verbose           Optional. Not implemented yet
 * @property dumps             Optional. Job dump options
*/
type ProductionOptions = {
    indentSpaces?: number;
    basedir?: string;
    verbose?: number;
    dumps?: DumpsOptions;
}

/**
 * @type JobRequest
 * @description Wizzi Job request options
 * @property name               The name of the Wizzi Job, for trace purposes.
 * @property path               The path to the ITTF Document of the Wizzi Job definition.
 * @property wfjobModel         Wizzi model, built programmatically or previously loaded.
 *                              Is alternative to the `path` property. 
 * @property globalContext      A global context object for all the productions of the Wizzi Job.
 * @property productionOptions  A ProductionOptions object.
*/
type JobRequest = {
    name: string;
    path?: string;
    wfjobModel?: WizziModel;
    globalContext?: object;
    productionOptions: ProductionOptions;
}

/**
 * @type JsonFactoryOptions
 * @description JSON Wizzi Factory creation request object (request to en existing istance of a WizziFactory)
 * @property jsonFsData        A JsonFsData object
 * @property globalContext     A global context object for all the productions of the created factory
 *                             TODO Verify this assertion
*/
type JsonFactoryOptions = {
    jsonFsData: JsonFsData;
    globalContext?: object;
}

/**
 * @type FolderGenerationOptions
 * @destFolder  Destination folder for the generated artifacts
 * @copyNonIttf Yes if non ittf files must be copiedo in the destination folder
 * @copyInclude TODO
 * @copyExclude TODO
*/
type FolderGenerationOptions = {
    destFolder: string;
    copyNonIttf?: boolean;
    copyInclude?: [string];
    copyExclude?: [string];
}

/**
 * @type MetaProductionPaths
 * @tempProductionFolder The folder for temporary files of the production
 * @wizziProductionFolder The folder for the result of the production
*/
type MetaProductionPaths = {
    tempProductionFolder: string;
    wizziProductionFolder: string;
}
/**
 * @type MetaProductionData
 * @name The name of the meta production
 * @folderTemplates Ittf documents templating the folder structure of the production
 * @ittfDocumentTemplates (optional) Ittf documents templating the files of the production
 * @plainDocuments (optional) Ittf documents with the plain content of files of the production
*/
type MetaProductionData = {
    name: string;
    folderTemplates: packi.PackiFiles;
    ittfDocumentTemplates?: packi.PackiFiles;
    plainDocuments?: packi.PackiFiles;
}
type MetaProvidesCategory = {
    name: string,
}
type MetaProvidesProduction = {
    name: string,
    title: string,
    isPackageMain: boolean,
    categories: [MetaProvidesCategory],
    plugin: string
}
type MetaProvidedMetas = {
    metaCategories: [MetaProvidesCategory],
    metaProductions: [MetaProvidesProduction],
    metaProductionSelectors: [string]
}
/**
 * @type MetaExecutionOptions
 * @metaCtx  The meta production context object
 * @globalContext A global context obiect for any wizzi generation executed preparing and processing the production
 * @paths The names of the temporary and result folders of the meta production. Defaults are "___templates" and ".wizzi".
 * @productions Array of MetaProductionData, containing meta productions that will add to or replace meta plugins productions.
*/
type MetaExecutionOptions = {
    metaCtx: object;
    globalContext?: object;
    paths?: MetaProductionPaths;
    productions?: [MetaProductionData];
}

/**
* The Wizzi Factory instance interface
*/
declare interface WizziFactory {

    /**
     * @method loadMTree
     * @description Executes a IttfDocument loading into an mTree.
     * @param ittfDocumentUri      The path to the primary ittf source document.
     * @param mTreeBuildUpContext  A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[MTree]].
     */
    loadMTree(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<MTree>
    ): void;
    /**
     * @method loadMTreeBuildUpScript
     * @description Executes a partial mTree loading and returns the mTree buildUp script for test.
     * @param ittfDocumentUri      The path to the primary ittf source document.
     * @param mTreeBuildUpContext  A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[MTree]].
     */
    loadMTreeBuildUpScript(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<string>
    ): void;
    /**
    * @method loadModel
    * @description Executes a Wizzi Model loading and returns a Wizzi Model Instance.
    * @param schemaName
    * @param ittfDocumentUri      The path to the primary ittf source document.
    * @param loadContext          A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
    * @param callback             Receives the builded [[WizziModelInstance]].
    */
    loadModel(
        schemaName: string, ittfDocumentUri: string, loadContext: ModelLoadContext, callback: cb<WizziModel>
    ): void;
    /**
    * @method loadModelFromConfig
    * @description Powerful method that executes a Wizzi Model loading recursively loading other Wizzi Models as contexts.
    *              Allows the chaining of Ittf Document transformations that produce a final Wizzi Model.
    */
    loadModelFromConfig(
        modelConfig: ModelLoadConfig, globalContext: object, callback: cb<WizziModel>
    ): void;
    /**
     * @method transformModel
     * @description Executes a Wizzi Model Transformation
     * @param model                  A Wizzi Model or POJO, the input object for the transformation
     * @param transformerName        The name for retrieving the model transformer module
     * @param context                A Wizzi Model or POJO, context data for the model transformation
     * @param callback               Receives the [[TransformedObject]].
    */
    transformModel(
        model: object, transformerName: string, context: object, callback: cb<object>
        
    ): void;
    /**
     * @method generateArtifact
     * @description Executes an artifact generation.
     * @param artifactModel          A Wizzi Model or POJO, the main context of the generation
     *                               May be null for artifacts of type 'code write'
     * @param ittfDocumentUri        The path to the source artifactModel, for trace and documentation purposes
     * @param artifactName           The name for retrieving the artifact generation module
     * @param callback               Receives the text of the [[GeneratedArtifact]].
    */
    generateArtifact(
        artifactModel: object, ittfDocumentUri: string, artifactName: string, callback?: cb<string>
    ): void;
    /**
     * @method generateArtifact
     * @description Executes an artifact generation.
     * @param artifactModel          A Wizzi Model or POJO, the main context of the generation
     *                               May be null for artifacts of type 'code write'
     * @param ittfDocumentUri        The path to the source artifactModel, for trace and documentation purposes
     * @param artifactName           The name for retrieving the artifact generator module
     * @param artifactRequestContext A Wizzi Model or POJO, context data for the artifact generation
     * @param callback               Receives the text of the [[GeneratedArtifact]].
    */
    generateArtifact(
        artifactModel: object, ittfDocumentUri: string, artifactName: string, artifactRequestContext: object, callback: cb<string>
    ): void;
    /**
     * @method loadModelAndGenerateArtifact
     * @description Load the Wizzi Model from a Ittf Document and executes an artifact generation.
     * @param ittfDocumentUri        The path to the source artifact ITTF Document
     * @param generationContext      A GenerationContext object 
     * @param artifactName           The name for retrieving the artifact generator module
     * @param callback               Receives the text of the [[GeneratedArtifact]].
    */
    loadModelAndGenerateArtifact(
        ittfDocumentUri: string, generationContext: GenerationContext, artifactName: string, callback?: cb<string>
    ): void;
    /**
     * @method loadAndTransformModel
     * @description Load the Wizzi Model from a Ittf Document and executes a Model Transformation.
     * @param ittfDocumentUri        The path to the source ITTF Document
     * @param transformationContext  A TransformationContext object 
     * @param transformName          The name for retrieving the model transformer module
     * @param callback               Receives the Wizzi Model Instance or POJO of the [[TransformedModel]].
    */
    loadAndTransformModel(
        ittfDocumentUri: string, context: TransformationContext, transformName: string, callback?: cb<object>
    ): void;
    /**
     * @method generateFolderArtifacts
     * @description Executes the artifact generation of every IttfDocument in a folder, using its schema default artifact generator.
     * @param ittfFolderUri          The path to the folder with the Ittf Documents to be generated.
     * @param context                The model loading and artifact generation context.
     * @param options                Generation options (destFolder, copyNonIttf, ...).
     * @param callback               Receives a message.
    */
    generateFolderArtifacts(
        ittfFolderUri: string, context: GenerationContext, options: FolderGenerationOptions, callback: cb<string>
    ): void;
    /**
     * @method generateModelDoms
     * @description Generates a Wizzi Model Dom
     * @param wfschemaIttfDocumentUri     The path to the source Wizzi Schema definition
     * @param outputPackagePath           The path to the folder where to write the generated modules
     * @param wfschemaName                The name of the Wizzi Schema
     * @param mTreeBuildUpContext         Context object for the Wizzi Model Load of the source Wizzi Schema definition
     * @param callback                    Receives the paths of the generated modules.
    */
    generateModelDoms(
        wfschemaIttfDocumentUri: string, outputPackagePath: string, wfschemaName: string, mTreeBuildUpContext: object, callback: cb<object>
    ): void;
    generateWizziModelTypes(
        modelTypesRequest: string, outputPackagePath: string, wfschemaName: string, mTreeBuildUpContext: object, callback: cb<object>
    ): void;
    /**
     * @param wizzifierName    The wizzi schema of the source code to be wizzified
    */
    canWizzify(wizzifierName: string): boolean;
    /**
     * @method getWizziIttf
     * @description Wizzifies a source code from file
     * @param tobeWizzifiedUri The path to the source code to be wizzified
     * @param wizzifierName    The wizzi schema of the source code to be wizzified
     * @param callback         Receives error | Ittf document
    */
    getWizziIttf(
        tobeWizzifiedUri: string, wizzifierName: string, callback: cb<any>
    ): void;
    /**
     * @method getWizziIttfFromText
     * @description Wizzifies a source code from text
     * @param tobeWizzifiedText The source code to be wizzified
     * @param wizzifierName    The wizzi schema of the source code to be wizzified
     * @param callback         Receives error | Ittf document
    */
    getWizziIttfFromText(
        tobeWizzifiedText: string, wizzifierName: string, callback: cb<any>
    ): void;
    /**
     * @method getCodeAST
     * @description Retrieves the code AST of a source file to be wizzified
     * @param tobeWizzifiedUri The path to the source code to be wizzified
     * @param wizzifierName    The wizzi schema of the source code to be wizzified
     * @param callback         Receives error | Ittf document
    */
    getCodeAST(
        tobeWizzifiedUri: string, wizzifierName: string, callback: cb<any>
    ): void;
    /**
     * @method executeJob
     * @description Executes a Wizzi Job
     * @param jobRequest     The JobRequest object
     * @param callback       Receives error | null
    */
    executeJob(
        jobRequest: JobRequest, callback: cb<any>
    ): void;
    /**
     * @method createSingleTextSourceFactory
     * @description This method allows Wizzi Model Loadings and Artifact Generations from text strings
     * @param ittfContent          The ITTF text content of a single ITTF Source Unit
     * @param schema               Name of the Wizzi Schema of the ITTF content.
     * @param options              A JsonFactoryOptions object
     * @param callback             Receives error | a WizziFactory instance
    */
    createSingleTextSourceFactory(
        ittfContent: string, schema:string, options: JsonFactoryOptions, callback: cb<WizziFactory>
    ): void;
    /**
     * @method createJsonFactory
     * @description This method creates a Wizzi Factory that operates on JSON virtual file system
     * @param options              A JsonFactoryOptions object
     * @param callback             Receives error | a WizziFactory instance
    */
    createJsonFactory(
        options: JsonFactoryOptions, callback: cb<WizziFactory>
    ): void;
    /**
     * @method createProductionManager
     * @description TODO Why this should be public?
     * @param options          A ProductionOptions object
     * @param globalContext    A global context object (POJO)
     * @returns A ProductionManager instance
    */
    createProductionManager(options?: ProductionOptions, globalContext?: object): ProductionManager;
    /**
     * @method getProvidedMetas
     * @description Retrieve the meta productions provided by the installed plugins
     * @param callback Receives error | MetaProvidedMetas
    */
    getProvidedMetas(callback: cb<MetaProvidedMetas>): void;
    /**
     * @method getMetaParameters
     * @description Retrieve the parameters of the meta productions provided by the installed plugins
     * @param callback Receives error | PackiFiles
     *                 file://metaCtxSchema/<MetaProductionName>/t/params/<param.type>.ittf.ittf
     *                 file://metaCtxSchema/<MetaProductionName>index.ittf.ittf
     *                 [file://metaCtxSchema/<MetaProductionName>globals.ittf.ittf]
    */
    getMetaParameters(options: object, callback: cb<packi.PackiFiles>): void;
    /**
     * @method executeMetaProduction
     * @description Execute a meta production
     * @options A MetaExecutionOptions object with properties driving execution
     * @param metaExecutionOptions   Meta execution options
     * @param callback               Receives error | producedPackiFiles
    */
    executeMetaProduction(metaExecutionOptions: MetaExecutionOptions, callback: cb<packi.PackiFiles>): void;
}

export type JsonWizziFactoryAndJsonFs = {
    wf: WizziFactory;
    jsonFs: JsonFs
}

/**
*
* =========================================================================================================
* 
* 
* OPTIONS FOR WIZZI LIGHT FUNCTIONS
* In the root file index.js
* 
* 
* =========================================================================================================
*  
*/

/**
* The base wizzi ligth options interface.
*/
interface LightOptions {
    plugins?: string[];
    pluginsBaseFolder?: string;
}

/**
* Options for ligth MTree loading
*/
interface LightMTreeOptions extends LightOptions {
    raw?: boolean;
}

/**
* Options for ligth MTree loading from text
*/
interface LightMTreeFromTextOptions extends LightOptions {
    schema: string;
    raw?: boolean;
}

/**
* Options for ligth MTree loading
*/
interface LightModelOptions extends LightOptions {
    ittfSources?: boolean;
}

/**
* Options for ligth MTree loading from text
*/
interface LightModelFromTextOptions extends LightOptions {
    schema: string;
    ittfSources?: boolean;
}

/**
* Options for ligth artifact generation
*/
interface LightArtifactOptions extends LightOptions {
    // if undefined the default artifact for the wizzi schema is used
    artifactName?: string;
    artifactContext?: object;
}

/**
* Options for ligth job execution
*/
interface LightJobOptions extends LightOptions {
    name?: string,
    productionOptions?: ProductionOptions;
    modelContext?: object;
    jobContext?: object;
}

/**
* Options for ligth wizzi schema generation
*/
interface LightSchemaOptions extends LightOptions {
    outputPackagePath: string
}

/**
* Options for ligth wizzi schema generation of an entire folder
*/
interface LightArtifactsFolderOptions extends LightOptions {
    destFolder: string;
}

/**
* Options for ligth Wizzi Model Dom(s) generation
*/
interface LightModelDomsSchemaOptions {
    name: string;
    ittfDocumentUri: string;
    outputPackageFolder: string;
}
interface LightModelDomsConfigOptions {
    repoUri: string;
    repoBaseFolder: string;
}
interface LightModelDomsOptions {
    storeKind?: string
    configOptions: LightModelDomsConfigOptions;
    wfschema: LightModelDomsSchemaOptions;
    name: string;
    ittfDocumentUri: string;
    outputPackageFolder: string;
    legacyVersion: string;
}

/**
* [[MTree]] build up
*/
export function mtree(ittfDocumentPath: string, callback: cb<MTree>): void;
export function mtree(ittfDocumentPath: string, mTreeBuildUpContext: object, callback: cb<MTree>): void;
export function mtree(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightMTreeOptions, callback: cb<MTree>
): void;
export function mtreeFromText(ittfContent: string, callback: cb<MTree>): void;
export function mtreeFromText(ittfContent: string, mTreeBuildUpContext: object, callback: cb<MTree>): void;
export function mtreeFromText(
    ittfContent: string, mTreeBuildUpContext: object, options: LightMTreeFromTextOptions, callback: cb<MTree>
): void;

/**
* [[WizziModel]] loading
*/
export function model(ittfDocumentPath: string, callback: cb<WizziModel>): void;
export function model(ittfDocumentPath: string, mTreeBuildUpContext: object, callback: cb<WizziModel>): void;
export function model(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightModelOptions, callback: cb<WizziModel>
): void;
export function modelFromText(ittfContent: string, callback: cb<WizziModel>): void;
export function modelFromText(ittfContent: string, mTreeBuildUpContext: object, callback: cb<WizziModel>): void;
export function modelFromText(
    ittfContent: string, mTreeBuildUpContext: object, options: LightModelFromTextOptions, callback: cb<WizziModel>
): void;

/**
* Artifact generation (single document)
*/
export function artifact(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightArtifactOptions, callback: cb<string>
): void;

/**
* Artifact generation (folder documents)
*/
export function artifactsFolder(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightArtifactsFolderOptions, callback: cb<string>
): void;

/**
* Wizzi job execution
*/
export function job(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightJobOptions, callback: cb<string>
): void;

/**
* Print wizzi job error
*/
export function printWizziJobError(
    wfjobName: string, err: any
): void;

/**
* Wizzi schema generation
*/
export function schema(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightSchemaOptions, callback: cb<string>
): void;

export function generateWizziModelDoms(
    options: LightModelDomsOptions, callback: cb<string>
): void;


/**
* Debug service for meta productions
*/
export function FactoryServiceContext() : void;

/**
 * Wizzi runner server
 */
interface RunnerServerConfig {
    cwd: string,
    userid: string;
    role: string;
    wizzifile?: any;
}
export function startRunnerServer(config: RunnerServerConfig, callback: cb<WizziFactory>): void;

/**
 * FILE NAMESPACE
 */
export namespace file {
    export function write(filePath: string, content: string): void;
    export function read(filePath: string): string;
    export function readJSON(filePath: string): object;
}