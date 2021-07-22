/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\monaco-overrides.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {c, s} from '../../ThemeProvider';
import * as darkColors from './colors-dark';
import * as lightColors from './colors-light';
import {light, dark} from './monaco';
const css = String.raw;
export default css`
  /* Common overrides */
  .packi-monaco-editor .monaco-editor .line-numbers {
    color: currentColor;
    opacity: 0.5;
  }

  /* Context menu overrides */
  .packi-monaco-editor .context-view.monaco-menu-container {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: transparent;
    box-shadow: none;
    border: none;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar {
    padding: 4px;
    border-radius: 3px;
    border-style: solid;
    box-shadow: ${s('popover')} !important;
    background-color: ${c('content')} !important;
    color: ${c('text')} !important;
    border-color: transparent !important;
  }

  .packi-monaco-editor.theme-light .monaco-menu .monaco-action-bar {
    border-width: 0;
  }

  .packi-monaco-editor.theme-dark .monaco-menu .monaco-action-bar {
    border-width: 1px;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-label,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-label:focus {
    font-size: 14px;
    line-height: 1;
    color: inherit;
    border: 0;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item:focus {
    color: inherit !important;
    text-shadow: none !important;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item.disabled .action-menu-item {
    pointer-events: none;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item.focused:not(.disabled),
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item:hover:not(.disabled) {
    border-radius: 2px;
    background-color: ${c('primary')} !important;
    color: white !important;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item {
    background-color: transparent !important;
    color: inherit !important;
  }

  .packi-monaco-editor
    .monaco-menu
    .monaco-action-bar
    .action-item
    .action-menu-item:focus:not(.disabled)
    .action-label,
  .packi-monaco-editor
    .monaco-menu
    .monaco-action-bar
    .action-item:hover:not(.disabled)
    .action-label {
    color: inherit;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .keybinding {
    color: inherit;
    font-size: 85%;
    font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    line-height: 18px;
    opacity: 0.5;
    margin-left: 8px;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .keybinding,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-label:not(.separator) {
    padding: 8px 12px;
  }

  .packi-monaco-editor .monaco-action-bar .action-label.separator {
    border-bottom-color: currentColor;
    opacity: 0.1;
  }

  /* Light theme overrides */
  .packi-monaco-editor.theme-light .JsxText {
    color: ${light.colors['editor.foreground']};
  }

  .packi-monaco-editor.theme-light .JsxSelfClosingElement,
  .packi-monaco-editor.theme-light .JsxOpeningElement,
  .packi-monaco-editor.theme-light .JsxClosingElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxOpeningElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxClosingElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxSelfClosingElement {
    color: ${lightColors.syntax.property};
  }

  .packi-monaco-editor.theme-light .name-of-JsxAttribute {
    color: ${lightColors.syntax.number};
  }

  .packi-monaco-editor.theme-light .name-of-PropertyAssignment {
    color: ${lightColors.syntax.string};
  }

  .packi-monaco-editor.theme-light .name-of-PropertyAccessExpression {
    color: ${lightColors.syntax.constant};
  }

  /* Dark theme overrides */
  .packi-monaco-editor.theme-dark .JsxText {
    color: ${dark.colors['editor.foreground']};
  }

  .packi-monaco-editor.theme-dark .JsxSelfClosingElement,
  .packi-monaco-editor.theme-dark .JsxOpeningElement,
  .packi-monaco-editor.theme-dark .JsxClosingElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxOpeningElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxClosingElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxSelfClosingElement {
    color: ${darkColors.syntax.property};
  }

  .packi-monaco-editor.theme-dark .name-of-JsxAttribute {
    color: ${darkColors.syntax.number};
  }

  .packi-monaco-editor.theme-dark .name-of-PropertyAssignment {
    color: ${darkColors.syntax.string};
  }

  .packi-monaco-editor.theme-dark .name-of-PropertyAccessExpression {
    color: ${darkColors.syntax.constant};
  }

  .packi-monaco-vim-statusbar {
    font-family: ${'var(--font-monospace)'};
    font-size: 12px;
    padding: 0 16px;
    height: 24px;
    line-height: 24px;
    border-top: 1px solid ${c('border')};
  }

  .packi-monaco-vim-statusbar input {
    font-family: ${'var(--font-monospace)'};
    height: 100%;
    outline: 0;
    border: 0;
    background: transparent;
  }
`;
