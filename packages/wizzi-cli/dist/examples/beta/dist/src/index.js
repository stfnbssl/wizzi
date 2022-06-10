/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\beta\.wizzi\src\index.js.ittf
    utc time: Mon, 15 Feb 2021 13:20:08 GMT
*/
'use strict';
// for module hotReplacement
// see https://nativescript.org/blog/deep-dive-into-hot-module-replacement-with-webpack-part-two-handling-updates/

import hjsMe from './print.js';
import './highlight.default.min.css';
import './index.css';

function page() {
    const element = panel('main');
    const fa_panel = panel('fa-panel');
    const thumbsup_icon = icon('thumbs-up');
    const arrowleft_icon = icon('arrow-left');
    const hello_panel = panel('hello-panel', 'Hello webpack');
    fa_panel.appendChild(arrowleft_icon)
    fa_panel.appendChild(thumbsup_icon)
    element.appendChild(fa_panel)
    element.appendChild(hello_panel)
    var jsCode = hjsMe([
        'function alpha(a, b) {', 
        '    return a + b;', 
        '}'
    ].join('\n'), 'js');
    element.appendChild(codePanel(jsCode))
    var htmlCode = hjsMe([
        '<div class="main">', 
        '    <span>return a + b;</span>', 
        '</div>'
    ].join('\n'), 'html');
    element.appendChild(codePanel(htmlCode))
    return element;
}

function panel(cn, innerHTML) {
    const element = document.createElement('div');
    element.className = cn;
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}

function icon(name) {
    const element = document.createElement('i');
    element.className = 'fas fa-' + name + ' fa-5x';
    return element;
}

function codePanel(innerHTML) {
    const element = document.createElement('div');
    element.className = 'code-panel';
    var e_pre = document.createElement('pre');
    e_pre.className = 'prettyprint source';
    var e_code = document.createElement('code');
    e_code.innerHTML = innerHTML;
    e_pre.appendChild(e_code)
    element.appendChild(e_pre)
    return element;
}

const rootElement = page();
document.body.appendChild(rootElement)

if (module.hot) {
    module.hot.accept([
        './print.js'
    ], function() {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(rootElement)
        // Re-render the "component" to update the click handler
        rootElement(page())
        document.body.appendChild(rootElement)
    })
}
