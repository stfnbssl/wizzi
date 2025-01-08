# @wizzi/mtree

Loader component for Indented Text Tree Format (ittf) documents. Implements the Wizzi Magical Tree buildup.



## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

## Features
* Loads an ittf document into an mTree instance ( [wizzi-mtree.mTree](), executing documents composition and template evaluation.
### Interface
This interface is used by the wizziFactory class and bytest and demo modules.
```javascript
mtree.createLoadMTree(
createStore,
options,
callback
);
```
#### Parameters
|createStore|function returned by wizzi-repo.createSore|
|options|\|useCache|default : false|

|
|callback|returns the function[wizzi-mtree.loader.loadMTree](https://wizzifactory.github.io/api.html#wizzi-mtree.loader).|



## Wizzi

One machinery, many productions.


[Project page](https://stfnbssl.github.io/wizzi)
## Built With
* [Nodejs](https://nodejs.org)
* [Wizzi](https://github.com/stfnbssl/wizzi)

## License
This project is licensed under the MIT License - see the [license.txt](license.txt) for details.