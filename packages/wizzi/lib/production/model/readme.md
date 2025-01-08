## Model
### The wizzi.model.modelInfo class
Describes a set of models
Folders with the name ending with `__copy` and `t` foldershave a special treatment. When a `wizzi.artifact.productionStep` instancecalls the method `getFiles` the files contained in these foldersare skipped unless the value of the parameter `options.final` is true.