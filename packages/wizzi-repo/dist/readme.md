# wizzi-repo

Ittf documents repository manager for the wizzi factory..

## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

## Features
* Filesystem ittf documents store 
* MongoDb ittf documents store 
### Interface
```javascript
repo.createStoreFactory(
options,
callback
);
```
#### Options

<table>
<tr>
<td>storeKind</td>
<td>oneOf 'filesystem', 'mongodb'</td>
</tr>
<tr>
<td>storeUri</td>
<td>when storeKind == 'mongodb'

the uri of the mongodb instance</tr>
<tr>
<td>storeBaseFolder</td>
<td>when storeKind == 'mongodb'

the virtual filesystem base folder</tr>
</table>

#### Returns

<p>A function that can be called to obtain a<a href="">wizzi-repo.ittfDocumentStore</a>interface.</p>

### Usage
```javascript
var repo = require('wizzi-repo');

...

repo.createStoreFactory(
{
storeKind: 'filesystem'
},
function (err, createStore) {
}
);
```
## Wizzi

One machinery, many productions.


<p><a href="https://stfnbssl.github.io/wizzi">Project page</a></p>

## Built With
* [Nodejs](https://nodejs.org)

* [Wizzi](https://github.com/stfnbssl/wizzi)


## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>

