const path = require('path');
module.exports = {
    meta: "example-meta1-meta-lab", 
    metaCtxPath: path.join(__dirname, '_meta', 'meta.meta.lab.json.ittf'), 
    destPath: "C:/My/wizzi/stfnbssl/wizzi.metas/packages/wizzi.meta.lab",
    plugins: [
        "./wizzi.plugin.html/index",
        "./wizzi.plugin.js/index",
        "./wizzi.plugin.css/index",
        "./wizzi.plugin.ittf/index",
        "./wizzi.plugin.json/index"
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
    metaPlugins: [
        "./wizzi.meta.cloud/index",
        "./wizzi.meta.commons/index",
        "./wizzi.meta.docs/index",
        "./wizzi.meta.documents/index",
        "./wizzi.meta.js/index",
        "./wizzi.meta.js.vanilla/index",
        "./wizzi.meta.js.react/index",
        "./wizzi.meta.ts/index",
        "./wizzi.meta.ts.express/index",
        "./wizzi.meta.ts.react/index",
        "./wizzi.meta.ts.db/index",
        "./wizzi.meta.web/index",
        "./wizzi.meta.wizzi/index",
    ], 
    metaPluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.metas/packages", 
    globalContext: {
        isPackageDeploy: true,
        isDevelopment: false,
    },
};