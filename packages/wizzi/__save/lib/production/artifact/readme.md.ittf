## Artifact
### Main source model
The main source module can be a Wizzi Model or a POJO passed to a 'wizzi-plugin.artifactGenerator.gen' method in the 'model' parameter.
### Context models
Context models are Wizzi Models or POJO passed to a 'wizzi-plugin.artifactGenerator.gen' method in the 'values' object property of the 'ctx' (api-ref: wizzi.artifact.genContext) parameter. The name of each context model, defined in the 'export-name' attribute of the 'modelRef' element of the `wzjob` model, is a property name of the 'values' object.
### Generation module
Is a nodejs module that implements the 'wizzi-plugin.artifactGenerator' interface. It uses the main source model and optionally the context models to generate the textual artifact. The artifact is buffered using the 'write' and 'w' methods of the 'wizzi.artifact.genContext' instance, but the code text can be built using the services of the wizzi factory and its language schemas and language artifacts. The current instance of the wizzi.wizziFactory class can be accessed from 'wizzi-plugin.artifactGenerator' implementors in the property 'wizziFactory' of the 'wizzi.artifact.genContext' instance.
### Transpilers
A transpiler is a nodejs module that implements the wizzi-plugin.transpiler interface.
### Destination path
A destination path is the location where a generated artifact is persisted.
## Artifact types
* Model artifact 
* Model collection artifact 
* Code write artifact 
* Final artifact 
### Model artifact
A model artifact is an artifact which main source model is a wizzi model.
### Model collection artifact
A model collection artifact is a model artifact which source model is an item of a collection property of a wizzi model. The same artifact is applied to all the items of the collection and generates distinct code units, for any of them, which file path is built using a template interpolated with the values of the item properties.
### Code write artifact
A code write artifact do not require a Wizzi Model as a main source model. The artifact generator receive in the 'model' parameter a context object, which properties are the items of the context models collection. It emits the code using the 'write' and 'w' methods of a wizzi.artifact,genContext instance.
### Native artifact
A native artifact is a source already coded in the synthax of a target language. It is not processed by the Wizzi factory. It can be copied as is in the destination folder or can be transpiled before copying.