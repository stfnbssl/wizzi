import repo from '@wizzi/repo';

type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

/**
 * @interface mTreeBrickLine
 * @description Parsed line of a Ittf document
 * @member indent       Number of indentations of the source line.
 * @member name         Node name. The name part of the line
 * @member value        Node value. The value part of the line. The value string always is trimmed.
 * @member row          Row of the line in the source document.
 * @member col          Column at which the node name starts in the line.
 * @member sourceKey    The key of the source Ittf document in [[mTreeLoadHistory]].
 * @member tagSuffix    Contains "(" or undefined. When "(" means `$mix <name>`.
 * @member hasMacro     The line contains a ` (backtick - ascii 96) character, replaced by a Æ (ascii 146) character.
 */
export interface mTreeBrickLine {
    indent: number;
    name: string; 
    value: string; 
    row: number;
    col: number;
    sourceKey: string;
    tagSuffix?: string; 
    hasMacro: boolean; 
}

/**
 * @interface mTreeBrickNode
 * @description Nodified parsed line of a Ittf document
 * @member parent       Parent mTreeBrickNode.
 * @member model        The mTreeBrick to which the node belongs.
 * @member children     The children mTreeBrickNodes.
 * @member id           Unique id inside the loaded mTree.
*/
export interface mTreeBrickNode extends mTreeBrickLine {
    parent: mTreeBrickNode;     
    model: mTreeBrick;          
    children: mTreeBrickNode[]; 
    id: number;                 
}

/**
 * @type mTreeBrick
 * @description The parsed tree of a Ittf document. 
 *              Can be the tree of a Ittf fragment, included or mixed in many branches of the resulting mTree,
 *              so it is parsed once and then cloned.
 * @member uri             The location of the source Ittf document.
 * @member schema          The Wizzi Schema of the source Ittf document.
 * @member loadHistory     The [[mTreeLoadHistory]] object
 * @member frontMatter     The front matter object
 * @member lines           Parsed lines of source text
 * @member nodes           Nodified lines of source text.
 * @member sourceKey       The key of the source Ittf document in [[mTreeLoadHistory]].
 * @member brickKey        Key of the original mTreeBrick then cloned.
 * @member mixed           True if has been mixed. Set by the mixer, on the cloned object.
 * @member $mixerBrickKey  The brickKey of the mTreeBrick of the calling node (mixer).
 *                         Set by the mixer, on the cloned object.
 * @member $args           The node-value of the mixer node.
 *                         Set by the mixer, on the cloned object.
 * @member $argArray       The $arg array of the mixer node.
 *                         Set by the nodifier on the original mTreeBrickNode, then cloned.
 * @member $params         The node-value of the $params node, if declared.
 *                         Set by the nodifier on the original mTreeBrickNode, then cloned
 */
export type mTreeBrick = {
    uri: string;
    schema: string;                      
    loadHistory: mTreeLoadHistory;  
    frontMatter?: Readonly<string, any>; 
    lines: mTreeBrickLine[];             
    nodes: mTreeBrickNode[];             
    sourceKey: string;                   
    brickKey: string;                    
    mixed?: boolean;                      
    $mixerBrickKey?: string;              
    $args?: string;                       
    $argArray?: string[]                  
    $params?: string;                     
}

/**
 * @type IttfDocumentData
 * @description An history object containing the text source of a Ittf document.
 * @member ittfDocumentUri  The location of the source Ittf document.
 * @member sourceKey        The key of the source Ittf document in mTreeLoadHistory.
 * @member content          The text content of the source Ittf document.
 */
export type IttfDocumentData = {
    ittfDocumentUri: string;
    sourceKey: string;
    content: string;
}

/**
 * @interface mTreeBrickData
 * @description An history object containing the parsed tree of a Ittf document.
 * @member ittfDocumentUri    The location of the source Ittf document.
 * @member schema             The Wizzi Schema of the source Ittf document.
 * @member sourceKey          The key of the source Ittf document in mTreeLoadHistory.
 * @member brickKey           Key of the original mTreeBrick.
 * @member mTreeBrick         The original parsed tree of the source Ittf document. Will be cloned.
 */
