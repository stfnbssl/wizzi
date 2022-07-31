const path = require('path');
module.exports = {
    wfjobName: "wizzi-js-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: __dirname,
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
    schemas: [
        'js',
        'ts',
    ],
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: true,
        isWebpackTarget: false
    },
};