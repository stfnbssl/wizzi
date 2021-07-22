/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\CodeView\SyntaxHighlighter.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {FunctionComponent} from 'react';
import './SyntaxHighlighter.css';
import { Prism } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export type SyntaxHighlighterProps = { 
    filePath: string;
    code: string;
    showLineNumbers: boolean;
};
export class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {
    componentDidMount() {
        const el1 = document.querySelector('.syntax-highlight-container > pre');
        console.log('SyntaxHighlighter.el1', el1);
        if (el1 && el1.style) {
            el1.style.margin = 0;
            el1.style.padding = 0;
            el1.style.height = '100%';
        }
    }
    render() {
        const language = getLanguage(this.props.filePath);
        return  (
            <div
             className="syntax-highlight-container">
                <Prism
                 language={language} showLineNumbers={this.props.showLineNumbers} style={dark}>
                    {this.props.code}
                </Prism>
            </div>
            )
        ;
    }
}
export default SyntaxHighlighter;
const mimeLanguageMap = {
    '.js': 'javascript', 
    '.jsx': 'javascript', 
    '.ts': 'typescript', 
    '.tsx': 'typescript', 
    '.html': 'html', 
    '.css': 'css', 
    '.svg': 'svg', 
    '.json': 'json', 
    '.xml': 'xml'
 };
function getLanguage(path: string) {

    const ext2 = path.substr(path.lastIndexOf('.'));
    const rest = path.substr(0, path.lastIndexOf('.'));
    const ext = rest.substr(rest.lastIndexOf('.'));
    if (ext2 == '.ittf') {
        const lang = mimeLanguageMap[ext];
        return lang || 'text';
    }
    else {
        const lang = mimeLanguageMap[ext2];
        return lang || 'text';
    }
}
