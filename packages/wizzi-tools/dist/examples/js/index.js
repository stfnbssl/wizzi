/*
    artifact generator: C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\examples\js\index.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var file = require('wizzi-utils').file;
var jswizzifier = require('../../lib/wizzifiers/jsparser/babel/wizzifier');
go('quick');
// _ go('vars')
// _ go('loops')
// _ go('functions')
// _ go('flow')
// _ go('jsx')
// _ go('statements')
// _ go('classes')
// _ go('impexp')
// _ go('calls')
function go(name) {
    var src = path.join(__dirname, 'data', name + '.js');
    var out_babel = path.join(__dirname, 'data', name + '.babel.json');
    var out_ittf = path.join(__dirname, 'data', name + '.js.ittf');
    var out_ittf_js = path.join(__dirname, 'data', name + '.js.ittf.js');
    jswizzifier.getWizziIttf(file.read(src), {
        kind: 'react', 
        babel: {
            sourceType: 'module'
         }, 
        syntaxOutFile: out_babel, 
        verbose: false
     }, function(err, result) {
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            file.write(out_ittf, JSON.stringify(err, null, 4))
        }
        // loog 'r1', r1
        // loog 'r1 after', r1
        else {
            var r1 = result.substring(0, 24);
            var r2 = result.substring(24);
            r1 = r1.replace('jsfile', 'react ');
            file.write(out_ittf, r1+r2)
        }
    })
}
