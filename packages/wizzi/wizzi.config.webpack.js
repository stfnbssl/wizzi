const path = require('path');
module.exports = {
    wfjobName: "wizzi", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isDevelopment: false
    },
};