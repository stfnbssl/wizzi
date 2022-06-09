/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\examples\typescript\index.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var file = require('wizzi-utils').file;
var jswizzifier = require('../../lib/wizzifiers/jsparser/babel/wizzifier');
var items = [
    "quick"
];
var fullText = [];
var i, i_items=items, i_len=items.length, item;
for (i=0; i<i_len; i++) {
    item = items[i];
    fullText.push(file.read(path.join(__dirname, 'data', item + '.ts')))
}
file.write(path.join(__dirname, 'data', 'full.ts'), fullText.join('\n'))
go('full');
function go(name) {
    var src = path.join(__dirname, 'data', name + '.ts');
    var out_babel = path.join(__dirname, 'data', name + '.babel.json');
    var out_ittf = path.join(__dirname, 'data', name + '.ts.ittf');
    var out_ittf_ts = path.join(__dirname, 'data', name + '.ts.ittf.ts');
    jswizzifier.getWizziIttf(file.read(src), {
        kind: 'react', 
        babel: {
            sourceType: 'module', 
            ts_or_flow: 'typescript'
        }, 
        syntaxOutFile: out_babel, 
        verbose: false
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            file.write(out_ittf, JSON.stringify(err, null, 4))
        }
        else {
            var r1 = result.substring(0, 24);
            var r2 = result.substring(24);
            console.log('r1', r1);
            r1 = r1.replace('jsfile', 'react ');
            console.log('r1 after', r1);
            file.write(out_ittf, r1+r2)
        }
    })
}
