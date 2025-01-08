/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.cli\.wizzi\src\cmds\help.js.ittf
    utc time: Wed, 08 Jan 2025 05:17:28 GMT
*/
const menus = {
    main: [
        "Execute a wizzi package production (default) or a single artifact or single folder production or a specified command", 
        "", 
        "wz [noarguments | configname | --source <file|folder> --dest <file|folder> -ctx <file>[-ctx <file>]...] --config <file>| [command <options>]", 
        "", 
        "options:", 
        " noarguments : execute a wizzi production using the 'wizzi.config.js' default config file", 
        " configname : execute a wizzi production using the 'wizzi.config.<configname>.js' config file", 
        "  |- The config file is searched in the current and upwards in parent folders", 
        " [--source | -s] <file | folder> : execute the wizzi production of a single file or folder using optionaly one or more context data files (json or yaml", 
        " [--dest | -d] <file | folder> : the destination file or folder of the production. A source folder requires a destination folder.", 
        " [--config | -c] <file> : the path to the optional generation configuration file: <file>.config.js", 
        "  |- Basic plugins are included in the Wizzi CLI.", 
        "  |- You can add extra plugins using a config file of the same format as for the 'wz' command.", 
        "", 
        "commands:", 
        " job ................. execute a wizzi job", 
        " fy .................. wizzify a file or folder", 
        " meta ................ execute a wizzi meta production", 
        " metify .............. execute the 'metafication' of a wizzi production", 
        " version ............. show package version", 
        " help ................ show help menu for a command", 
        " |- Try: wz help [command] to see each command options", 
        "", 
        ""
    ].join('\n'), 
    job: [
        "Execute the wizzi job defined in a configuration file", 
        "", 
        "wz job --config <file>", 
        "", 
        "options:", 
        " [--config | -c] <configname> : the name of the job configuration file: <configname>.config.js", 
        "  |- The config file is searched in the current folder", 
        "", 
        ""
    ].join('\n'), 
    fy: [
        "Execute the 'wizzifycation' of a file or folder", 
        "", 
        "wz fy --source <file|folder> --dest <file|folder> --config <file>", 
        "", 
        "options:", 
        " [--source | -s] <file | folder> : the source file or folder", 
        " [--dest | -d] <file | folder> : the destination file or folder", 
        " [--config | -c] <file> : a config file for extra plugins", 
        "  |- A wizzi plugin can optionaly contain a wizzifier for its language schema.", 
        "  |- Basic wizzifiers are included in the Wizzi CLI.", 
        "  |- You can add extra plugins using a config file of the same format as for the 'wz' command.", 
        "", 
        ""
    ].join('\n'), 
    meta: [
        "Execute a wizzi meta production", 
        "", 
        "wz meta [<metaname> | --config <filepath>", 
        "", 
        "options:", 
        " metaname : the name of the meta production config file: wizzi.meta.config.<metaname>.js", 
        "  |- The config file is searched in the current (cwd) and upwards in parent folders", 
        " config : the path of the meta production config file: <filepath>.config.js", 
        "  |- The config file", 
        "", 
        ""
    ].join('\n'), 
    metify: [
        "Execute the 'metafication' of a wizzi folder", 
        "", 
        "wz metify --source <folder> --dest <folder> [--name <name>] [--compress <subfolder[;subfolder[;...]]>>]", 
        "", 
        "options:", 
        " [--source | -s] : the source file or folder", 
        " [--dest | -d] : the destination file or folder", 
        " [--name | -n] : the name to assign to the created meta production", 
        " [--compress | -c] : semicolon separated list of folders that you prefer 'metamanaged' by their parents", 
        "", 
        ""
    ].join('\n')
 };
module.exports = (args) => {
    console.log('help.args', args, __filename);
    console.log('args._[0]', args._[0], __filename);
    console.log('args._[1]', args._[1], __filename);
    console.log("args['help']", args['help'], __filename);
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log('help.subCmd', subCmd, __filename);
    console.log("[33m%s[0m", '');
    console.log("[33m%s[0m", '---------------------------');
    console.log("[33m%s[0m", 'Command:', subCmd || 'wz');
    console.log("[33m%s[0m", '---------------------------');
    console.log("[32m%s[0m", menus[subCmd] || menus.main);
}
;