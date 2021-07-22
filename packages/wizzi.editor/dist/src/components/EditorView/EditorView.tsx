/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorView.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import debounce from 'lodash/debounce';
import * as React from 'react';
import {connect} from 'react-redux';
import Split from 'react-split';
import {SDKVersion, PackiFiles, PackiProduction} from '../../features/packi';
import {GeneratedArtifact, JobError} from '../../features/wizzi';
import {LoggedUser} from '../../features/app';
import {Annotation} from '../../features/annotations';
import {isScript, isJson, isTest} from '../../features/file/index';
import {EditorProps} from '../Editor/EditorProps';
import EditorFooter from './EditorFooter';
import EditorPanels from './EditorPanels';
import EditorToolbar from './EditorToolbar';
import {EditorViewProps as BaseEditorViewProps} from './EditorViewProps';
import FileList from '../FileList/FileList';
import KeyboardShortcuts, {Shortcuts} from './KeyboardShortcuts';
import NoFileSelected from './NoFileSelected';
import PageMetadata from '../PageMetadata';
import type {PanelType} from '../../features/preferences/index';
import {withPreferences, PreferencesContextType} from '../../features/preferences/index';
// from shell
import {ContentShell} from '../shell/ContentShell';
import {EditorShell} from '../shell/EditorShell';
import {LayoutShell} from '../shell/LayoutShell';
import {c, s} from '../ThemeProvider';
// from widgets
import Banner from '../widgets/Banner';
import KeybindingsManager from '../widgets/KeybindingsManager';
import LazyLoad from '../widgets/LazyLoad';
import {ModalDialog} from '../widgets/ModalDialog';
import {ProgressIndicator} from '../widgets/ProgressIndicator';

import GeneratedView from './GeneratedView';
import GenerationErrors from './GenerationErrors';

const EDITOR_LOAD_FALLBACK_TIMEOUT = 3000;

export type EditorViewProps = PreferencesContextType & BaseEditorViewProps & { 
    loggedUser?: LoggedUser;
};
type ModalName = 'auth' | 'packi-manager' | 'github-commit' | 'github-create' | 'edit-info' | 'shortcuts' | 'previous-saves' | 'import-repo' | 'import-production';
type BannerName = 'connected' | 'disconnected' | 'reconnect' | 'autosave-disabled' | 'export-unavailable' | 'slow-connection';
type SplitViewKind = 'left' | 'right' | 'both';
type State = { 
    currentModal: ModalName | null;
    currentBanner: BannerName | null;
    loadedEditor: 'monaco' | 'simple' | null;
    isMarkdownPreview: boolean;
    shouldPreventRedirectWarning: boolean;
    isDownloading: boolean;
    splitViewKind: SplitViewKind;
};
const BANNER_TIMEOUT_SHORT = 1500;
const BANNER_TIMEOUT_LONG = 5000;
class EditorViewComp extends React.Component<EditorViewProps, State> {
    state: State = {
        currentModal: null, 
        currentBanner: null, 
        loadedEditor: null, 
        isMarkdownPreview: true, 
        shouldPreventRedirectWarning: false, 
        isDownloading: false, 
        splitViewKind: 'both' as SplitViewKind
    }
    ;
    
