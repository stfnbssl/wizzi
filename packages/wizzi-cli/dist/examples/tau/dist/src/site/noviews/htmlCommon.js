/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\noviews\htmlCommon.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
function html_head(ctx) {
    var __html = [];
    __html.push('<html>');
    __html.push('<head>');
    __html.push('\n<style>\n');
    __html.push("body { margin: 0; }");
    __html.push("#container { width: 75%; border: none; margin: auto; }");
    __html.push("header, footer { padding: 1em; color: white; background-color: #007196; clear: left; text-align: center; }");
    __html.push("nav { float: right; max-width: 160px; height: 134px; padding: 1em; border: solid #333 }");
    __html.push("nav ul { list-style-type: none; padding: 0; }");
    __html.push("nav ul a { text-decoration: none; }");
    __html.push("article { padding: 3em; min-height: 20rem;}");
    __html.push('</style>\n');
    __html.push('</head>');
    __html.push('<body>');
    __html.push('<div id="' + "container" + '">');
    __html.push('</div>');
    __html.push('</body>');
    __html.push('</html>');
    return __html.join('');
}
export function htmlHead(ctx) {
    return html_head(ctx);
}
export function buildPage(func, ctx) {
    const begin = html_head();
    const content = func(ctx || {});
    const end = '</div></body></html>';
    return begin.substr(0, begin.length - end.length) + content + end;
}
export function navUl(__html, menu) {
    __html.push('<nav>');
    __html.push('<ul>');
    menu.items.forEach(function(item, item_index, array) {
        liA(__html, item)
    }, this);
    __html.push('</ul>');
    __html.push('</nav>');
}
export function liA(__html, ctx) {
    __html.push('<li>');
    __html.push('<a href="' + ctx.href + '">');
    __html.push( ctx.text );
    __html.push('</a>');
    __html.push('</li>');
}
