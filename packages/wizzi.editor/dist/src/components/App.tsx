/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\App.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as React from 'react';
// Redux
import {connect, ConnectedProps} from 'react-redux';
// Styles
import {StyleSheet, css} from 'aphrodite';
// Features
import {getFilesFromQuery, fileConversions} from '../features/file';
import {withPreferences, PreferencesContextType} from '../features/preferences';
import {Annotation} from '../features/annotations';
import {LoggedUser} from '../features/app';
import {SavedPacki, QueryParams, SaveStatus, SaveHistory, PackiSaveOptions, SDKVersion, PackiState, PackiFile, PackiFiles, PackiDependencies, PackiDependency, PackiDefaults, PackiProduction} from '../features/packi';
import {PackiSession, PackiListenerSubscription} from '../features/packi';
// Utils
import nullthrows from 'nullthrows';
import debounce from 'lodash/debounce';
import {isMobile} from '../utils/detectPlatform';
// Widgets
import {AnimatedLogo} from './widgets/AnimatedLogo';
import {CollapsibleObject} from './widgets/CollapsibleObject';
// Components
import AppShell from './shell/AppShell';
import AppDetails from './AppDetails';
import {EditorViewProps} from './EditorView/EditorViewProps';
import LazyLoad from './widgets/LazyLoad';
import {Dispatch} from 'redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Packi, packiActions} from '../features/packi';
import {GitRepositoryMeta} from '../features/github';
import {GeneratedArtifact, JobError, wizziActions} from '../features/wizzi';
import {PreferencesType} from '../features/preferences';
import {StoreState} from '../store';
import {getEventServiceInstance} from '../services';
import {packiToEntryArray, entryArrayToPacki, mixPreviousAndGeneratedPackiFilesToEntryArray, entryArrayDiff} from '../features/file/convertFileStructure';
import {FileSystemEntry, TextFileEntry, AssetFileEntry} from '../features/file';
import updateEntry from './FileList/actions/updateEntry';
// Defaults
import {config} from '../features/config';
const {
    DEFAULT_PACKI_CODE, 
    VERSIONS, 
    DEFAULT_SDK_VERSION
 } = config;


interface PackiStateProps {
    packiNames?: string[];
    packiTemplateNames?: string[];
    generatedArtifact?: GeneratedArtifact;
    jobGeneratedArtifacts?: PackiFiles;
    jobError?: JobError;
}

interface PackiDispatchProps {
    dispatchInitPacki: (preferences: PreferencesType) => void;
    dispatchSelectPacki: (packiId: string) => void;
    dispatchSavePacki: (packiId: string, filesToSave: PackiFiles, packiEntryFiles: PackiFiles) => void;
    dispatchGenerateArtifact: (fileName: string, files: PackiFiles) => void;
    dispatchMTree: (fileName: string, files: PackiFiles) => void;
    dispatchMTreeDebugInfo: (fileName: string, files: PackiFiles) => void;
    dispatchExecuteJob: (files: PackiFiles) => void;
    dispatchSetTimedService: (name: string, onOff: boolean, payload?: any, frequence?: number) => void;
}

const packiMapStateToProps = (state: StoreState):  PackiStateProps => {

    console.log('packiMapStateToProps.wizzi.mTreeIttf', state.wizzi.mTreeIttf);
    return {
            packiNames: state.packi.packiNames, 
            packiTemplateNames: state.packi.packiTemplateNames, 
            generatedArtifact: state.wizzi.generatedArtifact, 
            mTreeBuildUpScript: state.wizzi.mTreeBuildUpScript, 
            mTreeIttf: state.wizzi.mTreeIttf, 
            jobGeneratedArtifacts: state.wizzi.jobGeneratedArtifacts, 
            jobError: state.wizzi.jobError
         };
}
;

