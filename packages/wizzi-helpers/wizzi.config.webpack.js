const path = require('path');
module.exports = {
    wfjobName: "wizzi-helpers-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isBrowserTarget: false,
        isWebpackTarget: true,
        isDevelopment: false,
    },
};