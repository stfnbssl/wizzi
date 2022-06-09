const path = require('path');
module.exports = {
    wfjobName: "wizzi-web-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'),
    plugins: [
        './wizzi-core/dist/index.js', 
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
    schemasStop: [
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