const packiMapDispatchToProps = (dispatch: Dispatch):  PackiDispatchProps => 

    ({
        dispatchInitPacki: (preferences: PreferencesType) => 
        
            dispatch(packiActions.initPackiRequest({
                preferences
             }))
        , 
        dispatchSelectPacki: (packiId: string) => 
        
            dispatch(packiActions.selectPackiRequest({
                id: packiId
             }))
        , 
        dispatchSavePacki: (packiId: string, filesToSave: PackiFiles, packiEntryFiles: PackiFiles) => 
        
            dispatch(packiActions.savePackiRequest({
                id: packiId, 
                filesToSave, 
                packiEntryFiles
             }))
        , 
        dispatchGenerateArtifact: (filePath: string, files: PackiFiles) => {
        
            if (filePath.endsWith('.ittf') && !filePath.endsWith('wfjob.ittf')) {
                dispatch(wizziActions.generateArtifactRequest({
                    filePath, 
                    files
                 }))
            }
        }
        , 
        dispatchMTree: (filePath: string, files: PackiFiles) => {
        
            if (filePath.endsWith('.ittf') && !filePath.endsWith('wfjob.ittf')) {
                dispatch(wizziActions.mTreeRequest({
                    filePath, 
                    files
                 }))
            }
        }
        , 
        dispatchMTreeDebugInfo: (filePath: string, files: PackiFiles) => {
        
            if (filePath.endsWith('.ittf') && !filePath.endsWith('wfjob.ittf')) {
                dispatch(wizziActions.mTreeDebugInfoRequest({
                    filePath, 
                    files
                 }))
            }
        }
        , 
        dispatchExecuteJob: (files: PackiFiles) => 
        
            dispatch(wizziActions.executeJobRequest({
                files
             }))
        , 
        dispatchSetTimedService: (name: string, onOff: boolean, payload?: any, frequence?: number) => 
        
            dispatch(wizziActions.setTimedService({
                serviceName: name, 
                onOff, 
                payload, 
                frequence
             }))
        
     })
;
type AppProps = PreferencesContextType & PropsFromRedux & { 
    Packi?: SavedPacki;
    loggedUser?: LoggedUser;
    query: QueryParams;
    userAgent: string;
    files: PackiFiles;
    defaults: PackiDefaults;
};
type State = PackiStateProps & { 
    session: PackiState;
    selectedFile: string;
    sendCodeOnChangeEnabled: boolean;
    autosaveEnabled: boolean;
    isSavedOnce: boolean;
    saveHistory: SaveHistory;
    saveStatus: SaveStatus;
    isPreview: boolean;
    isDownloading: boolean;
    devicePreviewShown: boolean;
    isLocalWebPreview: boolean;
    verbose: boolean;
    annotations: Annotation[];
    packiStoreId?: string;
    packiSessionReady: boolean;
    packiNames?: string[];
    packiTemplateNames?: string[];
    generatedArtifact?: GeneratedArtifact;
    mTreeBuildUpScript?: string;
    mTreeIttf?: string;
    jobGeneratedArtifacts?: PackiFiles;
    jobError?: JobError;
    params: Params;
    fileEntries: FileSystemEntry[];
    isWizziJobWaiting: boolean;
};
class AppMain extends React.Component<AppProps, State> {
    constructor(props: AppProps) {
        super(props);
        console.log('App.ctor.props', props);
        let id = props.packi._id;
        let files = props.packi.packiFiles;
        let dependencies = props.packi.dependencies;
        const owner = props.packi.owner;
        const name = props.packi.name;
        const mainIttf = props.packi.mainIttf;
        const wizziSchema = props.packi.wizziSchema;
        const description = props.packi.description;
        const packiProduction: PackiProduction = props.packi.packiProduction;
        // sdkVersion
        let sdkVersion: SDKVersion = DEFAULT_SDK_VERSION;
        sdkVersion = props.packi.sdkVersion ?? sdkVersion;
        const initialSdkVersion = sdkVersion;
        let wasUpgraded = false;
        if (!VERSIONS.hasOwnProperty(sdkVersion)) {
            sdkVersion = DEFAULT_SDK_VERSION;
            wasUpgraded = true;
        }
        const verbose = props.preferences.verbose;
        const sendCodeOnChangeEnabled = true;
        const sessionSecret = null;
        const isLocalWebPreview = false;
        this._PackiSession = new PackiSession({
            disabled: true, 
            id, 
            owner, 
            name, 
            description, 
            mainIttf, 
            wizziSchema, 
            files, 
            dependencies, 
            packiProduction, 
            sdkVersion, 
            verbose, 
            codeChangesDelay: sendCodeOnChangeEnabled ? 1000 : -1, 
            user: props.loggedUser, 
            apiURL: nullthrows(process.env.API_SERVER_URL), 
            host: new URL(nullthrows(process.env.SERVER_URL)).host, 
            webPreviewRef: typeof window !== 'undefined' ? this._previewRef : undefined
         });
        ;
        const devicePreviewShown = props.preferences.devicePreviewShown;
        
        // TODO preserve selected from history
        const selectedFile = Object.keys(files).length ? Object.keys(files)[0] : '';
        this.state = {
            session: this._PackiSession.getState(), 
            selectedFile, 
            sendCodeOnChangeEnabled, 
            autosaveEnabled: true, 
            isSavedOnce: false, 
            saveHistory: props.packi?.history ?? [], 
            saveStatus: props.packi?.isDraft ? 'saved-draft' : id ? 'published' : 'unsaved', 
            isLocalWebPreview, 
            wasUpgraded, 
            initialSdkVersion, 
            isDownloading: false, 
            devicePreviewShown, 
            verbose, 
            annotations: [], 
            packiStoreId: undefined, 
            packiSessionReady: false, 
            fileEntries: [], 
            generatedArtifact: undefined, 
            jobGeneratedArtifacts: undefined, 
            jobError: undefined, 
            isWizziJobWaiting: false
         };
    }
    _previewRef = React.createRef<Window>();
    private edited: boolean = false;
    _PackiSession: PackiSession;
    _PackiStateListener?: PackiListenerSubscription;
    _isFocused: boolean = false;
    _focusTimer: number | undefined;
    
