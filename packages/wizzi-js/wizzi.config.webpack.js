const path = require('path');
module.exports = {
    wfjobName: "wizzi-js/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, '..', '..', '..', 'wizzi-browser', 'build', 'wizzi_modules', 'wizzi-js'),
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    schemas: [
        'js',
        'ts',
    ],
    schemas_stop: [
        'js',
        'ts',
    ],
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: true
    },
};