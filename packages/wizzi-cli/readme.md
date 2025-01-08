# wizzi.cli

Wizzi Command Line Interface



## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

```undefined
npm install -g wizzi-cli
```
# wizzi-cli
The Wizzi command line interface (CLI) performs basic functionality, such as executing a Wizzi Production, creating a Wizzi Package based on a templated Meta Production, wizzifying an existent artifact or a folder of artifacts, meta wizzifying an existent wizzi package
The Wizzi CLI is packaged as an executable that can be used globally. Is available via [npm](https://www.npmjs.com/) and should be installed globally by running
```undefined
npm install -g wizzi-cli
```
Run `wz help` for full help.
## CLI Commands
## "main"
*Execute a wizzi package production (default) or a single artifact or single folder production or a specified command*
```undefined
wz [noarguments | configname | --source <file|folder> --dest <file|folder> -ctx <file>[-ctx <file>]...] --config <file>| [command <options>]
```
|Argument                       |Description                                                                                                                                                                                                                         \||
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|noarguments                    |execute a wizzi production using the 'wizzi.config.js' default config file                                                                                                                                                           
|
|configname                     |execute a wizzi production using the 'wizzi.config.<configname>.js' config file                                                                                                                                                      
\|- The config file is searched in the current and upwards in parent folders|
|[--source \| -s] <file \| folder>|execute the wizzi production of a single file or folder using optionaly one or more context data files (json or yaml                                                                                                                 
|
|[--dest \| -d] <file \| folder>|the destination file or folder of the production. A source folder requires a destination folder.                                                                                                                                     
|
|[--config \| -c] <file>        |the path to the optional generation configuration file: <file>.config.js                                                                                                                                                             
\|- Basic plugins are included in the Wizzi CLI.\|- You can add extra plugins using a config file of the same format as for the 'wz' command.|

commands:
 job ................. execute a wizzi job
 fy .................. wizzify a file or folder
 meta ................ execute a wizzi meta production
 metify .............. execute the 'metafication' of a wizzi production
 version ............. show package version
 help ................ show help menu for a command
 |- Try: wz help [command] to see each command options
## "job"
*Execute the wizzi job defined in a configuration file*
```undefined
wz job --config <file>
```
|Argument                    |Description                                                                                                                                                                                                                         \||
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|[--config \| -c] <configname>|the name of the job configuration file: <configname>.config.js                                                                                                                                                                       
\|- The config file is searched in the current folder|

## "fy"
*Execute the 'wizzifycation' of a file or folder*
```undefined
wz fy --source <file|folder> --dest <file|folder> --config <file>
```
|Argument                       |Description                                                                                                                                                                                                                         \||
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|[--source \| -s] <file \| folder>|the source file or folder                                                                                                                                                                                                            
|
|[--dest \| -d] <file \| folder>|the destination file or folder                                                                                                                                                                                                       
|
|[--config \| -c] <file>        |a config file for extra plugins                                                                                                                                                                                                      
\|- A wizzi plugin can optionaly contain a wizzifier for its language schema.\|- Basic wizzifiers are included in the Wizzi CLI.\|- You can add extra plugins using a config file of the same format as for the 'wz' command.|

## "meta"
*Execute a wizzi meta production*
```undefined
wz meta [<metaname> | --config <filepath>
```
|Argument|Description                                                                                                                                                                                                                         \||
|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|metaname|the name of the meta production config file: wizzi.meta.config.<metaname>.js                                                                                                                                                         
\|- The config file is searched in the current (cwd) and upwards in parent folders|
|config  |the path of the meta production config file: <filepath>.config.js                                                                                                                                                                    
\|- The config file|

## "metify"
*Execute the 'metafication' of a wizzi folder*
```undefined
wz metify --source <folder> --dest <folder> [--name <name>] [--compress <subfolder[;subfolder[;...]]>>]
```
|Argument         |Description                                                                                                                                                                                                                         \||
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|[--source \| -s] |the source file or folder                                                                                                                                                                                                            
|
|[--dest \| -d]   |the destination file or folder                                                                                                                                                                                                       
|
|[--name \| -n]   |the name to assign to the created meta production                                                                                                                                                                                    
|
|[--compress \| -c]|semicolon separated list of folders that you prefer 'metamanaged' by their parents                                                                                                                                                   
|



## Wizzi

One machinery, many productions.


[Project page](https://stfnbssl.github.io/wizzi)
## Built With
* [Nodejs](https://nodejs.org)
* [Wizzi](https://github.com/stfnbssl/wizzi)

## License
This project is licensed under the MIT License - see the [license.txt](license.txt) for details.