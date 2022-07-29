const path = require('path');
module.exports = {
    wfjobName: "wizzi-meta-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: __dirname,
    plugins: [
        './wizzi-core/index.js', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    schemas: [
        'wfpackage',
    ],
    schemas_all_stop: [  /* to be copied into 'schemas' collection */
        'wfpackage',
    ],
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
};