    static getDerivedStateFromProps(props: EditorViewProps, state: State) {
        const {
            selectedFile, 
            files
         } = props;
        
        // When an empty markdown file is opened, switch to edit mode
        let newState: any = null;
        if (state.isMarkdownPreview && selectedFile.endsWith('.md') && !files[selectedFile]?.contents) {
            newState = newState || {};
            newState.isMarkdownPreview = false;
        }
        return newState;
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this._handleUnload);
    }
    
    componentDidUpdate(prevProps: EditorViewProps) {
        if (prevProps.autosaveEnabled !== this.props.autosaveEnabled && !this.props.autosaveEnabled) {
            this._showBanner('autosave-disabled', BANNER_TIMEOUT_LONG);
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this._handleUnload);
    }
    
    _handleUnload = (e: any) => {
        const isUnsaved = this.props.saveStatus === 'edited' || this.props.saveStatus === 'publishing' || this.props.saveStatus === 'saving-draft';
        if (!isUnsaved || this.state.shouldPreventRedirectWarning) {
            this._allowRedirectWarning();
            return ;
        }
        const message = 'You have unsaved changes. Are you sure you want to leave this page?';
        e.returnValue = message;
        return message;
    };
    _showBanner = (name: BannerName, duration: number) => {
        this.setState({
            currentBanner: name
         })
        setTimeout(() => 
        
            // @ts-ignore
            this.setState((state) => 
            
                (state.currentBanner === name ? {
                        currentBanner: null
                     } : state)
            )
        , duration)
    };
    
    _handleChangeSplitViewKind = (e: any) => 
    
        this.setState({
            splitViewKind: e.target.value as SplitViewKind
         })
    ;
    
    _handleDismissEditModal = () => 
        this.setState({
            currentModal: null
         });
    _handleShowTitleDescriptionModal = () => 
        this.setState({
            currentModal: 'edit-info'
         });
    _handleShowPackiManager = () => 
    
        this.setState({
            currentModal: 'packi-manager'
         })
    ;
    _handleShowAuthModal = () => 
    
        this.setState({
            currentModal: 'auth'
         })
    ;
    _handleShowShortcuts = () => 
        this.setState({
            currentModal: 'shortcuts'
         });
    _handleShowImportRepoModal = () => 
        this.setState({
            currentModal: 'import-repo'
         });
    _handleShowImportProductionModal = () => 
        this.setState({
            currentModal: 'import-production'
         });
    _handleHideModal = () => 
        this.setState({
            currentModal: null
         });
    _handleShowModal = (name: any) => 
        this.setState({
            currentModal: name
         });
    _handleRemoveFile = (path: string) => 
        this._EditorComponent?.removePath?.(path);
    _handleRenameFile = (oldPath: string, newPath: string) => 
        this._EditorComponent?.renamePath?.(oldPath, newPath);
    _EditorComponent: any;
    _showErrorPanel = () => 
        this.props.setPreferences({
            panelType: 'errors'
         });
    _togglePanels = (panelType?: PanelType) => 
        this.props.setPreferences({
            panelsShown: !this.props.preferences.panelsShown, 
            panelType: panelType && !this.props.preferences.panelsShown ? panelType : this.props.preferences.panelType
         });
    _toggleFileTree = () => 
        this.props.setPreferences({
            fileTreeShown: !this.props.preferences.fileTreeShown
         });
    _toggleTheme = () => 
        this.props.setPreferences({
            theme: this.props.preferences.theme === 'light' ? 'dark' : 'light'
         });
    _toggleMarkdownPreview = () => 
        this.setState((state) => 
        
            ({
                isMarkdownPreview: !state.isMarkdownPreview
             })
        );
    _preventRedirectWarning = () => 
        this.setState({
            shouldPreventRedirectWarning: true
         });
    _allowRedirectWarning = () => 
        this.setState({
            shouldPreventRedirectWarning: false
         });
    
    // log 'EditorView.props.loggedUser', loggedUser, this.props.loggedUser
    render() {
        const {
            currentModal, 
            currentBanner, 
            isDownloading
         } = this.state;
        const {
            id, 
            createdAt, 
            saveHistory, 
            saveStatus, 
            files, 
            selectedFile, 
            dependencies, 
            sendCodeOnChangeEnabled, 
            sdkVersion, 
            userAgent, 
            onSendCode, 
            onPublishAsync, 
            onToggleSendCode, 
            onTogglePreview, 
            uploadFileAsync, 
            preferences, 
            owner, 
            name, 
            description, 
            mainIttf, 
            wizziSchema, 
            packiProduction, 
            previewRef, 
            previewURL, 
            previewShown, 
            loggedUser, 
            onExecuteWizziJob, 
            generatedArtifact, 
            mTreeBuildUpScript, 
            mTreeIttf, 
            jobError, 
            isWizziJobWaiting, 
            onMTreePreview, 
            onMTreeDebugInfoPreview
         } = this.props;
        const annotations = this.props.annotations;
        const testPreviewURL = `${process.env.API_SERVER_URL}/~/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
        console.log('EditorView.props', this.props, mainIttf, wizziSchema);
        return  (
            <ContentShell
            >
                {
                    this.state.loadedEditor ? null :  (
                        <ProgressIndicator
                         />
                        )
                    
                }
                <PageMetadata
                 name={name} description={description} id={id} />
                <KeybindingsManager
                 bindings={Shortcuts} onTrigger={(type) => {
                    
                        const commands: { 
                            [key: string]: (() => void) | null;
                        } = {
                            tree: this._toggleFileTree, 
                            panels: this._togglePanels, 
                            shortcuts: this._handleShowShortcuts, 
                            update: onSendCode
                         };
                        const fn = commands[type];
                        if (fn) {
                            fn();
                        }
                    }
                } />
                <EditorToolbar 
                    name={name}
                    description={description}
                    mainIttf={mainIttf}
                    wizziSchema={wizziSchema}
                    packiProduction={packiProduction}
                    createdAt={createdAt}
                    saveHistory={saveHistory}
                    saveStatus={saveStatus}
                    loggedUser={loggedUser}
                    isEditModalVisible={currentModal === 'edit-info'}
                    loggedUser={loggedUser}
                    isWizziJobWaiting={isWizziJobWaiting}
                    onChangeSplitViewKind={this._handleChangeSplitViewKind}
                    
                    // name={name}
                    
                    // description={description}
                    creatorUsername={this.props.creatorUsername}
                    splitViewKind={this.state.splitViewKind}
                    isDownloading={isDownloading}
                    isAuthModalVisible={currentModal === 'auth'}
                    generatedPreviewURL={previewURL}
                    onShowEditModal={this._handleShowTitleDescriptionModal}
                    onDismissEditModal={this._handleDismissEditModal}
                    onExecuteWizziJob={onExecuteWizziJob}
                    onShowPackiManager={this._handleShowPackiManager}
                    onSubmitMetadata={this.props.onSubmitMetadata}
                    onDownloadCode={this.props.onDownloadAsync}
                    onPublishAsync={onPublishAsync}
                 />
                <div
                 className={css(styles.editorAreaOuterWrapper)}>
                    <div
                     className={css(styles.editorAreaOuter)}>
                        <LayoutShell
                        >
                            <FileList 
                                annotations={annotations}
                                visible={preferences.fileTreeShown}
                                files={files}
                                selectedFile={selectedFile}
                                updateFiles={this.props.updateFiles}
                                onSelectFile={this.props.onSelectFile}
                                onRemoveFile={this._handleRemoveFile}
                                onRenameFile={this._handleRenameFile}
                                uploadFileAsync={uploadFileAsync}
                                onDownloadCode={this.props.onDownloadAsync}
                                onImportRepo={this._handleShowImportRepoModal}
                                onImportProduction={this._handleShowImportProductionModal}
                                saveStatus={saveStatus}
                                sdkVersion={sdkVersion}
                             />
                            <LazyLoad
                             load={async ():  Promise<{ 
                                    default: React.ComponentType<EditorProps>;
                                }> => {
                                
                                    let timeout: any;
                                    
                                    // Fallback to simple editor if monaco editor takes too long to load
                                    const MonacoEditorPromise = import('../Editor/MonacoEditor').then((editor) => 
                                    
                                        ({
                                            editor, 
                                            type: 'monaco'
                                         })
                                    )
                                    ;
                                    
                                    // Fallback to simple editor if monaco editor takes too long to load
                                    const SimpleEditorPromise = new Promise((resolve, reject) => 
                                    
                                        timeout = setTimeout(() => {
                                        
                                            this._showBanner('slow-connection', BANNER_TIMEOUT_LONG);
                                            import('../Editor/SimpleEditor').then(resolve, reject)
                                        }
                                        , EDITOR_LOAD_FALLBACK_TIMEOUT)
                                    
                                    ).then((editor) => 
                                    
                                        ({
                                            editor, 
                                            type: 'simple'
                                         })
                                    );
                                    return Promise.race([
                                            MonacoEditorPromise.catch(() => 
                                            
                                                SimpleEditorPromise
                                            
                                            ), 
                                            SimpleEditorPromise
                                        ]).then(({
                                            editor, 
                                            type
                                         }: any) => {
                                        
                                            this.setState({
                                                loadedEditor: type
                                             })
                                            clearTimeout(timeout);
                                            return editor;
                                        }
                                        )
                                    ;
                                }
                            }>
                                {
                                    ({
                                        loaded, 
                                        data: Comp
                                     }) => {
                                    
                                        this._EditorComponent = Comp;
                                        const file = files[selectedFile];
                                        if (file) {
                                            const {
                                                contents
                                             } = file;
                                            const isMarkdown = selectedFile.endsWith('.md');
                                            if (isMarkdown && this.state.isMarkdownPreview) {
                                                return  (
                                                    <React.Fragment
                                                    >
                                                        <LazyLoad
                                                         load={() => 
                                                            
                                                                import('../Markdown/MarkdownPreview')
                                                        }>
                                                            {
                                                                ({
                                                                    loaded: mdLoaded, 
                                                                    data: MarkdownPreview
                                                                 }) => {
                                                                
                                                                    if (mdLoaded && MarkdownPreview) {
                                                                        return  (
                                                                            <MarkdownPreview
                                                                             source={contents as string} />
                                                                            )
                                                                        ;
                                                                    }
                                                                    return  (
                                                                        <EditorShell
                                                                         />
                                                                        )
                                                                    ;
                                                                }
                                                                
                                                            }
                                                        </LazyLoad>
                                                        <button
                                                         className={css(styles.previewToggle)} onClick={this._toggleMarkdownPreview}>
                                                            <svg 
                                                                width="12px"
                                                                height="12px"
                                                                viewBox="0 0 18 18"
                                                                className={css(styles.previewToggleIcon)}
                                                            >
                                                                <g
                                                                 transform="translate(-147.000000, -99.000000)">
                                                                    <g
                                                                     transform="translate(144.000000, 96.000000)">
                                                                        <path
                                                                         d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 L20.71,7.04 Z" />
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </React.Fragment>
                                                    )
                                                ;
                                            }
                                            if (loaded && Comp) {
                                                return  (
                                                    <div
                                                     className={css(styles.editorComponentOuter)}>
                                                        <Comp 
                                                            className={css(styles.editorComponent)}
                                                            dependencies={dependencies}
                                                            sdkVersion={sdkVersion}
                                                            selectedFile={selectedFile}
                                                            files={files}
                                                            autoFocus={!/Untitled file.*\.(js|tsx?)$/.test(selectedFile)}
                                                            annotations={annotations}
                                                            updateFiles={this.props.updateFiles}
                                                            onSelectFile={this.props.onSelectFile}
                                                            lineNumbers="undefined"
                                                         />
                                                        {
                                                            isMarkdown ?  (
                                                                <button
                                                                 className={css(styles.previewToggle)} onClick={this._toggleMarkdownPreview}>
                                                                    <svg 
                                                                        width="16px"
                                                                        height="12px"
                                                                        viewBox="0 0 22 16"
                                                                        className={css(styles.previewToggleIcon)}
                                                                    >
                                                                        <g
                                                                         transform="translate(-145.000000, -1156.000000)">
                                                                            <g
                                                                             transform="translate(144.000000, 1152.000000)">
                                                                                <path
                                                                                 d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 L12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 L12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 L12,9 Z" />
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                                )
                                                             : null
                                                        }
                                                    </div>
                                                    )
                                                ;
                                            }
                                        }
                                        else {
                                            return  (
                                                <NoFileSelected
                                                 />
                                                )
                                            ;
                                        }
                                        return  (
                                            <EditorShell
                                             />
                                            )
                                        ;
                                    }
                                    
                                }
                            </LazyLoad>
                        </LayoutShell>
                        {
                            preferences.panelsShown ?  (
                                <EditorPanels 
                                    annotations={annotations}
                                    onShowErrorPanel={this._showErrorPanel}
                                    onTogglePanels={this._togglePanels}
                                    onSelectFile={this.props.onSelectFile}
                                    panelType={preferences.panelType}
                                 />
                                )
                             : null
                        }
                    </div>
                    {
                        jobError ?  (
                            <GenerationErrors 
                                errorName={jobError.errorName}
                                errorLines={[]}
                                errorMessage={jobError.errorMessage}
                                errorStack={jobError.errorStack}
                             />
                            )
                         : generatedArtifact && generatedArtifact.artifactContent ?  (
                                <GeneratedView 
                                    generatedContent={generatedArtifact.artifactContent}
                                    generatedSourcePath={generatedArtifact.sourcePath}
                                    mTreeBuildUpScript={mTreeBuildUpScript}
                                    mTreeIttf={mTreeIttf}
                                    generatedPreviewURL={previewURL}
                                    splitViewKind={this.state.splitViewKind}
                                    onMTreePreview={onMTreePreview}
                                    onMTreeDebugInfoPreview={onMTreeDebugInfoPreview}
                                 />
                                )
                             : generatedArtifact && generatedArtifact.errorLines ?  (
                                    <GenerationErrors 
                                        errorName={generatedArtifact.errorName}
                                        errorLines={generatedArtifact.errorLines}
                                        errorMessage={generatedArtifact.errorMessage}
                                        errorStack={generatedArtifact.errorStack}
                                     />
                                    )
                                 : null
                    }
                </div>
                <EditorFooter 
                    annotations={annotations}
                    loggedUser={loggedUser}
                    fileTreeShown={preferences.fileTreeShown}
                    previewShown={previewShown}
                    panelsShown={preferences.panelsShown}
                    sendCodeOnChangeEnabled={sendCodeOnChangeEnabled}
                    sdkVersion={sdkVersion}
                    onSendCode={onSendCode}
                    onToggleTheme={this._toggleTheme}
                    onTogglePanels={this._togglePanels}
                    onToggleFileTree={this._toggleFileTree}
                    onTogglePreview={onTogglePreview}
                    onToggleSendCode={onToggleSendCode}
                    onChangeSDKVersion={this.props.onChangeSDKVersion}
                    onShowShortcuts={this._handleShowShortcuts}
                    theme={this.props.preferences.theme}
                    autoGenSingleDoc={preferences.autoGenSingleDoc}
                    autoExecJob={preferences.autoExecJob}
                 />
                <ModalDialog
                 visible={currentModal === 'shortcuts'} onDismiss={this._handleHideModal}>
                    <KeyboardShortcuts
                     />
                </ModalDialog>
                <Banner
                 type="success" visible={currentBanner === 'connected'}>
                    Device connected!
                </Banner>
                <Banner
                 type="error" visible={currentBanner === 'disconnected'}>
                    Device disconnected!
                </Banner>
                <Banner
                 type="info" visible={currentBanner === 'autosave-disabled'}>
                    Automatic saving has been disabled in this Packi because you have it open in
                  another tab.
                </Banner>
                <Banner
                 type="info" visible={currentBanner === 'sdk-upgraded'}>
                    This Packi was written in an older Wizzi version that is not longer supported. We
                  have upgraded the Wizzi version to
                    {sdkVersion}
                    .
                    <br
                     />
                    You might need to do some manual changes to make the Packi work correctly.
                </Banner>
                <Banner
                 type="info" visible={currentBanner === 'slow-connection'}>
                    Slow network detected. Trying to load a basic version of the editor. Some features
                  such as linting and autocomplete may not work.
                </Banner>
                <Banner
                 type="info" visible={currentBanner === 'export-unavailable'}>
                    You need to save the Packi first to export the code!
                </Banner>
            </ContentShell>
            )
        ;
    }
}
export const EditorView = withPreferences(EditorViewComp);
export default EditorView;
const styles = StyleSheet.create({
    editorAreaOuter: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column', 
        minWidth: 0, 
        minHeight: 0
     }, 
    editorAreaOuterWrapper: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'row', 
        minHeight: 0, 
        minWidth: 0
     }, 
    embedModal: {
        minWidth: 0, 
        minHeight: 0, 
        maxWidth: 'calc(100% - 48px)', 
        maxHeight: 'calc(100% - 48px)'
     }, 
    preview: {
        backgroundColor: c('content'), 
        borderLeft: `1px solid ${c('border')}`
     }, 
    previewToggle: {
        appearance: 'none', 
        position: 'absolute', 
        right: 0, 
        bottom: 0, 
        margin: 32, 
        padding: 12, 
        height: 48, 
        width: 48, 
        border: 0, 
        borderRadius: '50%', 
        backgroundColor: c('secondary'), 
        color: c('secondary-text'), 
        outline: 0, 
        transitionDuration: '170ms', 
        transitionProperty: 'box-shadow', 
        transitionTimingFunction: 'linear', 
        ':focus-visible': {
            outline: 'auto'
         }, 
        ':hover': {
            boxShadow: s('small')
         }
     }, 
    previewToggleIcon: {
        fill: 'currentColor', 
        verticalAlign: -1
     }, 
    editorComponentOuter: {
        border: '0.3em solid rgb(122, 102, 82)', 
        borderRadius: '0.5em', 
        height: '100%', 
        width: '100%'
     }, 
    editorComponent: {
        height: '100%', 
        width: '100%'
     }
 });