    _initializePackiSession() {
        async () => 
        
            // lots of inits
            this.setState({
                packiSessionReady: true
             })
        
    }
    
    _generateArtifact(filePath) {
        const files = this.state.session.files;
        if (Object.keys(files).length) {
            filePath = filePath || this.state.selectedFile || Object.keys(files)[0];
            if (filePath.endsWith('.ittf')) {
                console.log('_generateArtifact.filePath', filePath);
                console.log('_generateArtifact', 'state.session.files', files);
                this.props.dispatchGenerateArtifact(filePath, fileConversions.packiFilterIttf(this.state.session.files))
            }
        }
    }
    
    _executeJobNotDebounced = () => {
        console.log('App._executeJobNotDebounced');
        const files = this.state.session.files;
        if (Object.keys(files).length) {
            this.setState({
                isWizziJobWaiting: false
             })
            this.props.dispatchExecuteJob(fileConversions.packiFilterIttf(files))
        }
    };
    static getDerivedStateFromProps(_props: Props, state: State) {
        return null;
    }
    
    componentDidMount() {
        this._PackiStateListener = this._PackiSession.addStateListener(this._handleSessionStateChange);
        this._PackiSession.setDisabled(false);
        this._isFocused = document.hasFocus();
        this._focusTimer = window.setInterval(this._handleFocusChangeInterval, 500);
        if (this.props.preferences.autoGenSingleDoc) {
            this._generateArtifact();
        }
    }
    
    componentWillUnmount() {
        this._PackiStateListener?.();
        this._PackiSession.setDisabled(true);
        this._PackiSession.setOnline(false);
        clearInterval(this._focusTimer);
        this._focusTimer = undefined;
    }
    
