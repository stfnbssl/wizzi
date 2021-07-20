/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Markdown\MarkdownPreview.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import classnames from 'classnames';
import escape from 'escape-html';
import marked from 'marked';
import {highlight, languages} from 'prismjs/components/prism-core';
import * as React from 'react';
import sanitize from 'sanitize-html';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-diff';
import './markdown.css';
import {light, dark} from '../Editor/themes/simple-editor';
import {withThemeName, ThemeName} from '../../features/preferences/index';
import {c} from '../ThemeProvider';
type Props = { 
    source: string;
    theme: ThemeName;
};

// use a custom renderer to customize the `a` tag and add `target='_blank'`
const renderer = new marked.Renderer();
renderer.link = function(args: any) {

    return marked.Renderer.prototype.link.apply(this, args).replace(/^<a/, '<a target="_blank"');
}
;
class MarkdownPreview extends React.Component<Props> {
    render() {
        const {
            source, 
            theme
         } = this.props;
        let html = marked(source, {
            renderer, 
            gfm: true, 
            silent: true, 
            highlight: (code: string, lang: string) => {
            
                const grammar = lang === 'js' ? languages.jsx : languages[lang];
                const language = lang === 'js' ? 'jsx' : lang;
                return grammar ? highlight(code, grammar, language) : escape(code);
            }
            
         });
        html = sanitize(html, require('./santize-config.json'));
        return  (
            <React.Fragment
            >
                <div
                 dangerouslySetInnerHTML={{
                        __html: html
                     }} className={classnames(css(styles.content), 'markdown-body', 'prism-code')} />
                <style
                 type="text/css" dangerouslySetInnerHTML={{
                        __html: theme === 'dark' ? dark : light
                     }} />
            </React.Fragment>
            )
        ;
    }
}
export default withThemeName(MarkdownPreview);
const styles = StyleSheet.create({
    content: {
        flex: 1, 
        overflow: 'auto', 
        backgroundColor: c('content'), 
        color: c('text'), 
        padding: 40, 
        '--border-color': c('border'), 
        '--blockquote-text-color': c('text'), 
        '--code-background-color': c('hover')
     }
 });
