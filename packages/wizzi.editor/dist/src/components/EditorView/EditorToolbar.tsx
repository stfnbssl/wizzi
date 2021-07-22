/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorToolbar.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {SaveStatus, SaveHistory, PackiSaveOptions} from '../../features/packi';
import EditorTitle from './EditorTitle';
import {usePreferences} from '../../features/preferences';
import {ToolbarShell} from '../shell/ToolbarShell';
import {ToolbarTitleShell} from '../shell/ToolbarTitleShell';
import UserMenu from './UserMenu';
import {Button} from '../widgets/Button';
import {PackiIcon} from '../../assets/PackiIcon';
import {BrowserIcon} from '../../assets/BrowserIcon';
import IconButton from '../widgets/IconButton';
import {LoggedUser} from '../../features/app';
import {Packi} from '../../features/packi';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
export type EditorToolbarProps = { 
    name: string;
    description: string;
    packiProduction: PackiProduction;
    createdAt: string | undefined;
    saveStatus: SaveStatus;
    saveHistory: SaveHistory;
    isDownloading: boolean;
    isEditModalVisible: boolean;
    onSubmitMetadata: (details: { 
        name: string;
        description: string;
    }) => void;
    onShowEditModal: () => void;
    onDismissEditModal: () => void;
    onDownloadCode: () => Promise<void>;
    onPublishAsync: (options?: PackiSaveOptions) => Promise<void>;
    loggedUser: LoggedUser | undefined;
    splitViewKind: string;
    // isResolving: boolean;
    isAuthModalVisible: boolean;
    isWizziJobWaiting: boolean;
    onChangeSplitViewKind: (e: any) => void;
    onExecuteWizziJob: () => void;
    onShowPackiManager: () => void;
    creatorUsername?: string;
};
export function EditorToolbar(props: EditorToolbarProps) {

    const [preferences] = usePreferences();
    const {
        name, 
        description, 
        mainIttf, 
        wizziSchema, 
        packiProduction, 
        createdAt, 
        saveHistory, 
        saveStatus, 
        isDownloading, 
        isEditModalVisible, 
        onSubmitMetadata, 
        onShowEditModal, 
        onDismissEditModal, 
        onDownloadCode, 
        onPublishAsync, 
        splitViewKind, 
        onChangeSplitViewKind, 
        loggedUser, 
        isAuthModalVisible, 
        isWizziJobWaiting, 
        generatedPreviewURL, 
        onExecuteWizziJob, 
        onShowPackiManager
     } = props;
    const {
        theme
     } = preferences;
    const isPublishing = saveStatus === 'publishing';
    const isPublished = saveStatus === 'published';
    console.log('EditorToolbar.props', props, mainIttf, wizziSchema);
    return  (
        <ToolbarShell
        >
            <ToolbarTitleShell
            >
                <div
                 className={css(styles.logo)}>
                    <PackiIcon
                     theme={theme} />
                </div>
                <EditorTitle 
                    name={name}
                    description={description}
                    mainIttf={mainIttf}
                    wizziSchema={wizziSchema}
                    createdAt={createdAt}
                    saveHistory={saveHistory}
                    saveStatus={saveStatus}
                    loggedUser={loggedUser}
                    isEditModalVisible={isEditModalVisible}
                    onSubmitMetadata={onSubmitMetadata}
                    onShowEditModal={onShowEditModal}
                    onDismissEditModal={onDismissEditModal}
                 />
            </ToolbarTitleShell>
            <div
             className={css(styles.buttons)}>
                {
                    packiProduction == 'artifact'
                     &&  (
                        <IconButton
                         responsive title="Browse generated" onClick={() => 
                            
                                window.open(generatedPreviewURL)
                        }>
                            <BrowserIcon
                             />
                        </IconButton>
                        )
                    
                }
                {
                    packiProduction == 'package'
                     &&  (
                        <IconButton
                         responsive title="Generate package" onClick={onExecuteWizziJob}>
                            <svg 
                                width="20px"
                                height="18px"
                                viewBox="0 0 20 18"
                                fill="none"
                            >
                                <path 
                                    d="M13.333 15l5-5-5-5M6.667 5l-5 5 5 5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                            </svg>
                        </IconButton>
                        )
                    
                }
                <IconButton 
                    responsive
                    title="Download as zip"
                    onClick={onDownloadCode}
                    disabled={isDownloading || isPublishing}
                >
                    <svg
                     width="20" height="20">
                        <path
                         d="M14.167 10H5.833L10 16.667 14.167 10z" />
                        <path
                         d="M2.5 18.333h15M10 10V1.667" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </IconButton>
                <UserMenu
                 loggedUser={loggedUser} />
            </div>
        </ToolbarShell>
        )
    ;
}
export default EditorToolbar;
const styles = StyleSheet.create({
    logo: {
        width: 24, 
        height: 24, 
        marginLeft: 16, 
        marginRight: 16
     }, 
    buttons: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        position: 'relative', 
        zIndex: 5
     }, 
    saveButton: {
        height: 40, 
        fontWeight: 600, 
        minWidth: 80, 
        fontSize: '16px', 
        marginRight: 16
     }
 });