    componentDidUpdate(prevProps: Props, prevState: State) {
    }
    _handleFocusChangeInterval = () => {
        const isFocused = document.hasFocus();
        if (this._isFocused !== isFocused) {
            this._isFocused = isFocused;
            if (isFocused) {
                this._PackiSession.setFocus();
            }
        }
    };
    _handleUnload = async () => {
    
        if (navigator.sendBeacon && this.state.session.sendBeaconCloseRequest) {
            const {
                url, 
                data
             } = this.state.session.sendBeaconCloseRequest;
            navigator.sendBeacon(url, data);
        }
    }
    ;
    _handleToggleSendCode = () => 
        this.setState(({
            sendCodeOnChangeEnabled
         }) => {
        
            this._PackiSession.setCodeChangesDelay(sendCodeOnChangeEnabled ? -1 : 1000)
            return {
                    sendCodeOnChangeEnabled: !sendCodeOnChangeEnabled
                 };
        }
        );
    _handleSendCode = () => 
        this._PackiSession.sendCodeChanges();
    _handleSessionStateChange = (packiState: PackiState, prevPackiState: PackiState) => 
        // log 'Session state change: ', diff(prevPackiState, packiState), packiState
        this.setState((state) => {
        
            let annotations: Annotation[] | undefined;
            
            // Set save-status to changed if needed
            const saveStatus: SaveStatus = state.unsaved && (state.saveStatus === 'saved-draft' || state.saveStatus === 'published' || state.saveStatus === 'unsaved') ? this.edited ? 'edited' : 'unsaved' : state.saveStatus;
            console.log('App._handleSessionStateChange', 'saveStatus', saveStatus);
            
            // Update session state
            return {
                    session: packiState, 
                    saveStatus, 
                    annotations: annotations ?? state.annotations
                 };
        }
        , 
        // 15/7/21 Disactivated
        
        // for changes uploaded see
        
        // - _PackiSession.updatePackiData
        
        // - _PackiSession.updatePackiFiles
        () => {
        
        }
        );
    
    _handleSubmitMetadata = (details: { 
        name: string;
        description: string;
        mainIttf: string;
        wizziSchema: string;
    }) => {
        this.edited = true;
        this._PackiSession.setName(details.name);
        this._PackiSession.setDescription(details.description);
        this._PackiSession.setMainIttf(details.mainIttf);
        this._PackiSession.setWizziSchema(details.wizziSchema);
    };
    
    _handleChangeSDKVersion = (sdkVersion: SDKVersion, isLocalWebPreview?: boolean) => {
        this.edited = true;
        this._packi.setSDKVersion(sdkVersion);
        if (this.state.isLocalWebPreview !== !!isLocalWebPreview) {
            this.setState({
                isLocalWebPreview: !!isLocalWebPreview
             })
        }
    };
    
    _handleDownloadAsync = async () => {
    
        this.setState({
            isDownloading: true
         })
        
        // Make sure file is saved before downloading
        const {
            saveStatus
         } = this.state;
        if (saveStatus !== 'published') {
            await this._saveAsync({
                    ignoreUser: true, 
                    excludeFromHistory: true
                 });
        }
        let once = true;
        this.setState((state) => {
        
            const {
                id
             } = state.session;
            if (!id) {
                
                // this shouldn't happen
                return {
                        saveStatus, 
                        isDownloading: false
                     };
            }
            if (once) {
                once = false;
                const url = `${process.env.API_SERVER_URL}/--/api/v2/packi/download/${id}`;
                
                // Simulate link click to download file
                const element = document.createElement('a');
                if (element && document.body) {
                    document.body.appendChild(element);
                    element.setAttribute('href', url);
                    element.setAttribute('download', 'packi.zip');
                    element.style.display = '';
                    element.click();
                    document.body.removeChild(element);
                }
            }
            return {
                    saveStatus, 
                    isDownloading: false
                 };
        }
        )
    }
    ;
    
    _saveDraftIfNeeded = (debounced?: boolean) => {
        console.log('App._saveDraftIfNeeded', 'this.state.session.user', this.state.session.user, 'this.state.autosaveEnabled', this.state.autosaveEnabled, 'this.state.saveStatus', this.state.saveStatus);
        if (true) {
            if (debounced) {
                this._saveDraftIfNeededDebounced();
            }
            else {
                this._saveAsync({
                    isDraft: true
                 })
            }
        }
    };
    _saveDraftIfNeededDebounced = debounce(this._saveDraftIfNeeded, 3000);
    
