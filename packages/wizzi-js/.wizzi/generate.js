var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');
var generateSchemas = true;
var version = 'v6';

var destPath = path.join(__dirname, '..', 'dist');

/* begin params */
var packageName = 'wizzi-js';
var $name = packageName + ' ' + version + ' plugin package generator';
var schemasToGen = [], args = process.argv.slice(2);
if (args.length == 0) {
    schemasToGen = [
        'js',
        'ts',
    ];
} else {
    args.forEach(function (val, index) {
        console.log('generation argument', val);
        if (val[0] === '-' && val[1] === 'a') {
            schemasToGen = [
                'js',
                'ts',
            ];
        } else {
            var ss = val.split('-')
            if (ss[0] === 's') {
                schemasToGen.push(ss[1])
            }
        }
    });
}
/* end params */

wizzi.executeWizziJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:/my/wizzi/' + version,
        plugins: [
            'wizzi-core',
            'wizzi-meta',
            'wizzi-js',
            'wizzi-web',
        ]
    },
    job: {
        name: $name,
        ittfDocumentUri: path.join(__dirname, 'generate.wfjob.ittf'),
        productionOptions: wizzi.productionOptions({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        })
        ,
        globalContext: {
            isPackageDeploy: true
        }
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
    if (generateSchemas) {
        async.map(schemasToGen, function (schemaName, callback) {
            console.log('Generating schema ' + schemaName);
            wizzi.generateWizziModelTypes({
                configOptions: {},
                wfschema: {
                    name: schemaName,
                    ittfDocumentUri: path.join(__dirname, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'),
                    outputPackageFolder: destPath
                }
            },
                function (err, result) {
                    if (err) {
                        throw new Error('Package: ' + packageName +
                            ' schema ' + schemaName +
                            '  wizzi models production error: ' + util.inspect(err, { depth: null }));
                    }
                    callback(result);
                }
            );
        }, function (err, result) {
            if (err) {
                wizzi.printWizziJobError($name, err);
            }
        });
    }
});

