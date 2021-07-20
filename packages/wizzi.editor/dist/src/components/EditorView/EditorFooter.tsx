/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorFooter.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {LoggedUser} from '../../features/app';
import {SDKVersion} from '../../features/packi';
import {Annotation} from '../../features/annotations';
import {Shortcuts} from './KeyboardShortcuts';
import {PreferencesContextType, PanelType, withPreferences} from '../../features/preferences';
import {FooterShell} from '../shell/FooterShell';
import {c} from '../ThemeProvider';
import FooterButton from '../widgets/FooterButton';
import IconButton from '../widgets/IconButton';
import LoadingText from '../widgets/LoadingText';
import MenuButton from '../widgets/MenuButton';
import ShortcutLabel from '../widgets/ShortcutLabel';
import ToggleSwitch from '../widgets/ToggleSwitch';
export type EditorFooterProps = PreferencesContextType & { 
    annotations: Annotation[];
    fileTreeShown: boolean;
    previewShown: boolean;
    panelsShown: boolean;
    sendCodeOnChangeEnabled: boolean;
    loggedUser: LoggedUser;
    sdkVersion: SDKVersion;
    isLocalWebPreview: boolean;
    onToggleTheme: () => void;
    onTogglePanels: (panelType?: PanelType) => void;
    onToggleFileTree: () => void;
    onTogglePreview: () => void;
    onToggleSendCode: () => void;
    onChangeSDKVersion: (sdkVersion: SDKVersion, isLocalWebPreview?: boolean) => void;
    onShowShortcuts: () => void;
    onSendCode: () => void;
    theme: string;
    autoGenSingleDoc: boolean;
    autoExecJob: boolean;
};
function EditorFooterComp(props: EditorFooterProps) {

    const {
        annotations, 
        loggedUser, 
        fileTreeShown, 
        previewShown, 
        panelsShown, 
        sendCodeOnChangeEnabled, 
        sdkVersion, 
        isLocalWebPreview, 
        onSendCode, 
        onToggleTheme, 
        onTogglePanels, 
        onToggleFileTree, 
        onTogglePreview, 
        onToggleSendCode, 
        onShowShortcuts, 
        theme, 
        autoGenSingleDoc, 
        autoExecJob
     } = props;
    const _toggleAutoGenSingleDoc = () => 
    
        props.setPreferences({
            autoGenSingleDoc: !props.preferences.autoGenSingleDoc
         })
    ;
    const _toggleAutoExecJob = () => 
    
        props.setPreferences({
            autoExecJob: !props.preferences.autoExecJob
         })
    ;
    const loadingItems = annotations.filter(a => 
    
        a.severity < 0
    );
    const isLoading = loadingItems.length >= 1;
    const isErrorFatal = !isLoading && annotations.some(a => 
    
        a.severity > 3
    );
    const warningCount = annotations.filter(a => 
    
        a.severity === 2
    ).length
    ;
    let text: any;
    if (isLoading) {
        text = isLoading ? `${loadingItems[0].message}${
            loadingItems.length > 1
             ? ` (+${loadingItems.length - 1} more)`
             : ''}
            ` : '';
    }
    else {
        const errors = annotations.filter(a => 
        
            a.severity >= 3
        );
        if (errors.length) {
            const {
                message, 
                location, 
                action
             } = errors[0];
            const prefix = location ? `${location.fileName} (${location.startLineNumber}:${location.startColumn}) ` : '';
            const suffix = action ?  (
                <span
                 className={css(styles.action)} onClick={(event) => {
                    
                        event.stopPropagation();
                        action.run();
                    }
                }>
                    {action.title}
                </span>
                )
             : errors.length > 1 ? `(+${errors.length - 1} more)` : '';
            text =  (
            <span
            >
                {prefix}
                {message.split('\n')[0] + ' '}
                {suffix}
            </span>
            )
            ;
        }
    }
    return  (
        <FooterShell
         type={isLoading ? 'loading' : isErrorFatal ? 'error' : null}>
            <div
             className={css(styles.left)}>
                {
                    isLoading ?  (
                        <LoadingText
                         className={css(styles.loadingText)} onClick={() => 
                            
                                onTogglePanels('errors')
                        }>
                            {text}
                        </LoadingText>
                        )
                     :  (
                        <button
                         onClick={() => 
                            
                                onTogglePanels(text ? 'errors' : undefined)
                        } className={css(styles.statusText, text ? (isErrorFatal ? styles.errorTextFatal : styles.errorText) : styles.successText)}>
                            {
                                text
                                 ?? (`No errors${
                                warningCount
                                 ? `, ${warningCount} warning${
                                    warningCount > 1
                                     ? 's'
                                     : ''}
                                    `
                                 : ''}
                                `)
                            }
                        </button>
                        )
                    
                }
            </div>
            <MenuButton
             icon={require('../../assets/settings-icon.png')} label={ (
                <span
                 className={css(styles.buttonLabel)}>
                    Auth
                </span>
                )
            } content={ (
                <React.Fragment
                >
                    <div
                     style={{
                            paddingLeft: '15px'
                         }}>
                        Logged uid: {loggedUser}
                    </div>
                </React.Fragment>
                )
            } />
            <MenuButton
             icon={require('../../assets/settings-icon.png')} label={ (
                <span
                 className={css(styles.buttonLabel)}>
                    Wizzi
                </span>
                )
            } content={ (
                <React.Fragment
                >
                    <ToggleSwitch
                     checked={autoGenSingleDoc} onChange={_toggleAutoGenSingleDoc} label="Auto gen single doc" />
                    <ToggleSwitch
                     checked={autoExecJob} onChange={_toggleAutoExecJob} label="Auto exec job" />
                </React.Fragment>
                )
            } />
            <MenuButton
             icon={require('../../assets/settings-icon.png')} label={ (
                <span
                 className={css(styles.buttonLabel)}>
                    Editor
                </span>
                )
            } content={ (
                <React.Fragment
                >
                    <div
                     className={css(styles.buttonItem, styles.buttonItemEditorPane)} onClick={onShowShortcuts}>
                        <IconButton
                         small title="Show keyboard shortcuts" label="Shortcuts" />
                        <ShortcutLabel
                         combo={Shortcuts.shortcuts.combo} className={css(styles.buttonItemShortcut)} />
                    </div>
                    <div
                     className={css(styles.menuSeparator)} />
                    <ToggleSwitch
                     checked={fileTreeShown} onChange={onToggleFileTree} label="Files" />
                    <ToggleSwitch
                     checked={panelsShown} onChange={() => 
                        
                            onTogglePanels()
                    } label="Panel" />
                    <ToggleSwitch
                     checked={theme !== 'light'} onChange={onToggleTheme} label="Dark theme" />
                </React.Fragment>
                )
            } />
            <div
             className={css(styles.devicePreviewSwitch)}>
                <ToggleSwitch
                 checked={previewShown} onChange={onTogglePreview} label="Preview" />
            </div>
        </FooterShell>
        )
    ;
}

