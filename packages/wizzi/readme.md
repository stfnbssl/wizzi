# @wizzi/factory

The Wizzi Factory.




## Work still in progress

Availability of features will be announced

on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)


## Features
Exposes the main wizzi factory service components:

    * WizziFactory class 
    * PluginsManager class 
    * RunnerServer class 
## The WizziFactory class

<p>Is the main access point to wizzi factory services. Can beused to
</p>

    * Execute [wizzi model types generations](#)
    .
    * Execute artifact generations 
    * Execute [wizzi jobs](#)
    .
### Instance creation
```javascript
wizzi.createFactory(
userid,
role,
options,
callback
);
```
### Methods
```javascript
wizziFactoryInstance.generateModelDoms(
);
wizziFactoryInstance.generateMTree(
);
wizziFactoryInstance.generateWizziModel(
);
wizziFactoryInstance.generateArtifact(
);
wizziFactoryInstance.executeWizziJob(
);
```
## The PluginsManager class
### The RunnerServer class
## Default factory (quick starter)
### Loads a wizzi magical tree (mTree)
```javascript
var wizzi = require('wizzi');
var ittfSourcePath = '...';
var context = {
...
};
var options = {
...
};
wizzi.mtree(
    ittfSourcePath,
    context,
    options,
    function(err, mTree) {
    ...
    });
```
### Loads a wizzi model
```javascript
var wizzi = require('wizzi');
var ittfSourcePath = '...';
var context = {
...
};
var options = {
...
};
wizzi.model(
    ittfSourcePath,
    context,
    options,
    function(err, wizziModel) {
    ...
    });
```
### Generates an artifact
```javascript
var wizzi = require('wizzi');
var ittfSourcePath = '...';
var artifactName = '...';
var modelContext = {
...
};
var artifactContext = {
...
};
var options = {
...
};
wizzi.model(
    ittfSourcePath,
    artifactName,
    context,
    options,
    function(err, artifactText) {
    ...
    });
```


## Wizzi

One machinery, many productions.




<p><a href="https://stfnbssl.github.io/wizzi">Project page</a></p>

## Built With
    * [Nodejs](https://nodejs.org)
    
    * [Wizzi](https://github.com/stfnbssl/wizzi)
    

## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>
