# Metaproductions core sources
The core sources of the Wizzi Meta Productions are ITTF Fragments stored in two tFolders:

* `wizzi-cli/resources/create/templates/t/cli` 
* `wizzi-cli/resources/create/templates/t/wz` 
The `t/cli` folder contains ITTF Fragments for preprocessing the `cliCtx` context variable of the Meta Productions.

The `t/wz` folder contains ITTF Fragments with the templated source of the artifacts.

All the core templates sources are edited in the `wizzi-cli/.wizzi/metaprods/tfolder` folder. They are plain copied in the `t/cli` and `t/wz` folders of the `wizzi-cli/resources/create/templates` folder, with the `wizzi tfolder` command of the Wizzi CLI.

# Meta Production sources
The ITTF Documents of a Meta Production mainly do `$include' core ITTF Fragments, sources from `t/wz` and context properties from `t/cli`.

Meta Productions ITTF Documents are grouped for category in the `wizzi-cli/.wizzi/metaprods/[category-folder]` folders. They are copied in the

* `wizzi-cli/resources/create/contexts` and 
* `wizzi-cli/resources/create/templates` 
folders, with the `wizzi [category-folder]` command of the Wizzi CLI.

The `.../contexts` and `./templates` folders contain one folder for each Meta Production. The folder name is the name of the Meta Production

# Meta Production execution
The execution of Meta Productions creates a new Wizzi Package or Wizzi Artifact. You start a Meta Production with the Wizzi CLI command:

```sh
wizzi create
```
An 'inquirer' dialog asks for the Production Type and other available options.

* pure js 
* webpack 
* webpack + react 
* webpack + react + material-ui 
* gatsby 
* express 
* wizzi plugin 
* ... 
The selected options are preprocessed creating the cliCtx context objects of the meta productions.

The Meta ITTF Documents of the Meta Production are processed by the Wizzi Factory.

