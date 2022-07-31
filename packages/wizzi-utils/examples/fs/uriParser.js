/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\examples\fs\uriParser.js.ittf
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
function parse(uri) {
    var parsed = uriParser(uri);
    console.log(uri, '\n', path.dirname(uri), '\n', JSON.stringify(parsed, null, 2), __filename);
}
