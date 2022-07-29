const path = require('path');
module.exports = {
    wfjobName: "wizzi-core/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: __dirname,
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    schemas: [
        'wfjob',
        'wfschema', 
    ],
    stop_schemas: [
    ],
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
        isWebpackTarget: false
    },
};