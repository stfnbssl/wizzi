const path = require('path');
module.exports = {
    wfjobName: "wizzi-meta-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'),
    plugins: [
        './wizzi-core/dist/index.js', 
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