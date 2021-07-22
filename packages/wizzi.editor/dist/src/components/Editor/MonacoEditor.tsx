/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\MonacoEditor.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
import {SimpleEditorModelResolverService} from 'monaco-editor/esm/vs/editor/standalone/browser/simpleServices';
import {StaticServices} from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices';
import * as React from 'react';
import  '../../features/packi';
import {Annotation} from '../../features/annotations/index';
import {getFileLanguage, getRelativePath, getAbsolutePath} from '../../features/file/index';
import {prettierCode} from '../../features/prettier/index';
import {withThemeName, ThemeName} from '../../features/preferences/index';
import ResizeDetector from '../widgets/ResizeDetector';
import {EditorProps} from './EditorProps';
import {light, dark} from './themes/monaco';
import ittfLang from './languages/ittf.language';
import ittfDarkTheme from './themes/ittf.dark.theme';
import ittfLightTheme from './themes/ittf.light.theme';
import overrides from './themes/monaco-overrides';


/**
    * 
    * Monkeypatch to make 'Find All References' work across multiple files
    * https://github.com/Microsoft/monaco-editor/issues/779#issuecomment-374258435
    * 
*/

// @ts-ignore
SimpleEditorModelResolverService.prototype.findModel = function(_: any, resource: any) { 
    return monaco.editor.getModels().find(model => 
        
            model.uri.toString() === resource.toString()
        );
}
;


// @ts-ignore
global.MonacoEnvironment = { getWorkerUrl(moduleId: string, label: string) { switch (label) { case 'json': { return '/static/packi/json.worker.bundle.js'; } case 'html': { return '/static/packi/html.worker.bundle.js'; } case 'css': case 'scss': case 'less': { return '/static/packi/css.worker.bundle.js'; } case 'typescript': case 'javascript': { return '/static/packi/ts.worker.bundle.js'; } default: { return '/static/packi/editor.worker.bundle.js'; } } }   }; 
monaco.languages.register({
    id: 'ittf'
 })
monaco.languages.setMonarchTokensProvider('ittf', ittfLang);
monaco.editor.defineTheme('ittfLight', ittfLightTheme);
monaco.editor.defineTheme('ittfDark', ittfDarkTheme);
monaco.editor.defineTheme('light', light);
monaco.editor.defineTheme('dark', dark);

/**
    * 
    * Use prettier to format code.
    * This will replace the default formatter.
    * 
*/
const documentFormattingProvider: monaco.languages.DocumentFormattingEditProvider = {
    async provideDocumentFormattingEdits(model) {
        const text = await prettierCode(model.uri.path, model.getValue());
        return [
                {
                    range: model.getFullModelRange(), 
                    text
                 }
            ];
    }
    
 };
monaco.languages.registerDocumentFormattingEditProvider('javascript', documentFormattingProvider);
monaco.languages.registerDocumentFormattingEditProvider('typescript', documentFormattingProvider);
monaco.languages.registerDocumentFormattingEditProvider('markdown', documentFormattingProvider);
export type MonacoEditorProps = EditorProps & { 
    theme: ThemeName;
};
type State = { 
};

// Store editor states such as cursor position, selection and scroll position for each model
const editorStates = new Map();

// Store details about typings we have requested and loaded
const requestedTypings = new Map();
const extraLibs = new Map();
const codeEditorService = StaticServices.codeEditorService.get();
const findModel = (path: string) => 

    monaco.editor.getModels().find(model => 
    
        model.uri.path === (`/${path}`)
    )
