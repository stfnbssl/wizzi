# wizzi-cli

The wizzi factory command line interface.

## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

```sh
npm install -g wizzi-cli
```
# wizzi-cli
The Wizzi command line interface (CLI) is used to perform basic functionality, such as executing a Wizzi production, creating a Wizzi production package based on a starter, wizzifying an existent artifact or a folder of artifacts.
The Wizzi CLI (`wizzi-cli`) is packaged as an executable that can be used globally. The Wizzi CLI is available via [npm](https://www.npmjs.com/) and should be installed globally by running
```sh
npm install -g wizzi-cli
```
Run `wizzi --help` for full help.
## CLI Commands
* [generate](#generate)

* [create](#create)

* [fy](#fy)

### `generate`
Executes a Wizzi production described in a wizzi.config[.configname].js file.
The config file is searched in the current folder and its parent.
```sh
wizzi [configname]
```
### `create`
Executes a Wizzi meta production creating a new package for a type of Wizzi production.
```sh
wizzi create
```
An 'inquirer' dialog asks for the production type and other available options.
* pure js 
* webpack 
* webpack + react + material-ui 
* gatsby 
* express 
* wizzi plugin 
### `fy`
Executes the 'wizzifying' of a file or folder (for example creates a .js.ittf document from a .js file).
```sh
wizzi fy --source <filepath|folderpath> --dest <filepath|folderpath>
```

<table>
<thead>
<th>Argument</th>
<th>Description                                                                                                                                                                                                                             |</th>
</thead>
<tbody>
<tr>
<td>--source|-s <filepath|folderpath></td>
<td>The source file or folder path</td>
</tr>
<tr>
<td>--dest|-d <filepath|folderpath></td>
<td>The destination file or folder path</td>
</tr>
</tbody>
</table>

## Wizzi

One machinery, many productions.


<p><a href="https://stfnbssl.github.io/wizzi">Project page</a></p>

## Built With
* [Nodejs](https://nodejs.org)

* [Wizzi](https://github.com/stfnbssl/wizzi)


## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>

