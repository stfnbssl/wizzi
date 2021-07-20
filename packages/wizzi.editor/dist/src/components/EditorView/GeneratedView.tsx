/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\GeneratedView.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewListIcon from '@material-ui/icons/ViewList';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import {BrowserIcon} from '../../assets/BrowserIcon';
import {TreeIcon} from '../../assets/TreeIcon';
import {DebugIcon} from '../../assets/DebugIcon';
import SyntaxHighlighter from '../CodeView/SyntaxHighlighter';
import WebFrame from '../widgets/WebFrame';
type ViewKindType = 'generated' | 'mtreeIttf' | 'mTreeDebugInfo' | 'browser';
type Props = { 
    classes: any;
    generatedContent: string;
    generatedSourcePath?: string;
    mTreeBuildUpScript?: string;
    mTreeIttf?: string;
    generatedPreviewURL?: string;
    splitViewKind: string;
    onMTreePreview: () => void;
    onMTreeDebugInfoPreview: () => void;
};
type State = { 
    view: ViewKindType | null;
};
class GeneratedView extends React.Component<Props, State> {
    state = {
        view: 'generated' as ViewKindType
    }
    ;
    _handleGenerated = () => 
    
        this.setState({
            view: 'generated'
         })
    ;
    _handleMTree = () => {
    
        this.props.onMTreePreview();
        this.setState({
            view: 'mtreeIttf'
         })
    }
    ;
    _handleMTreeDebugInfo = () => {
    
        this.props.onMTreeDebugInfoPreview();
        this.setState({
            view: 'mTreeDebugInfo'
         })
    }
    ;
    _handleBrowser = () => 
    
        this.setState({
            view: 'browser'
         })
    ;
    render() {
        const {
            classes, 
            splitViewKind
         } = this.props;
        const {
            view
         } = this.state;
        const selectedFile = 'gen.txt';
        const files: PackiFiles = {
            [selectedFile]: {
                contents: this.props.generatedContent, 
                type: "CODE"
             }
         };
        return  (
            <div
             className={splitViewKind === 'right' ? classes.containerFull : classes.container}>
                {
                    view === 'generated'
                     &&  (
                        <div
                         className={classes.editor}>
                            <SyntaxHighlighter 
                                className={classes.syntaxHigh}
                                code={this.props.generatedContent}
                                filePath={selectedFile}
                                lineNumbers={true}
                             />
                        </div>
                        )
                    
                }
                {
                    view === 'mtreeIttf'
                     &&  (
                        <div
                         className={classes.editor}>
                            <SyntaxHighlighter 
                                className={classes.syntaxHigh}
                                code={this.props.mTreeIttf || ''}
                                filePath={'mTree.ittf'}
                                lineNumbers={true}
                             />
                        </div>
                        )
                    
                }
                {
                    view === 'mTreeDebugInfo'
                     &&  (
                        <div
                         className={classes.editor}>
                            <SyntaxHighlighter 
                                className={classes.syntaxHigh}
                                code={this.props.mTreeBuildUpScript || ''}
                                filePath={'mTreeBuildUpScript.js'}
                                lineNumbers={true}
                             />
                        </div>
                        )
                    
                }
                {
                    view === 'browser'
                     &&  (
                        <div
                         className={classes.browserOuter}>
                            {
                                ((this.props.generatedSourcePath.endsWith('.html.ittf') || this.props.generatedSourcePath.endsWith('.svg.ittf')) ?  (
                                    <WebFrame
                                     previewURL={this.props.generatedPreviewURL} />
                                    )
                                 :  (
                                    <h1
                                    >
                                        No viewer for document  
                                        {this.props.generatedSourcePath}
                                    </h1>
                                    )
                                )
                            }
                        </div>
                        )
                    
                }
                <div
                 className={classes.sidebar}>
                    <div
                     className={classes.sbItem}>
                        <Tooltip
                         title="View generated content">
                            <IconButton
                             onClick={this._handleGenerated} classes={{
                                    root: classes.iconButton
                                 }}>
                                <ViewListIcon
                                 />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div
                     className={classes.sbItem}>
                        <Tooltip
                         title="View mTree">
                            <IconButton
                             onClick={this._handleMTree} classes={{
                                    root: classes.iconButton
                                 }}>
                                <AccountTreeIcon
                                 />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div
                     className={classes.sbItem}>
                        <Tooltip
                         title="View mTree build script">
                            <IconButton
                             onClick={this._handleMTreeDebugInfo} classes={{
                                    root: classes.iconButton
                                 }}>
                                <DebugIcon
                                 />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div
                     className={classes.sbItem}>
                        <Tooltip
                         title="Browse artifact">
                            <IconButton
                             onClick={this._handleBrowser} classes={{
                                    root: classes.iconButton
                                 }}>
                                <BrowserIcon
                                 />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            )
        ;
    }
}
const muiStyles = (theme: Theme) => 

    createStyles({
        container: {
            display: 'flex', 
            flexDirection: 'row', 
            borderLeft: '1px solid #cccccc', 
            width: '44vw', 
            height: '100%'
         }, 
        containerFull: {
            display: 'flex', 
            flexDirection: 'row', 
            borderLeft: '1px solid #cccccc', 
            width: '100%', 
            height: '100%'
         }, 
        editor: {
            width: '90%'
         }, 
        browserOuter: {
            border: '0.3em solid rgb(122, 102, 82)', 
            borderRadius: '0.5em', 
            width: '90%'
         }, 
        syntaxHigh: {
            margin: 0, 
            padding: 0, 
            height: '100%'
         }, 
        sidebar: {
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'start', 
            width: '10%', 
            background: theme.palette.primary.light
         }, 
        sbItem: {
            display: 'flex', 
            justifyContent: 'center'
         }, 
        iconButton: {
            padding: '10px'
         }
     })
;
export default withStyles(muiStyles)(GeneratedView);
