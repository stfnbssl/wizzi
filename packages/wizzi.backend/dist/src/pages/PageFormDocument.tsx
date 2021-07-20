/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\pages\PageFormDocument.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:38:15 GMT
*/
import jsesc from 'jsesc';
import React from 'react';
const css = String.raw;
const PageCss = css`
              :root {
                --font-normal: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                --font-monospace: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
                  monospace;
              }

              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: auto;
              }


              body {
                font-family: var(--font-normal);
                font-size: 14px;
                line-height: 1.42857143;
                overscroll-behavior: none;
              }

              div {
                scrollbar-width: thin;
                scrollbar-color: var(--color-disabled) var(--color-background);
              }

              @media (hover) {
                ::-webkit-scrollbar {
                  width: 12px;
                  height: 12px;
                  background: var(--color-background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--color-disabled);
                  border-radius: 10px;
                  border: 3px var(--color-background) solid;
                }
              }

              button,
              input,
              select,
              textarea {
                font: inherit;
                color: inherit;
                line-height: inherit;
              }

              button {
                cursor: pointer;
              }

              button[disabled] {
                cursor: default;
              }

              a {
                color: #4099ff;
              }
            `;
type PageFormDocumentProps = { 
    data: object;
    queryParams: object;
    content?: { 
        html: string;
        css: { 
            content: string;
            renderedClassNames: string[];
        };
    };
};

export default function PageFormDocument(props: PageFormDocumentProps) {
    
        const {
            data, 
            queryParams, 
            content
         } = props;
        return  (
            <html
            >
                <head
                >
                    <meta
                     charSet="utf-8" />
                    <meta
                     httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                     name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
                    <link
                     rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600" />
                    <link
                     rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" />
                    <style
                     type="text/css" dangerouslySetInnerHTML={{
                            __html: PageCss
                         }} />
                    <script
                     dangerouslySetInnerHTML={{
                            __html: `  window.__INITIAL_DATA__ = ${jsesc({
                                data, 
                                queryParams
                             }, {
                                quotes: 'double', 
                                isScriptContext: true
                             })}`
                         }} />
                </head>
                <body
                >
                    <section
                     id="root" />
                    <script
                     src="/static/pageforms/main.bundle.js" />
                </body>
            </html>
            )
        ;
    }
