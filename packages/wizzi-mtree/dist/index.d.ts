type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

/**
 * Parsed line of an ITTF Document
 */
declare interface MTreeBrickLine {
    indent: number;
    /**
     * node name
     */
    name: string; 
    /**
     * node value, always trimmed
     */
    value: string; 
    row: number;
    col: number;
    sourceKey: string;
    /**
     * undefined || '('
     */
    tagSuffix?: string; 
    /**
     * the line contains a ` (ascii 96) character, replaced by a Æ (ascii 146) character
     */
    hasMacro: boolean; 
}

/**
 * Nodified parsed line of an ITTF Document
 */
declare interface MTreeBrickNode extends MTreeBrickLine {
    /**
     * parent MTreeBrickNode
     */
    parent: MTreeBrickNode;     
    /**
     * the mTreeBrick to which the node belongs
     */
    model: MTreeBrick;          
    /**
     * the children MTreeBrickNodes
     */
    children: MTreeBrickNode[]; 
    /**
     * an id unique inside the loaded mTree
     */
    id: number;                 
}

/**
 * The parsed tree of an ITTF Document
 */
declare interface MTreeBrick {
    /**
     * The location of the source ITTF Document
     */
    uri: string;
    /**
     * The source Wizzi Schema of the source ITTF Document
     */
    schema: string;                      
    /**
     * The loadHistory object
     */
    loadHistory: WizziModelLoadHistory;  
    /**
     * The front matter object
     */
    frontMatter?: Readonly<string, any>; 
    /**
     * parsed lines of source text
     */
    lines: MTreeBrickLine[];             
    /**
     * nodified lines of source text
     */
    nodes: MTreeBrickNode[];             
    /**
     * key of the source info of the ITTF Document (see interface IttfDocumentData)
     */
    sourceKey: string;                   
    /**
     * key of the cloned mTreeBrick
     */
    brickKey: string;                    
    /**
     * true if has been mixed
     * set by the mixer, on the cloned object
     */
    mixed: boolean;                      
    /**
     * the brickKey of the mTreeBrick of the calling node (mixer)
     * set by the mixer, on the cloned object
     */
    $mixerBrickKey: string;              
    /**
     * the node-value of the mixer node
     * set by the mixer, on the cloned object
     */
    $args: string;                       
    /**
     * the $arg array of the mixer node
     * set by the nodifier on the original MTreeBrickNode, then cloned
     */
    $argArray: string[]                  
    /**
     * the node-value of the $params node, if declared
     * set by the nodifier on the original MTreeBrickNode, then cloned
     */
     $params: string;                     
}

/**
 * An history object containing the text source of an ITTF Document.
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
 * The container of all the parsed ITTF documents that compose an mTree
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
    /**
     * The value of the source ittf node name
     */
    n: string;
    /**
     * The value of the source ittf node value
     */
    v: string;
    /**
     * The source ittf node row position
     */
    r: number;
    /**
     * The source ittf node name column position
     */
    c: number;
    /**
     * The key of the ittfDocumentData of the source ITTF Document
     * to which this node belongs. The ittfDocumentData object
     * can be retrieved, with this key, from the wizzi-mtree.mTree.loadHistory object, 
     * available as a property of the wizzi-mtree.mTree.
     */
    s: string;
    /**
     * The key of the mTreeBrick to which this node belongs.
     * The mTreeBrick object can be retrieved, with this key, from the 
     * wizzi-mtree.mTree.loadHistory object, available as a property 
     * of the wizzi-mtree.mTree.
     */
    u: string;
    /**
     * Children nodes
     */
    children: MTreeNode[];
}

/**
 * The builded final mTree, after composition and template processing.
 */
declare interface mTree {
    uri: string;
    $schema: string;
    loadHistory: WizziModelLoadHistory;
    nodes: MTreeNode[];
    frontMatter?: Readonly<string, any>;
}

/**
 * Source map of an element of a wizzi model.
 */
declare interface SourceLineInfo {
    row: number;
    col: number;
    sourceKey: string;
}

/* FIXME copy from wizzi-repo */
interface Store {}
type createStore = (callback: cb<Store>) => void;

export type CreateLoadMTreeOptions = {
    /**
     * default false
     */
    useCache?: boolean; 
    /**
     * default false
     */
    frontMatter?: boolean; 
    /**
     *  default false
     */
    raw?: boolean; 
    /**
     * default false
     */
    debugInfo?: boolean; 
};

export type LoadMTreeContext = {
    __productionManager: {
        productionContext: {
            aclstat: {}
        },
        mTreeBuildUpContext?: {},
        options?: {
            isCompile: boolean
        }
    }
};

export type loadMTreeFn = (ittfDocumentUri: string, loadContext: LoadMTreeContext, callback: cb<MTree>) => void;

export function createLoadMTree(createStore: createStore, options?: CreateLoadMTreeOptions) : loadMTreeFn;