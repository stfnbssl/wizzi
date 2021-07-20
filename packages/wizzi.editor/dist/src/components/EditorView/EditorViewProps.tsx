/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorViewProps.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {SDKVersion, SaveStatus, SaveHistory, PackiSaveOptions, PackiFiles, PackiFile, PackiDependencies, PackiDependency, PackiMissingDependencies} from '../../features/packi';
import {GeneratedArtifact, JobError} from '../../features/wizzi';
import {Packi} from '../../features/packi';
import {FileSystemEntry, TextFileEntry, AssetFileEntry} from '../../features/file';
import {Annotation} from '../../features/annotations';
export type EditorViewProps = { 
    createdAt: string | undefined;
    saveHistory: SaveHistory;
    saveStatus: SaveStatus;
    selectedFile: string;
    files: PackiFiles;
    owner: string;
    name: string;
    description: string;
    mainIttf: string;
    wizziSchema: string;
    packiProduction: PackiProduction;
    dependencies: PackiDependencies;
    missingDependencies: PackiMissingDependencies;
    id?: string;
    isDownloading: boolean;
    annotations: Annotation[];
    experienceURL: string;
    sdkVersion: SDKVersion;
    sendCodeOnChangeEnabled: boolean;
    onSendCode: () => void;
    onToggleSendCode: () => void;
    onTogglePreview: () => void;
    onSubmitMetadata: (details: { 
        name: string;
        description: string;
    }) => void;
    onPublishAsync: (options?: PackiSaveOptions) => Promise<void>;
    onDownloadAsync: () => Promise<void>;
    onSelectFile: (path: string) => void;
    updateFiles: (updateFn: (files: PackiFiles) => { 
        [path: string]: PackiFile | null;
    }) => void;
    uploadFileAsync: (file: File) => Promise<string>;
    autosaveEnabled: boolean;
    userAgent: string;
    previewRef: React.MutableRefObject<Window | null>;
    previewShown: boolean;
    previewURL: string;
    verbose: boolean;
    loggedUser?: LoggedUser;
    creatorUsername?: string;
    fileEntries: FileSystemEntry[];
    entry: TextFileEntry | AssetFileEntry | undefined;
    params: { 
        id?: string;
    };
    generatedArtifact?: GeneratedArtifact;
    mTreeDebugInfo?: string;
    mTreeIttf?: string;
    // loadingMessage: string | undefined;
    jobError?: JobError;
    isWizziJobWaiting: boolean;
    onSelectPacki: (packiId: string) => void;
    onFileEntriesChange: (entries: FileSystemEntry[]) => Promise<void>;
    onEntrySelected: (entry: FileSystemEntry) => void;
    onExecuteWizziJob: () => void;
    onMTreePreview: () => void;
    onMTreeDebugInfoPreview: () => void;
};
