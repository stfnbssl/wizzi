import { packi } from '@wizzi/utils';
import { JsonFsData, JsonFs } from '@wizzi/repo';
import { IttfDocumentData, mTreeBrickData, mTree } from '@wizzi/mtree';
type cb<T> = (err: any, result: T|never) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

export const constants: {
    packiFilePrefix: string,
    packiFilePrefixExtract: string,
    metaProductionTempFolder: string,
    metaProductionWizziFolder: string
};

/**
 * The container of all the parsed ittf documents that compose an mTree.
 */
declare interface WizziModelLoadHistory {
    ittfDocumentDatas: Readonly<string, IttfDocumentData>;
    mTreeBrickDatas: Readonly<string, mTreeBrickData>;
    getIttfDocumentContent(sourceKey: string): string;
    getSourceKey(ittfDocumentUri: string): string;
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
 * @type StoreKind
 * @description Supported store repository kinds for ittf document sources and artifacts persistence.
 */
type StoreKind = "filesystem" | "mongodb" | "json";


/**
 * @type RepositoryOptions
 * @description Store repository config options. A Wizzi Factory instance may have one single store repository.
 */
type RepositoryOptions = {
    storeKind: StoreKind;
    storeUri?: string;
    storeBaseFolder?: string;
    storeJsonFs?: JsonFs;
}

/**
 * @description JSON store repository config options. 
 */
 type JSONRepositoryOptions = {
    storeKind: "json";
    storeJsonFs?: JsonFs;
}

/**
 * @description Wizzi plugins that will be loaded by the created Wizzi Factory instance. 
 * @member items             List of npm names of Wizzi Plugins or relative paths of local filesystem Wizzi Plugins.
 * @member pluginsBaseFolder Base folder of local filesystem Wizzi Plugins.
 */
type PluginsOptions = {
    items: string[];
    pluginsBaseFolder?: string;
}

/**
 * @description No filesystem Wizzi Meta Peta plugins, implemented with json objects,
 *              that can be built in memory or retrieved from a database.
 */
type InMemoryMetaPluginOptions = {
    name: string;
    pluginMetaProductions: [MetaProvidesProduction];
    metaPackiFiles: packi.PackiFiles;
}

/**
 * @description Wizzi Meta Plugins that will be loaded by the created Wizzi Factory instance. 
 * @member items                 List of npm names of Wizzi Meta Plugins or relative paths of local filesystem Wizzi Meta Plugins.
 * @member metaPluginsBaseFolder Base folder of local filesystem Wizzi Meta Plugins.
 * @member inMemoryItems         In memory Wizzi Meta Plugins.
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
 * @type FactoryOptions
 * @description The Wizzi Factory instance configuration object
 */
type FactoryOptions = {
    repo: RepositoryOptions;
    plugins: PluginsOptions;
    metaPlugins?: MetaPluginsOptions;
    globalContext?: object;
    test?: FactoryTestOptions;
}

/**
 * The JSON Wizzi Factory instance configuration object
 */
 type JSONFactoryOptions = {
    jsonFs: JsonFs;
    plugins: PluginsOptions;
    metaPlugins?: MetaPluginsOptions;
    globalContext?: object;
    test?: FactoryTestOptions;
}

/**
 * @description Creates a Wizzi Factory instance.
 */
export function createFactory(options: FactoryOptions, callback: cb<WizziFactory>): void;
/**
 * @description Creates a Filesystem Wizzi Factory instance, a factory with a `filesystem` store repository.
 */
export function fsFactory(options: FactoryOptions, callback: cb<WizziFactory>): void;
/**
 * @description Creates a JSON Wizzi Factory instance, factory with a `json` store repository.
 */
export function jsonFactory(options: JSONFactoryOptions, callback: cb<WizziFactory>): void;

/**
 * WIZZI FACTORY PRODUCTION MANAGER
 */

export interface CodeLine {
    containsFilePath?: boolean,
    text: string[],
    indentValue: number,
    options: ProductionOptions,
}

export interface CodeBlock {
    lines: CodeLine[];
    options: ProductionOptions,
    indentValue: number,
    currentline?: CodeLine,
}

export interface GenContext {
    block: CodeBlock;
    values: object;
    isEmpty: boolean;
    artifactGenerationErrors: object[],
    wizziFactory: WizziFactory,
    getContent() :string
}


/**
 * @type CollectionPathTemplateValues
 * @description Template for building the file path of an artifact generated from an item of a collection instance
 *              described by a ModelCollectionInfo.
 */
export type CollectionPathTemplateValues = {
    attribute?: string,
    token?: string,
}
/**
 * @type ModelCollectionInfo
 * @description A ModelCollectionInfo describes a collection exposed by an array property of a Model.
 *              For each item of the collection an artifact should be generated.
 * @property name                     Property name of the collection in an instance of an object described by a ModelInfo.
 * @property itemName                 Name of the exported collection item instance.
 * @property collPathTemplateValues   Template for building the file path for persisting the generated artifacts.
 */

export type ModelCollectionInfo = {
    name: string;
    itemName: string;
    pathTemplateValues: CollectionPathTemplateValues[]
}

/**
 * @type ModelSource
*/
type ModelSource = {
    fullpath: string;
    relpath: string;
    content: string;
}

/**
 * @type ModelInfo
 * @description 
 * @property schema
 * @property format
 * @property isCompile
 * @property contexts
 * @property transformers
 * @property coll
 * @property exportName
 * @property generatorRequireContextOnly   There is no source document for the artifact to be generated. 
 *                                      The ArtifactGenerator simply requires a context object.
 *                                      So collect the loaded contexts in an array and pass them back.
*/
type ModelInfo = {
    id: string;
    config: ModelLoadConfig;
    schema: string;
    format?: ModelLoadFormat;
    isCompile?: boolean;
    contexts?: ModelInfo[];
    transformers?: string[];
    coll?: ModelCollectionInfo;
    exportName?: string;
    generatorRequireContextOnly: boolean;
    /** 
     * @description set/get the ProductionManager that gives access to WizziFactory and ProductionContext instances.
    */
    productionManager(value: ProductionManager): ProductionManager | undefined;
    exists(): boolean;
    isFile(): boolean;
    isDirectory(): boolean;
    getSource(): ModelSource;
    getSources(): ModelSource[];
}


/**
 * @type ProductionStepDestPath
 * @description Object for building the destination path of the artifacts of a production step.
 * @property fullpath       The full destination path of the artifact production. 
 *                          The ProductionStep must be a single artifact production step.
 * @property folder         The destination folder path of the artifact productions of the step. Can be relative. 
 * @property baseFolder     Base folder when folder is relative.
 * @property path           The destination relative path of the artifact productions. 
 *                          When set, overrides the default relative destination path that is taken from the source path.
 * @property extension      The extension of the file of the persisted artifact. In the form `<ext>` without the dot
  */
export type ProductionStepDestPath = {
    fullpath?: string;
    baseFolder?: string;
    folder?: string;
    path?: string;
    extension: string;
}

/**
 * @type ProductionStepConfig
 * @description A ProductionStepConfig is a transport object used to build a ProductionStep instance.
 *              It can be built from an `artifact` element of a `wzjob` Wizzi Schema or programmatically.
 * @property name        The display name of the production step
 * @property options 
 * @property model   
 * @property contexts    Array of ModelLoadConfig instances that describe models to be used as context object.
 */
export interface ProductionStepConfig {
    // from wzjob.artifact.wzName
    name?: string;
    options?: ProductionOptions;
    model: ModelLoadConfig;
    contexts?: ModelLoadConfig[],
    isWzJob?: boolean, // from wzjob.artifact.isWzJob
    isWzModelDoms?: boolean, // from wzjob.artifact.isWzModelDoms
    isWzModelToFolder?: boolean, // from wzjob.artifact.isWzModelToFolder
    isWzMeta?: boolean, // from wzjob.artifact.isWzMeta
    gen: {
        generator: string, // from wzjob.artifact.generator
    },
    dest?: ProductionStepDestPath
}

/**
 * @type ProductionStep
 * @description A ProductionStep describes a step in the execution of a Wizzi Job.
 *              It is the main production unit of the Wizzi Factory.
 *              It is instantiated from an instance of a ProductionStepConfig. 
 * @param modelInfo         An instance of a ModelInfo created from a ProductionStepConfig.model.
 * @param dest              A ProductionStepDestPath instance for artifact persistence.
 * @param isWzArtifact      The production step is an Artifact Generation Production
 * @param isWzJob           The production step is a child Wizzi Job Production
 * @param isWzModelDoms     The production step is a Wizzi ModelDoms Production
 * @param isWzModelToFolder     The production step is a Wizzi ModelDoms Production
 * @param isWzMeta          The production step is a Wizzi Meta Production         
 * @param genContexts       Contains the generation contexts accumulated during the production.
 *                          At Production end a GenContext instance contains the text of the generated artifact.
 */
export type ProductionStep = {
    name: string;
    options: ProductionOptions;
    modelInfo: ModelInfo;
    contextInfos: object[],
    transformers: string[],
    gen: {
        generator: string,
    },
    dest: ProductionStepDestPath,
    isWzJob?: boolean, // from wzjob.artifact.isWzJob
    isWzModelDoms?: boolean, // from wzjob.artifact.isWzModelDoms
    isWzModelToFolder?: boolean, // from wzjob.artifact.isWzModelToFolder
    isWzMeta?: boolean, // from wzjob.artifact.isWzMeta
    genContexts: GenContext[],
}

export interface PManJobRequest {
    wzjob: {
        ittfDocumentUri: string,
    }
}

export interface PManPersistResult {
    oper: string;
    item: {
        filepath: string,
    };
    status: string;
}

type EvaluationContextValue = string | number | {};

export interface ProductionContext {
    evaluationContext: {[key: string]: any};
    hasNewRunningContextValues(): boolean;
    acceptNewRunningContextValues(): void;
    setEvaluationContextValue(namePath: string, value: EvaluationContextValue) : void;
    getEvaluationContextValue(namePath: string): EvaluationContextValue;
}

export type ProductionActionType = "loadModelAndGenerateArtifact";

export type ProductionAction = {
    productionActionType: ProductionActionType;
    ittfDocumentUri: string;
    artifactName?: string;
    destPath?: string;
    modelRequestContext?: {[key: string]: any};
    artifactRequestContext?: {[key: string]: any};
}

export interface ProductionManager {
    productionContext: ProductionContext;
    wizziFactory: WizziFactory;
    addProductionStepRequest(request: ProductionStepConfig): void;
    addWzjobRequest(jobRequest: PManJobRequest): void;
    addProductionAction(actions: ProductionAction) : void;
    executeProductionActions(actions: ProductionAction[]) : void;
    run(callback: cb<ProductionStep[]>): void;
    persistToFile(callback: cb<PManPersistResult[]>): void;
    terminate(): void;
}

export function createProductionManager(options?: ProductionOptions, globalContext?: object): ProductionManager;

/**
 * WIZZI FACTORY OPERATIONS
 */

/**
 * @type ModelLoadFormat
 * @description The format of a not Ittf context object that the Wizzi Factory can load.
*/
export type ModelLoadFormat = "xml" | "json" | "yaml";

/**
 * @type ModelLoadConfig
 * @description The configuration of a multi-part loading of Wizzi Model Instances.
 * @property src          The path of the source documents. Can be an absolute or relative path. 
 *                        When relative the `cwd` parameter must set the base path.
 * 				          When contains the string `/*`is replaced with src.substr(0, src.indexOf('/*')),
 *                        it means that contains a glob pattern and a `srcPattern` property 
 *                        is extracted with src.substr(src.indexOf('/*')).
 * @property cwd          The base path of the source documents, if `src` is a relative path.
 * @property schema       The Wizzi Schema when the model source is a Ittf document.
 * @property format       The format of the source document when the model source is not a Ittf document. 
 * @property exportName   The name of the loaded instance when used as a context object in a production.
 * @property transformers An array of names of Model Transformations that must be applied to the loaded instance.
*/
export type ModelLoadConfig = {
    src: string;
    cwd?: string;
    schema: string;
    format?: ModelLoadFormat;
    exportName?: string;
    contexts?: ModelLoadConfig[];
    transformers?: string[];
    coll?: ModelCollectionInfo;
}

/**
* @type ModelFormatOptions
* @description               The required result format of a loaded Wizzi Model.
* @property ittfSources      If true returns not the Wizzi Model but its source Ittf documents.
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
 * @type ProductionOptions
 * @description Wizzi Job production options
 * @property indentSpaces         Optional. Default: 4. The number of spaces of one indentation in a generated artifact
 * @property basedir              Optional. Not implemented yet
 * @property verbose              Optional. Not implemented yet
 * @property dotgExtensionPrefix  If true the generated file hello.js becomes hello.g.js. Default is false
 * @property dumps                Optional. Job dump options
*/
type ProductionOptions = {
    indentSpaces?: number;
    basedir?: string;
    verbose?: number;
    dotgExtensionPrefix?: boolean,
    dumps?: DumpsOptions;
}

/**
 * @type JobRequest
 * @description Wizzi Job request options
 * @property name               The name of the Wizzi Job, for trace purposes.
 * @property path               The path to the ITTF Document of the Wizzi Job definition.
 * @property wzjobModel         Wizzi model, built programmatically or previously loaded.
 *                              Is alternative to the `path` property. 
 * @property globalContext      A global context object for all the productions of the Wizzi Job.
 * @property productionOptions  A ProductionOptions object.
*/
type JobRequest = {
    name: string;
    path?: string;
    wzjobModel?: WizziModel;
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
 * @property destFolder           Destination folder for the generated artifacts
 * @property copyNonIttf          Yes if non ittf files must be copiedo in the destination folder
 * @property copyInclude          TODO
 * @property copyExclude          TODO
 * @property useMultiPartContext  Delegate execution to ProductionManager/ProductionContext and manage a multi-production evaluation context.
*/
type FolderGenerationOptions = {
    destFolder: string;
    copyNonIttf?: boolean;
    copyInclude?: [string];
    copyExclude?: [string];
    useMultiPartContext?: boolean;
}

/**
 * @type MetaProductionPaths
 * @tempProductionFolder The folder for temporary files of the production
 * @wizziProductionFolder The folder for the result of the production
*/
type MetaProductionPaths = {
    metaProductionTempFolder: string;
    metaProductionWizziFolder: string;
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
     * @param mTreeBuildUpContext  A context object for the [[mTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[mTree]].
     */
    loadMTree(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<mTree>
    ): void;
    /**
     * @method loadMTreeBuildUpScript
     * @description Executes a partial mTree loading and returns the mTree buildUp script for test.
     * @param ittfDocumentUri      The path to the primary ittf source document.
     * @param mTreeBuildUpContext  A context object for the [[mTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[mTree]].
     */
    loadMTreeBuildUpScript(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<string>
    ): void;
    /**
    * @method loadModel
    * @description Executes a Wizzi Model loading and returns a Wizzi Model Instance.
    * @param schemaName
    * @param ittfDocumentUri      The path to the primary ittf source document.
    * @param loadContext          A context object for the [[mTree]] build up, [[WizziModel]] or POJO.
    * @param callback             Receives the builded [[WizziModelInstance]].
    */
    loadModel(
        schemaName: string | null, ittfDocumentUri: string, loadContext: ModelLoadContext, callback: cb<WizziModel>
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
        ittfDocumentUri: string, generationContext: GenerationContext, artifactName: string | null, callback?: cb<string>
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
        ittfDocumentUri: string, context: TransformationContext, transformName: string | null, callback?: cb<object>
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
     * @param wzschemaIttfDocumentUri     The path to the source Wizzi Schema definition
     * @param outputPackagePath           The path to the folder where to write the generated modules
     * @param wzschemaName                The name of the Wizzi Schema
     * @param mTreeBuildUpContext         Context object for the Wizzi Model Load of the source Wizzi Schema definition
     * @param callback                    Receives the paths of the generated modules.
    */
    generateModelDoms(
        wzschemaIttfDocumentUri: string, outputPackagePath: string, wzschemaName: string, mTreeBuildUpContext: object, callback: cb<object>
    ): void;
    generateWizziModelTypes(
        modelTypesRequest: string, outputPackagePath: string, wzschemaName: string, mTreeBuildUpContext: object, callback: cb<object>
    ): void;
    /**
     * @param schemaOrExtension    The wizzi schema of the source code to be wizzified
    */
    canWizzify(schemaOrExtension: string): boolean;
    /**
     * @method getWizziIttf
     * @description Wizzifies a source code from file
     * @param tobeWizzifiedUri The path to the source code to be wizzified
     * @param schemaOrExtension    The wizzi schema of the source code to be wizzified
     * @param callback         Receives error | Ittf document
    */
    getWizziIttf(
        tobeWizzifiedUri: string, schemaOrExtension: string, callback: cb<any>
    ): void;
    /**
     * @method getWizziIttfFromText
     * @description Wizzifies a source code from text
     * @param tobeWizzifiedText The source code to be wizzified
     * @param schemaOrExtension    The wizzi schema of the source code to be wizzified
     * @param callback         Receives error | Ittf document
    */
    getWizziIttfFromText(
        tobeWizzifiedText: string, schemaOrExtension: string, callback: cb<any>
    ): void;
    /**
     * @method getCodeAST
     * @description Retrieves the code AST of a source file to be wizzified
     * @param tobeWizzifiedUri  The path to the source code to be wizzified
     * @param schemaOrExtension The wizzi schema of the source code to be wizzified
     * @param callback           Receives error | AST object
    */
    getCodeAST(
        tobeWizzifiedUri: string, schemaOrExtension: string, callback: cb<any>
    ): void;
    /**
     * @method getCodeASTFromText
     * @description Retrieves the code AST of a source file to be wizzified
     * @param tobeWizzifiedText    The source code to be wizzified
     * @param schemaOrExtension    The wizzi schema of the source code to be wizzified
     * @param callback           Receives error | AST object
    */
    getCodeASTFromText(
        tobeWizzifiedText: string, schemaOrExtension: string, callback: cb<any>
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
    /**
     * @method getCheatsheetList
     * @description Get a list of available documentation cheatsheets.
    */
    getCheatsheetList() : string[];
    /**
     * @method hasCheatsheet
     * @description Check if a documentation cheatsheets exists for a given Wizzi Schema.
    */
    hasCheatsheet(schemaName: string): boolean;
    /**
     * @method getCheatsheet
     * @description Retrieves a documentation cheatsheets for a given Wizzi Schema.
    */
    getCheatsheet(schemaName: string, callback: cb<{}>): void;
    /**
     * @method mapIttfDocumentPathToSchema
     * @description Map an ittfDocumentPath to its WizziSchema. A WizziSchema may have more than one extension (For example `ts` has `ts` and `tsx`).
    */
    mapIttfDocumentPathToSchema(ittfDocumentPath: string): string;
    /**
     * @method mapExtensionToSchema
     * @description Map a file extension to its WizziSchema. A WizziSchema may have more than one extension (For example `ts` has `ts` and `tsx`).
    */
    mapExtensionToSchema(extension: string): string;
    /**
     * @method mapIttfDocumentPathToDefaultArtifact
     * @description Map an ittfDocumentPath to its default artifact generator.
    */
    mapIttfDocumentPathToDefaultArtifact(ittfDocumentPath: string): string;
    /**
     * @method mapIttfDocumentPathToPluginDependencies
     * @description Map an ittfDocumentPath to the WizziPlugin dependencies of its WizziSchema.
    */
    mapIttfDocumentPathToPluginDependencies(ittfDocumentPath: string): string[];
    /**
     * @method mapSchemaToDefaultArtifact
     * @description Map a WizziSchema to its default artifact generator.
    */
    mapSchemaToDefaultArtifact(schema: string): string;
    /**
     * @method getSchemaArtifacts
     * @description Get the artifact generators of a WizziSchema.
    */
    getSchemaArtifacts(schema: string): string[];
    /**
     * @method mapArtifactToContentType
     * @description Map an artifact generator to its contentType.
    */
    mapArtifactToContentType(artifactName: string): string;
    /**
     * @method mapSchemaToRootTag
     * @description Map a WizziSchema to its root tag.
    */
    mapSchemaToRootTag(schema: string): string;
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
* Options for ligth mTree loading
*/
interface LightMTreeOptions extends LightOptions {
    raw?: boolean;
}

/**
* Options for ligth mTree loading from text
*/
interface LightMTreeFromTextOptions extends LightOptions {
    schema: string;
    raw?: boolean;
}

/**
* Options for ligth mTree loading
*/
interface LightModelOptions extends LightOptions {
    ittfSources?: boolean;
}

/**
* Options for ligth mTree loading from text
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
    wzschema: LightModelDomsSchemaOptions;
    name: string;
    ittfDocumentUri: string;
    outputPackageFolder: string;
    legacyVersion: string;
}

/**
* [[mTree]] build up
*/
export function mtree(ittfDocumentPath: string, callback: cb<mTree>): void;
export function mtree(ittfDocumentPath: string, mTreeBuildUpContext: object, callback: cb<mTree>): void;
export function mtree(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightMTreeOptions, callback: cb<mTree>
): void;
export function mtreeFromText(ittfContent: string, callback: cb<mTree>): void;
export function mtreeFromText(ittfContent: string, mTreeBuildUpContext: object, callback: cb<mTree>): void;
export function mtreeFromText(
    ittfContent: string, mTreeBuildUpContext: object, options: LightMTreeFromTextOptions, callback: cb<mTree>
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
    wzjobName: string, err: any
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
export class FactoryServiceContext {
    constructor();
    addDebugObject(kind: string, key: string, value:any) : void;
    dumpDebugObjects(options: {[key: string]: any}): void;
}

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

/**
 * Packi manager
 */
declare interface PackiManager {
    /**
     * @method prettify
     * @description Prettify the ittf documents of a PackiFiles object
     * @param files        The path to the primary ittf source document.
     * @param callback     Receives the prettified documents [[PackiFiles]].
     */
    prettify(
        files: packi.PackiFiles, callback: cb<packi.PackiFiles>
    ): void;
    generate(
        files: packi.PackiFiles, plugins: PluginsOptions, metaPlugins: MetaPluginsOptions | null, callback: cb<packi.PackiFiles>
    ): void;
}
/**
 * @type PackiManagerOptions
 * @description A PackiManager instance configuration object
 */
export type PackiManagerOptions = {}

/**
 * @description Creates a Packi manager instance.
 */
export function createPackiManager(options: PackiManagerOptions, callback: cb<PackiManager>): void;
