const path = require('path');
module.exports = {
    wfjobName: "wizzi-web-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: __dirname,
    plugins: [
        './wizzi-core/index.js', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    pluginsBaseFolder: path.join(__dirname, '..'),
    schemas: [
        'css',
        'graphql',
        'html',
        'md',
        'scss',
        'site',
        'svg',
        'vtt',
        'vue',
    ],
    schemas_all_stop: [  /* to be copied into 'schemas' collection */
        'css',
        'graphql',
        'html',
        'md',
        'scss',
        'site',
        'svg',
        'vtt',
        'vue',
    ],
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
    },
};