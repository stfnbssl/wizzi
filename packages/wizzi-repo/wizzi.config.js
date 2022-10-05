const path = require('path');
module.exports = {
    wfjobName: "wizzi-repo/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    /*plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ],*/ 
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
        wzConfig_useMongo: false,
    },
    globalContext_default: {
        isPackageDeploy: true,
        isDevelopment: false,
        wzConfig_useMongo: false,
    },
};