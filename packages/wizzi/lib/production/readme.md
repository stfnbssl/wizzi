## Production
### The wizzi.production.productionManager
Manages a production of software artifacts. It is instantiated by a wizzi.wizziFactory instance which sets up the production environment (plugins, global context, store system). Clients use its 'addWzjobRequest' and 'addProductionStepRequest' methods to add artifact requests and then use the 'run' and 'persistToFile' methods to execute the generations and save to file the generated artifacts.
### The wizzi.production.wzjob.wzjobLoader
Async loads a `wzjob` wizzi model and accumulates productionStep elements. If the model contains `wzjob` requests also check that they have not already been processed and add them to pendingWzjobRequests. If the model contains productionStep elements check that they have not already been added and add them to the productionStepConfigs collection.
### The wizzi.production.runner
Executes the productions described by a `wizzi/production/ProductionStep` instance. It is instantiated by the `wizzi/production/ProductionManager`, selects the production step type, and asynchronously run the production using the proper executor.
The generated artifacts are added to the 'genContexts' collection of the wizzi.artifact.productionStep instance.
### The wizzi.production.persister
Executes the write to file of the generated artifacts added to the 'genContexts' collection of a wizzi.artifact.productionStep instance. It is instantiated by the wizzi.production.productionManager, and asynchronously executes the writes using the wizzi.production.asyncArtifactFilePersister.
### The global context
The default value in options.js is empty ( = {} )
The user can pass a global context to
* A Wizzi Job execution 
* An mTree load 
* A Wizzi Model load 
* An Artifact Generation 
using the property globalContext of the options parameter of* The wizzi.executeInstanceJob method 
* The wizzi.createFactory method 
Creating a wizziFactory instance always is preliminar to executing an mTree load, a Wizzi Model load or an Artifact Generation.
The wizzi.executeInstanceJob method creates its own wizziFactory instance from the options that receives.