export interface mTreeBrickData {
    ittfDocumentUri: string;
    schema: string;
    sourceKey: string;
    brickKey: string;
    mTreeBrick: mTreeBrick;
}

/**
 * @interface mTreeBuildUpFunctionScopes
 * @description Contains the chains of function scopes of a [[mTreeBrick]].
 *              This object is extracted by the [[JsWizziRunner]] from the AST of the parsed `mTreeBuildUpScript`.
*/
export interface mTreeBuildUpFunctionScopes {
    functions: {
        [functionName: string]: string[]
    }
}

/**
 * @interface mTreeBuildUpContexts
 * @description Contains a map of function contexts for each [[mTreeBrick]] that compose an [[mTree]].
 *              This object is extracted by the [[JsWizziRunner]] from the AST of the parsed `mTreeBuildUpScript`.
*/
export interface mTreeBuildUpContexts {
    mTreeBricks: {
        [brickKey: string]: mTreeBuildUpFunctionScopes 
    }
}

/**
 * @class mTreeLoadHistory
 * @description The container of all source and parsed Ittf documents that compose an mTree.
 * @member ittfDocumentDatas        The collection of source Ittf documents.
 * @member mTreeBrickDatas          The collection of parsed Ittf documents.
 * @method addIttfDocument
 * @method addMTreeBrick
 * @method getSourceKey
 * @method getIttfDocumentContent
 * @method getMTreeBrickData
 * @method setContextsFromMTreeBuildUpScriptAst
 */
export class mTreeLoadHistory {
    constructor();
    ittfDocumentDatas: Readonly<string, IttfDocumentData>;
    mTreeBrickDatas: Readonly<string, mTreeBrickData>;
    addIttfDocument(ittfDocumentUri: string, textContent: string) : IttfDocumentData; 
    addMTreeBrick(ittfDocumentUri: string, schema: string, mTreeBrickCloned: mTreeBrick, options: any): mTreeBrickData
    getSourceKey(ittfDocumentUri: string): string;
    getIttfDocumentContent(sourceKey: string): string;
    getMTreeBrickData(brickKey: string): mTreeBrickData;
    setContextsFromMTreeBuildUpScriptAst(contexts: mTreeBuildUpContexts): void;
    getMTreeBrickFunctionScopes(brickKey: string): mTreeBuildUpFunctionScopes;
}

/**
 * @type mTreeNode
 * @description The node of the builded final tree. See the [[mTree]] interface.
 * @member n         Node name. The name part of the line
 * @member v         Node value. The value part of the line. The value string always is trimmed.
 * @member i         Node id. The `id` of the originator [[mTreeBrickNode]].
 * @member r         Row of the line in the source document.
 * @member c         Column at which the node name starts in the line.
 * @member s         The key of the source Ittf document to which this node belongs.
 *                   The ittfDocumentData object can be retrieved, with this key, 
 *                   from the [[mTree.loadHistory]] property. 
 * @member u         The key of the [[mTreeBrick]] of the source Ittf document to which this node belongs.
 *                   The [[mTreeBrick]] object can be retrieved, with this key 
 *                   from the [[mTree.loadHistory]] property.
 * @member s         The key of the source Ittf document to which this node belongs.
 * @member children  The children [[mTreeNode]]s.
*/
export interface mTreeNode {
    n: string;
    v: string;
    i: number;
    r: number;
    c: number;
    s: string;
    u: string;
    children: mTreeNode[];
}

/**
 * @type mTree
 * @description The builded final mTree, after composition and template processing.
 * @member uri          The location of the source Ittf document.
 * @member $schema      The Wizzi Schema of the source Ittf document.
 * @member loadHistory  The [[mTreeLoadHistory]] object
 # @member nodes        The children [[mTreeNode]]s.
 # @member frontMatter  The front matter info.
*/
export interface mTree {
    uri: string;
    $schema: string;
    loadHistory: mTreeLoadHistory;
    nodes: mTreeNode[];
    frontMatter?: Readonly<string, any>;
}

