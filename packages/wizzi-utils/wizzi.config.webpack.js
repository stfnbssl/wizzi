const path = require('path');
module.exports = {
    wfjobName: "wizzi-utils/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    plugins: [
        'wizzi-core',
        'wizzi-js', 
        'wizzi-web'
    ], 
    globalContext: {
        isPackageDeploy: true,
        isWebpackTarget: true,
        isBrowserTarget: false,
        isWizziUtilsPackage: true,
        isDevelopment: false,
    },
};