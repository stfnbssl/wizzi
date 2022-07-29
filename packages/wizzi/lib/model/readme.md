## Model
### The wizzi.model.modelInfo class
Describes a set of models

<p>Folders with the name ending with `__copy` and `t` folders`have a special treatment. When a `wizzi.artifact.artifactInfo` instance`
`calls the method `getFiles` the files contained in these folders`
`are skipped unless the value of the parameter `options.final` is true.`
</p>

