const path = require('path');
module.exports = {
    wfjobName: "wizzi-mtree-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js', 
    ], 
    pluginsBaseFolder: path.join(__dirname, '..', '..', '..', 'wizzi.v07', 'packages'),
    /*plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ],*/ 
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: true
    },
    globalContext_default: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};