    _saveAsync = async (options: PackiSaveOptions = {}) => {
    
        const {
            isDraft, 
            ignoreUser, 
            excludeFromHistory
         } = options;
        this.setState({
            saveStatus: isDraft || excludeFromHistory ? 'saving-draft' : 'publishing'
         })
        if (!isDraft) {
            let cntCodeFile = 0;
            let cntAssetFile = 0;
            let codeSize = 0;
            for (const path in this.state.session.files) {
                const file = this.state.session.files[path];
                if (file.type === 'CODE') {
                    cntCodeFile++;
                    codeSize += file.contents.length;
                }
                else {
                    cntAssetFile++;
                }
            }
        }
        try {
            this.edited = false;
            const saveResult = await this._PackiSession.saveAsync({
                    isDraft, 
                    ignoreUser
                 });
            this.setState((state) => 
            
                ({
                    isSavedOnce: true, 
                    saveStatus: state.session.unsaved ? this.edited ? 'edited' : 'unsaved' : isDraft ? 'saved-draft' : 'published'
                 })
            )
        } 
        catch (e) {
            this.edited = true;
            this.setState({
                saveStatus: 'edited'
             })
            throw e;
        } 
    }
    ;
    _handleOpenEditor = () => 
        this.setState({
            isPreview: false
         });
    _uploadAssetAsync = (asset: File) => {
        return this._PackiSession.uploadAssetAsync(asset);
    };
    _handleTogglePreview = () => {
        this.props.setPreferences({
            devicePreviewShown: !this.state.devicePreviewShown
         })
        this.setState((state) => 
        
            ({
                devicePreviewShown: !state.devicePreviewShown
             })
        )
    };
    
    _handleSelectFile = (path: string) => 
        this.setState((state) => {
        
            if (state.selectedFile !== path) {
                console.log('App._handleSelectFile', this.props.preferences.autoGenSingleDoc, path);
                if (this.props.preferences.autoGenSingleDoc) {
                    this._generateArtifact(path)
                }
                return {
                        selectedFile: path
                     };
            }
            else {
                return null;
            }
        }
        );
    
    
    // log 'App._updateFiles.filesUpdate', filesUpdate
    _updateFiles = (updateFn: (files: PackiFiles) => { 
        [path: string]: PackiFile | null;
    }) => {
        const state = this._PackiSession.getState();
        const filesUpdate = updateFn(state.files);
        if (Object.keys(filesUpdate).length) {
            this.edited = true;
            this._PackiSession.updatePackiFiles(filesUpdate, () => 
            
                this._generateArtifact()
            )
        }
    };
    
    _updateDependencies = (updateFn: (dependencies: PackiDependencies) => { 
        [path: string]: PackiDependency | null;
    }) => {
        const state = this._packi.getState();
        const dependenciesUpdate = updateFn(state.dependencies);
        if (Object.keys(dependenciesUpdate).length) {
            this.edited = true;
            this._packi.updateDependencies(dependenciesUpdate);
        }
        return this._packi.getState().dependencies;
    };
    
    _handleSelectPacki = async (packiId: string) => 
    
        this.props.dispatchSelectPacki(packiId);
    
    ;
    
