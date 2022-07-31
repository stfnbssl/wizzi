const path = require('path');
module.exports = {
    wfjobName: "wizzi-mtree-job", 
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
        isWebpackTarget: false,
        isDevelopment: true
    },
    globalContext_default: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
    globalContext_webpack: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: false,
    },
};