export const EditorFooter = withPreferences(EditorFooterComp);
export default EditorFooter;

const styles = StyleSheet.create({
    left: {
        display: 'flex', 
        alignItems: 'stretch', 
        flex: 1, 
        minWidth: 0, 
        overflow: 'hidden'
     }, 
    loadingText: {
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap', 
        padding: '.5em', 
        width: '100%', 
        cursor: 'pointer'
     }, 
    statusText: {
        border: 0, 
        outline: 0, 
        margin: 0, 
        appearance: 'none', 
        backgroundColor: 'transparent', 
        backgroundSize: 16, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: '1em center', 
        display: 'inline-block', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap', 
        padding: '.25em .5em .25em 3em', 
        minWidth: 200, 
        width: '100%', 
        textAlign: 'left'
     }, 
    successText: {
        backgroundImage: `url(${require('../../assets/checkmark.png')})`
     }, 
    errorText: {
        backgroundImage: `url(${require('../../assets/cross-red.png')})`, 
        color: c('error')
     }, 
    errorTextFatal: {
        backgroundImage: `url(${require('../../assets/cross-light.png')})`
     }, 
    errorBorder: {
        borderColor: c('error-text')
     }, 
    devicesCount: {
        position: 'absolute', 
        top: 4, 
        right: 6, 
        height: 20, 
        minWidth: 20, 
        borderRadius: '50%', 
        backgroundColor: c('text'), 
        color: c('background'), 
        opacity: 0.5
     }, 
    devicePane: {
        padding: '0 16px'
     }, 
    devicePaneItem: {
        margin: '0 -16px'
     }, 
    deviceLabel: {
        display: 'flex', 
        alignItems: 'center', 
        whiteSpace: 'nowrap', 
        padding: '8px 0'
     }, 
    deviceIcon: {
        height: 16, 
        width: 16, 
        marginRight: 8, 
        fill: 'currentColor'
     }, 
    noDevicesMessage: {
        whiteSpace: 'nowrap', 
        margin: 8
     }, 
    buttonLabel: {
        display: 'none', 
        [`@media (min-width: ${700 + 20}px)`]: {
                display: 'inline'
             }
     }, 
    buttonItem: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
     }, 
    buttonItemShortcut: {
        userSelect: 'none', 
        cursor: 'pointer', 
        marginLeft: 12
     }, 
    buttonItemEditorPane: {
        margin: '0 12px'
     }, 
    title: {
        margin: '16px 0 8px'
     }, 
    action: {
        textDecoration: 'underline', 
        cursor: 'pointer', 
        fontWeight: 'bold'
     }, 
    devicePreviewSwitch: {
        display: 'none', 
        [`@media (min-width: ${700}px)`]: {
                display: 'block'
             }
     }, 
    menuSeparator: {
        margin: '6px 0', 
        borderBottom: `1px solid ${c('border')}`
     }
 });
