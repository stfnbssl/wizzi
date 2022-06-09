const path = require('path');
module.exports = {
    wfjobName: "wizzi-web/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, '..', '..', '..', 'wizzi-browser', 'build', 'wizzi_modules', 'wizzi-web'),
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
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: false,
    },
};