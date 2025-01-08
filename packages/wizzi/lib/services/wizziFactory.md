## The wizzi.WizziFactory class
Every wizzi operation require an instance of the wizzi.WizziFactory class.
* The store system (filesystem, mongodb, json or localstorage). 
* The global context. 
* The loading of plugins. 
### The store system
The store system is set at creation time and cannot be changed.
### The global context
The global context is set at creation time and cannot be changed.
### The loading of plugins
Plugins are loaded at creation time and cannot be changed.
### Operations
* mTree loading 
* Wizzi Model loading 
* Model transformation 
* Artifact generation 
* Wizzification 
* Wizzi Model type generation 
* Production manager creation 
* Wizzi job execution 
### mTree loading
Executes the loading of a textual ittf document into a mTree memory object.
### Wizzi Model loading
Executes the loading, initialization and validation of a wizzi model from an ITTF Document.
TODO the 'modelContext' paramater can contain properties of type wizzi.model.modelInfo. wizzi.model.modelInfo(s) will be resolved and replaced with the loaded wizzi models.
### Model transformation
Executes the transformation of a wizzi model or POJO.
### Artifact generation
Executes the generation of a single software artifact.
### Wizzification
Executes the generation of a single software artifact.
### Wizzi Model type generation
The generation of the javascript modules for loading and implement a wizzi model is a fundamental part of a wizzi plugin development.
A wizzi model of type 'wfschema' describes a wizzi model and its constraints. The method 'generateModelDoms' of the wizzi.wizziFactory uses a 'wfschema' model to generate the javascript artifacts that implement a wizzi model.
### Wizzi job execution
A wizzi job is described by a wizzi model of schema `wzjob`, that can contain step production configs and references to other `wzjob` models. The 'executeJob' method of the wizzi.wizziFactory triggers the loading of a `wzjob` model, the resolution of the references to other `wzjob` models and the execution of the requested step productions.
### Production manager creation
An instance of a `wizzi/production/ProductionManager class allow a more fine grained control on productions. To a `wizzi/production/ProductionManager instance we can add wizzi job requests ('addWzjobRequest' method) and single step requests ('addProductionStepRequest' method), then we can execute the run method and obtain `wizzi/production/artifact/genContext` instances filled with the artifacts ready to be persisted, and, at the end, we can execute the 'persistToFile' method.