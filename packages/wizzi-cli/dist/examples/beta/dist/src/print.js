/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\beta\.wizzi\src\print.js.ittf
    utc time: Mon, 15 Feb 2021 13:20:08 GMT
*/
'use strict';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'));
function hjsMe(code, lang) {
    lang = lang || 'js';
    const highlightedCode = hljs.highlight(lang, code).value;
    console.log('highlightedCode', highlightedCode);
    return highlightedCode;
}
module.exports = hjsMe;