/**
 * @type CreateLoadMTreeOptions
 * @description The builded final mTree, after composition and template processing.
 * @member useCache            Cache and reuse from cache the loaded [[mTree]]. Default false.
 * @member frontMatter         Load front matter infos only.
 * @member raw                 Load raw ittf without composing and evaluating nodes.
 * @member mTreeBuildUpScript  Get the generated mTreeBuildUpScript only, for debug purposes.
*/
export type CreateLoadMTreeOptions = {
    useCache?: boolean; 
    frontMatter?: boolean; 
    raw?: boolean; 
    mTreeBuildUpScript?: boolean; 
};

/**
 * @type LoadMTreeOptions
 * @member isCompile         Cache and reuse from cache the loaded [[mTree]]. Default false.
 */
export type LoadMTreeOptions = {
    isCompile?: boolean
}

/**
 * @type LoadMTreeContext
 * @property mTreeBuildUpContext   The main context object of the Ittf processing
 * @property productionContext     The production context is created by a Wizzi Factory Instance.
 * @property __productionManager   The production manager is created by a Wizzi Factory Instance.
 *                                 It is an internal property exposed for test purposes.
 * @property __ittfDocumentStore   The store system for loading the Ittf document
 *                                 It is an internal property exposed for test purposes.
 * @property options               A [[LoadMTreeOptions]] instance.
 */
export type LoadMTreeContext = {
    mTreeBuildUpContext: {[key:string]: any}
    productionContext: wizzi.ProductionContext;
    __productionManager: wizzi.ProductionManager;
    __ittfDocumentStore: repo.Store;
    options?: LoadMTreeOptions;
};

/**
 * @description Function for loading an mTree configured for given store system and load options.
 * @param ittfDocumentUri   The location of the source Ittf document. 
 * @param loadContext       [[LoadMTreeContext]] object.
 * @param callback 
 */
export function LoadMTreeFn(ittfDocumentUri: string, loadContext: LoadMTreeContext, callback: cb<mTree>) : void;

/**
 * @description Main function exported by the @wizzi/mtree package. Is a High Order Function.
 * @param createStore   HOF that incorporates the store system of the current instance of the wizzi factory.
 * @param options       [[CreateLoadMTreeOptions]] object.
 * @returns A function for loading an mTree configured for the given store system and load options.
 */
export function createLoadMTree(createStore: repo.createStoreFn, options?: CreateLoadMTreeOptions) : typeof LoadMTreeFn;

/**
 * @type mTreeBuildUpScripterContext
 * @member counter          Counter used to build the node names in the buildUp script.
 * @member isCompile        Default false. The buildUp script can safely be compiled and executed with Javascript instead of JsWizzi.
 * @member brickKey         Key of the [[mTreeBrick]] of the node currently scripted.
 * @member startTime
 */
export type mTreeBuildUpScripterContext = {
    counter: number;
    isCompile?: boolean;
    brickKey: string | null;
    startTime?: Date;
}

export namespace mTreeBuildUpScripter {
    /**
     * @description Writes the portion of the mTreeBuildUpScript for a single [[mTreeBrickNode]].
     * @param node            [[mTreeBrickNode]] for which the buildup script instruction must be written.
     * @param nparent         Progressive number of the parent node.
     * @param jsScriptCoder   Instance of the code writer utility [[jsWizzi.JsWizziScriptCoder]]
     * @param ctx             [[mTreeBuildUpScripterContext]] object relative to node.
     */
    export function codify(node: mTreeBrickNode, nparent: number, jsScriptCoder:jsWizzi.JsWizziScriptCoder, ctx: mTreeBuildUpScripterContext): void;
}