    _handleMTreePreview = async () => {
    
        const files = this.state.session.files;
        if (Object.keys(files).length) {
            const filePath = this.state.selectedFile || Object.keys(files)[0];
            if (filePath.endsWith('.ittf')) {
                console.log('_handleMTreePreview.filePath', filePath);
                console.log('_handleMTreePreview', 'state.session.files', files);
                this.props.dispatchMTree(filePath, fileConversions.packiFilterIttf(this.state.session.files))
            }
        }
    }
    ;
    _handleMTreeDebugInfoPreview = async () => {
    
        const files = this.state.session.files;
        if (Object.keys(files).length) {
            const filePath = this.state.selectedFile || Object.keys(files)[0];
            if (filePath.endsWith('.ittf')) {
                console.log('_handleMTreeDebugInfoPreview.filePath', filePath);
                console.log('_handleMTreeDebugInfoPreview', 'state.session.files', files);
                this.props.dispatchMTreeDebugInfo(filePath, fileConversions.packiFilterIttf(this.state.session.files))
            }
        }
    }
    ;
    render() {
        if (this.props && this.state) {
            const experienceURL = this.state.session.url;
            if (this.state.isPreview) {
                return  (
                    <AppDetails 
                        name={this.state.session.name}
                        description={this.state.session.description}
                        experienceURL={experienceURL}
                        onOpenEditor={this._handleOpenEditor}
                        userAgent={this.props.userAgent}
                     />
                    )
                ;
            }
            console.log('App.state.session.files', this.state.session.files);
            return  (
                <LazyLoad<React.ComponentType<EditorViewProps>>
                 load={() => 
                    
                        (import('./EditorView/EditorView'))
                }>
                    {
                        ({
                            loaded, 
                            data: Comp
                         }) => 
                        
                            loaded && Comp ?  (
                                <Comp 
                                    annotations={this.state.annotations}
                                    loggedUser={this.props.loggedUser}
                                    autosaveEnabled={this.state.autosaveEnabled}
                                    createdAt={this.props.Packi ? this.props.Packi.created : undefined}
                                    dependencies={this.state.session.dependencies}
                                    missingDependencies={this.state.session.missingDependencies}
                                    description={this.state.session.description}
                                    mainIttf={this.state.session.mainIttf}
                                    wizziSchema={this.state.session.wizziSchema}
                                    packiProduction={this.state.session.packiProduction}
                                    experienceURL={experienceURL}
                                    files={this.state.session.files}
                                    isDownloading={this.state.isDownloading}
                                    owner={this.state.session.owner}
                                    name={this.state.session.name}
                                    id={this.state.session.id}
                                    onDownloadAsync={this._handleDownloadAsync}
                                    onPublishAsync={this._saveAsync}
                                    onSendCode={this._handleSendCode}
                                    onSubmitMetadata={this._handleSubmitMetadata}
                                    onToggleSendCode={this._handleToggleSendCode}
                                    onTogglePreview={this._handleTogglePreview}
                                    onSelectFile={this._handleSelectFile}
                                    previewRef={this._previewRef}
                                    previewShown={this.state.devicePreviewShown}
                                    previewURL={this.state.session.previewURL}
                                    saveHistory={this.state.saveHistory}
                                    saveStatus={this.state.saveStatus}
                                    sdkVersion={this.state.session.sdkVersion}
                                    selectedFile={this.state.selectedFile}
                                    sendCodeOnChangeEnabled={this.state.sendCodeOnChangeEnabled}
                                    updateDependencies={this._updateDependencies}
                                    updateFiles={this._updateFiles}
                                    uploadFileAsync={this._uploadAssetAsync}
                                    userAgent={this.props.userAgent}
                                    verbose={this.state.verbose}
                                    generatedArtifact={this.props.generatedArtifact}
                                    mTreeBuildUpScript={this.props.mTreeBuildUpScript}
                                    mTreeIttf={this.props.mTreeIttf}
                                    isWizziJobWaiting={this.state.isWizziJobWaiting}
                                    jobError={this.state.jobError}
                                    onSelectPacki={this._handleSelectPacki}
                                    onExecuteWizziJob={this._executeJobNotDebounced}
                                    onMTreePreview={this._handleMTreePreview}
                                    onMTreeDebugInfoPreview={this._handleMTreeDebugInfoPreview}
                                 />
                                )
                             :  (
                                <AppShell
                                 title={this.state.session.name} previewShown={this.state.devicePreviewShown} />
                                )
                        
                        
                    }
                </LazyLoad>
                )
            ;
        }
        else {
            return  (
                <div
                >
                    Not ready
                </div>
                )
            ;
        }
    }
}
const connector = connect(packiMapStateToProps, packiMapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const AppMainContainer = withPreferences(connector(AppMain));
export default AppMainContainer;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        display: 'flex', 
        height: '100%', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
     }, 
    logo: {
        transform: 'scale(0.5)', 
        opacity: 0.9
     }, 
    loadingText: {
        marginTop: 0, 
        opacity: 0.7, 
        fontSize: 18
     }
 });
