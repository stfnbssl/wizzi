const path = require('path');
module.exports = {
    wfjobName: "wizzi-core/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, '..', '..', '..', 'wizzi-browser', 'build', 'wizzi_modules', 'wizzi-core'),
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    schemas: [
        'wfjob',
        'wfschema', 
    ],
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: false,
    },
};