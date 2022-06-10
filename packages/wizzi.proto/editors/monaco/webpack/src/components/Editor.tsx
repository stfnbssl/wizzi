import React from 'react';
import * as monaco from 'monaco-editor';
import ittfLang from '../languages/ittf.language';
import darkTheme from '../themes/ittf.dark.theme';
import lightTheme from '../themes/ittf.light.theme';

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (_moduleId: any, label: string) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

monaco.languages.register({
    id: 'ittf'
});
monaco.languages.setMonarchTokensProvider('ittf', ittfLang);
monaco.editor.defineTheme('darkTheme', darkTheme);
monaco.editor.defineTheme('lightTheme', lightTheme);

type EditorProps = { 
}
type EditorState = { 
    theme: string
}
export class Editor extends React.Component<EditorProps, EditorState> {
	divEl = React.createRef<HTMLDivElement>();
	editor = monaco.editor.IStandaloneCodeEditor;
    state: EditorState = {
        theme: 'lightTheme'
    };
    constructor(props:EditorProps) {
        super(props);
    }
    componentDidMount() {
        if (this.divEl.current) {
            this.editor = monaco.editor.create(this.divEl.current, {
                value: getCode(),
                language: 'ittf',
                theme: this.state.theme
            });
        }
    }
    handleChangeTheme = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState(
            {
                theme: ev.target.value
            },
            () => 
            {
                monaco.editor.setTheme(ev.target.value);
            }
        )
    }
    render() {
        return ( 
            <div>
                <select id='theme' value={this.state.theme} onChange={this.handleChangeTheme}>
                    <option value='lightTheme'>light</option>
                    <option value='darkTheme'>dark</option>
                </select>
                <div className="Editor" ref={this.divEl}></div>;
            </div>
        )
    }
};

function getCode() { 
    return [
        'html',
        '    $ var j = 0',
        '    body',
        '        $',
        '            var x = {',
        '                name: "bepi"',
        '            }',
        '            //.',
        '        div Hello',
        '        $*',
        '        div Bye',
        '        *$',
        '        div Tchus ${alpha} centaury',
        '        div',
        '        $include ./beta',
        '        div',
        '        $hook',
        '        $$ div Ciao',
        '        div Adieu',
        '        ./simple( name, value )',
        '        div Adieu',
        '        ul',
        '            $foreach item in files',
        '                li ${item.name}'
    ].join('\n');
}
