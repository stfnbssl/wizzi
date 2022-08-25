const path = require('path');
module.exports = {
    wfjobName: "wizzi-scripts-job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: false,
        isDevelopment: false,
        wzConfig_useMongo: false,
    },
};