/**
 * @namespace jsWizzi
 * @description The Wizzi Factory Script Engine. A subset of ECMA Script.
*/
export namespace jsWizzi {
    export class JsWizziContext {
        constructor(composedmTree: mTreeBrick, productionContext: wizzi.ProductionContext, scriptCoder: any);
        set_NodeContext(): void;
        set_GlobalContext(brickKey?: string): void;
        set_MTreeBrickEvalContext(brickKey: string, line: mTreeBrickLine): void;
        setContextsFromMTreeBuildUpScriptAst(contexts: mTreeBuildUpContexts): void;
        setGlobalValues(name: {[key: string] : any}) : void;
        setValue(name: string, value:any): void;
        getValue(name: string): any;
    }
    export class JsWizziScriptCoder {
        constructor();
        w(text: string, node: mTreeBrickNode): void;
        write(text: string): void;
        toCode(): string;
    }
    type JsWizziRunnerOptions = {
        verbose?: boolean;
        isForInterpolation?: boolean;
    }
    export namespace JsWizziRunner {
        export function getParsed(code: string, callback: cb<any>): void;
        export function run(code: string, jsWizziContext: JsWizziContext, options: JsWizziRunnerOptions, callback: cb<any>): void;
    }
}

/**
 * @namespace mtreeUtils
 * @description The Wizzi Factory Script Engine. A subset of ECMA Script.
 */
export namespace mtreeUtils {
    type IttfOptions = {
        showIds: boolean;
    }
    export namespace node {
        function dump(nodes: any): void;
        function getIttf(nodes: any, options: IttfOptions): string;
    }
}

/**
 * @namespace mtreeTests
 * @description Internal objects exposed for test purposes 
 */
export namespace mtreeTests {
    /** 
     * @class mTreeBrickProvider       Finder and starter loader of Ittf documents and fragments.
     * @member getPrimaryMTreeBrick    Retrieve the loaded [[mTreeBrick]] in a nodified state (Step 2 executed).
     * @static @member createFromUri   Creates a [[mTreeBrickProvider]] for a given load context and source ittf document uri.
     */
    export class mTreeBrickProvider {
        getPrimaryMTreeBrick() : mTreeBrick;
        static createFromUri(primaryIttfDocumentUri: string, loadContext: LoadMTreeContext, callback: cb<mTreeBrickProvider>): void
    }
    /** 
     * @function liner       Step 1 of a mTree loading process. Transformation of the source text into lines.
     */
    export function liner(textContent: string, ittfDocumentData: IttfDocumentData): mTreeBrickLine[];
    /** 
     * @function nodifier    Step 2. Based on indentation source lines are transformed in a source node tree.
     */
    export function nodifier(lines: mTreeBrickLine[], mTreeBrick: mTreeBrick): mTreeBrickNode[];
    /** 
     * @function includer    Step 3. Composition step. Inclusion of fragments as is.
     */
    export function includer(primaryMTreeBrick: mTreeBrick, mTreeBrickProvider: mTreeBrickProvider, callback: cb<mTreeBrick>): void;
    /** 
     * @function mixer       Step 4. Composition step. Mixing of fragments.
     */
    export function mixer(primaryMTreeBrick: mTreeBrick, mTreeBrickProvider: mTreeBrickProvider, callback: cb<mTreeBrick>): void;
    /** 
     * @function appender    Step 5. Composition step. Resolution of `$hook`, `$append`, `$virtual`, `$override` and `$group` commands.
     */
    export function appender(primaryMTreeBrick: mTreeBrick, mTreeBrickProvider: mTreeBrickProvider, callback: cb<mTreeBrick>): void;
    /** 
     * @function evaluator   Step 6. Evaluation step. Evaluation of template scripts and creation of the final mTree.
     */
    export function evaluator(primaryMTreeBrick: mTreeBrick, mTreeBrickProvider: mTreeBrickProvider, callback: cb<mTree>): void;
}

/**
 * @namespace mocks
 * @description Creates mock object for test
 */
export namespace mocks {
    export function getProductionManager(): wizzi.ProductionManager;
    export function createProductionContext(): wizzi.ProductionContext;
}


/**
 * @namespace wizzi
 * @description Creates mock object for test
 */
declare namespace wizzi {
    interface ProductionManager {
        productionContext: ProductionContext;
    }
    interface ProductionContext {

    }
}
