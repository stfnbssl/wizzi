/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\examples\fs\uriParser.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';
var path = require('path');
var uriParser = require('../../lib/fSystem/uriParser');
parse('\\tmp\\stefi\\wizzi\\index.js.ittf')
parse('/tmp/stefi/wizzi/index.js.ittf')
parse('c:\\stefi\\wizzi\\index.js.ittf')
parse('db:\\stefi\\wizzi\\index.js.ittf')
parse('ls:\\stefi\\wizzi\\index.js.ittf')
parse('c:/stefi/wizzi/index.js.ittf')
parse('db:/stefi/wizzi/index.js.ittf')
parse('ls:/stefi/wizzi/index.js.ittf')
parse('c://stefi/wizzi/index.js.ittf')
parse('db://stefi/wizzi/index.js.ittf')
parse('ls://stefi/wizzi/index.js.ittf')
// TODO error not managed:
parse('./storybook')
parse('/home/runner/work/wizzi-app/wizzi-app/Application/src/views/error.html.ittf')
function parse(uri) {
    var parsed = uriParser(uri);
    console.log(uri, '\n', path.dirname(uri), '\n', JSON.stringify(parsed, null, 2));
}