/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorPanels.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {Annotation} from '../../features/annotations';
import type {PanelType} from '../../features/preferences';
import ProblemsPanel from './ProblemsPanel';
import {c} from '../ThemeProvider';
import ResizablePane from '../widgets/ResizablePane';
type Props = { 
    annotations: Annotation[];
    onSelectFile: (path: string) => void;
    onShowErrorPanel: () => void;
    onTogglePanels: (panelType?: PanelType) => void;
    panelType: 'errors' | 'logs';
};

export default class EditorPanels extends React.Component<Props> {
        getSnapshotBeforeUpdate(prevProps: Props) {
            return null;
        }
        componentDidUpdate(prevProps: Props) {
        }
        _isScrolled: boolean = false;
        _panel = React.createRef<HTMLDivElement>();
        render() {
            const {
                annotations, 
                onSelectFile, 
                onShowErrorPanel, 
                onTogglePanels, 
                panelType
             } = this.props;
            return  (
                <ResizablePane
                 direction="vertical" className={css(styles.container)}>
                    <div
                     className={css(styles.panels)}>
                        <div
                         className={css(styles.header)}>
                            <button
                             onClick={onShowErrorPanel} className={css(styles.tab, panelType !== 'errors' && styles.inactive)}>
                                Problems
                            </button>
                            <div
                             className={css(styles.buttons)}>
                                <button
                                 onClick={() => 
                                    
                                        onTogglePanels()
                                } className={css(styles.button, styles.close)} />
                            </div>
                        </div>
                        <div
                         ref={this._panel} className={css(styles.panel)}>
                            {
                                panelType === 'errors' ?  (
                                    <ProblemsPanel
                                     annotations={annotations} onSelectFile={onSelectFile} />
                                    )
                                 : null
                            }
                        </div>
                    </div>
                </ResizablePane>
                )
            ;
        }
    }
const styles = StyleSheet.create({
    container: {
        height: '14em'
     }, 
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: '.75em'
     }, 
    tab: {
        display: 'inline-block', 
        appearance: 'none', 
        background: 'none', 
        border: 'none', 
        margin: 0, 
        padding: '.35em 1.5em', 
        fontSize: '.9em', 
        textTransform: 'uppercase', 
        outline: 'none', 
        opacity: 1
     }, 
    inactive: {
        opacity: 0.5
     }, 
    buttons: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        margin: '0 1em'
     }, 
    button: {
        height: 24, 
        width: 24, 
        border: 0, 
        outline: 0, 
        margin: '0 .5em', 
        appearance: 'none', 
        backgroundColor: 'transparent', 
        backgroundSize: 16, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center'
     }, 
    close: {
        backgroundImage: `url(${require('../../assets/cross.png')})`
     }, 
    clear: {
        backgroundImage: `url(${require('../../assets/clear.png')})`
     }, 
    panels: {
        backgroundColor: c('content'), 
        borderColor: c('border'), 
        borderWidth: '1px 0 0 0', 
        borderStyle: 'solid', 
        height: '100%', 
        minHeight: 0
     }, 
    panel: {
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 0, 
        padding: '.5em 0 .75em 0', 
        overflow: 'auto', 
        height: 'calc(100% - 2.5em)'
     }
 });