;
class MonacoEditorComp extends React.Component<MonacoEditorProps, State> {
    static defaultProps: Partial<MonacoEditorProps> = {
        lineNumbers: 'on', 
        wordWrap: 'on', 
        scrollBeyondLastLine: false, 
        minimap: {
            enabled: false
         }, 
        fontFamily: 'var(--font-monospace)', 
        fontLigatures: true
    }
    ;
    state: State = {};
    static removePath(path: string) {
        // Remove editor states
        editorStates.delete(path);
        
        // Remove associated models
        const model = findModel(path);
        model?.dispose?.();
    }
    static renamePath(oldPath: string, newPath: string) {
        const selection = editorStates.get(oldPath);
        editorStates.delete(oldPath);
        editorStates.set(newPath, selection);
        this.removePath(oldPath);
    }
    getTheme(theme: string, filePath: string) {
        if (filePath.endsWith('.ittf')) {
            return theme == 'ligth' ? 'ittfLight' : 'ittfDark';
        }
        else {
            return theme;
        }
    }
    componentDidMount() {
        const {
            files, 
            selectedFile, 
            autoFocus, 
            updateFiles, 
            onSelectFile, 
            ...rest
         } = this.props;
        
        // The methods provided by the service are on it's prototype
        
        // So spreading this object doesn't work, we must mutate it
        codeEditorService.openCodeEditor = async ({
            resource, 
            options
         }: any, editor: monaco.editor.IStandaloneCodeEditor) => {
        
            // Remove the leading slash added by the Uri
            this.props.onSelectFile(resource.path.replace(/^\//, ''));
            editor.setSelection(options.selection);
            editor.revealLine(options.selection.startLineNumber);
            return {
                    getControl: () => 
                    
                        editor
                    
                 };
        }
        ;
        const options = {
            ...rest, 
            theme: this.getTheme(rest.theme, selectedFile)
         };
        const editor = monaco.editor.create(this._node.current as HTMLDivElement, options, codeEditorService);
        this._editor = editor;
        this._disposables = [
            editor
        ];
        this._disposables.push(editor.onDidChangeModelContent(this._handleEditFile));
        this._openFile(selectedFile, files[selectedFile]?.contents  as string, autoFocus)
        for (const path in files) {
            const file = files[path];
            if (file.type === 'CODE') {
                this._initializeFile(path, file.contents);
            }
            // Load all the files so the editor can provide proper intellisense
        }
    }
    componentDidUpdate(prevProps: MonacoEditorProps, prevState: State) {
        const {
            selectedFile, 
            files, 
            autoFocus, 
            theme, 
            updateFiles, 
            onSelectFile, 
            ...rest
         } = this.props;
        const options = {
            ...rest, 
            theme: this.getTheme(theme, selectedFile)
         };
        if (this._editor) {
            this._editor.updateOptions(options);
            const model = this._editor.getModel();
            const value: string = files[selectedFile]?.contents as any;
            if (selectedFile !== prevProps.selectedFile) {
                // Save the editor state for the previous file so we can restore it when it's re-opened
                editorStates.set(prevProps.selectedFile, this._editor.saveViewState());
                this._openFile(selectedFile, value, autoFocus);
            }
            else {
                if (model && value !== model.getValue()) {
                    // @ts-ignore
                    this._editor.executeEdits(null, [
                        {
                            range: model.getFullModelRange(), 
                            text: value
                         }
                    ])
                }
            }
        }
        if (theme !== prevProps.theme || selectedFile !== prevProps.selectedFile) {
            monaco.editor.setTheme(this.getTheme(theme, selectedFile))
        }
        if (prevProps.files !== this.props.files) {
            for (const path in this.props.files) {
                const file = this.props.files[path];
                if (file.type === 'CODE' && file.contents !== prevProps.files[path]?.contents && path !== selectedFile) {
                    this._initializeFile(path, file.contents);
                }
            }
        }
    }
    componentWillUnmount() {
        this._disposables.forEach(dis => 
        
            dis.dispose()
        )
    }
    
    _initializeFile = (path: string, value: string) => {
        let model = findModel(path);
        if (model && !model.isDisposed()) {
            // If a model exists, we need to update it's value
            // This is needed because the content for the file might have been modified externally
            // Use `pushEditOperations` instead of `setValue` or `applyEdits` to preserve undo stack
            // @ts-ignore
            model.pushEditOperations([], [
                {
                    range: model.getFullModelRange(), 
                    text: value
                 }
            ])
        }
        else {
            if (path.endsWith('.ittf')) {
                model = monaco.editor.createModel(value, 'ittf', monaco.Uri.from({
                    scheme: 'file', 
                    path
                 }))
                ;
            }
            else {
                model = monaco.editor.createModel(value, undefined, monaco.Uri.from({
                    scheme: 'file', 
                    path
                 }))
                ;
            }
            model.updateOptions({
                tabSize: 2, 
                insertSpaces: true
             })
        }
    };
    
    _openFile = (path: string, value: string, focus?: boolean) => {
        console.log('MonacoEditor', '_openFile', path, value);
        this._initializeFile(path, value);
        const model = findModel(path);
        if (this._editor && model) {
            this._editor.setModel(model);
            
            // Restore the editor state for the file
            const editorState = editorStates.get(path);
            if (editorState) {
                this._editor.restoreViewState(editorState);
            }
            if (focus) {
                this._editor.focus();
            }
        }
    };
    
    _handleEditFile = (_event: monaco.editor.IModelContentChangedEvent):  void => {
        const model = this._editor?.getModel?.();
        if (model) {
            const value = model.getValue();
            console.log('MonacoEditor', '_handleEditFile', value);
            if (value !== this.props.files[this.props.selectedFile]?.contents) {
                this.props.updateFiles(() => 
                
                    ({
                        [this.props.selectedFile]: {
                            type: 'CODE', 
                            contents: value
                         }
                     })
                )
            }
        }
    };
    _handleResize = debounce(() => 
    
        this._editor?.layout?.()
    , 50, {
        leading: true, 
        trailing: true
     });
    _disposables: monaco.IDisposable[] = [];
    _editor: monaco.editor.IStandaloneCodeEditor | null = null;
    _node = React.createRef<HTMLDivElement>();
    
    _statusbar = React.createRef<HTMLDivElement>();
    
    render() {
        return  (
            <div
             className={css(styles.container)}>
                <style
                 type="text/css" dangerouslySetInnerHTML={{
                        __html: overrides
                     }} />
                <ResizeDetector
                 onResize={this._handleResize}>
                    <div
                     ref={this._node} className={classnames(css(styles.editor), 'packi-monaco-editor', `theme-${this.props.theme}`)} />
                </ResizeDetector>
            </div>
            )
        ;
    }
}

export const MonacoEditor = withThemeName(MonacoEditorComp);

export default withThemeName(MonacoEditorComp);

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column', 
        height: '100%', 
        width: '100%'
     }, 
    editor: {
        height: '100%', 
        width: '100%'
     }
 });
