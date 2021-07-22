/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\simple-editor.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import * as darkColors from './colors-dark';
import * as lightColors from './colors-light';
const css = String.raw;
const theme = ({
    ui, 
    syntax
 }: { 
    ui: lightColors.UIColors;
    syntax: lightColors.SyntaxColors;
}) => 

    css`
  .prism-code {
    background-color: ${ui.background};
    color: ${ui.text};
  }

  .prism-code ::selection {
    background: ${ui.selection};
  }

  .prism-code ::-moz-selection {
    background: ${ui.selection};
  }

  .prism-code textarea {
    outline: 0;
  }

  .prism-code .token.tag,
  .prism-code .token.property {
    color: ${syntax.property};
  }

  .prism-code .token.function {
    color: ${syntax.constant};
  }

  .prism-code .token.entity {
    color: ${syntax.property};
  }

  .prism-code .token.string,
  .prism-code .token.selector,
  .prism-code .token.char,
  .prism-code .token.builtin,
  .prism-code .token.inserted {
    color: ${syntax.string};
  }

  .prism-code .token.regexp,
  .prism-code .token.variable {
    color: ${syntax.regexp};
  }

  .prism-code .token.keyword,
  .prism-code .token.atrule,
  .prism-code .token.tag > .token.punctuation,
  .prism-code .token.important {
    color: ${syntax.keyword};
  }

  .prism-code .token.attr-name {
    color: ${syntax.number};
  }

  .prism-code .token.attr-value {
    color: ${syntax.string};
  }

  .prism-code .token.markup,
  .prism-code .token.special {
    color: ${syntax.predefined};
  }

  .prism-code .token.comment,
  .prism-code .token.prolog,
  .prism-code .token.doctype,
  .prism-code .token.cdata {
    color: ${syntax.comment};
  }

  .prism-code .token.number {
    color: ${syntax.number};
  }

  .prism-code .token.constant,
  .prism-code .token.boolean,
  .prism-code .token.constant,
  .prism-code .token.symbol,
  .prism-code .token.deleted {
    color: ${syntax.constant};
  }

  .prism-code .token.operator,
  .prism-code .token.entity,
  .prism-code .token.url,
  .prism-code .language-css .token.string,
  .prism-code .style .token.string {
    color: ${syntax.operator};
  }

  .prism-code .token.punctuation {
    color: ${syntax.comment};
  }
`
;
export const light = theme(lightColors);
export const dark = theme(darkColors);
