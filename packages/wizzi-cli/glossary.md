# Glossary
## wizzi-cli
The Wizzi command line interface.

## Command 'create'
The CLI command for creating the package of a Wizzi Production from an available starter. Executes a meta production.

## Wizzi Package Starter
A Wizzi Meta Production for generating a type of Wizzi Package ('webpack', 'gatsby', 'express', ...).

### Wizzi Meta Production
A Wizzi Production that processes Meta ITTF Documents and generates Artifact ITTF Documents.

### Meta ITTF Document
A templated ITTF Document of schema 'ittf' (.js.ittf.ittf, .html.ittf.ittf, ...) that in a Wizzi Meta Production is processed for generating an Artifact ITTF Document (.js.ittf, .html.ittf, ...).

### Artifact ITTF Document
An ITTF Document (.js.ittf, .html.ittf, ...) that in a Wizzi Production is a source document for generating a software artifact: a code program (.js, .ts, ...), or a data structure (.xml, .json, .yaml, ...), or a document (html, css, pdf, xword, ppt, ...).

### Wizzi Package
A package that uses Wizzi to generate some or all of its artifacts. It contains a '.wizzi' folder and one or more 'wizzi.config[.name].js' files that define Wizzi Productions (generations).

### Wizzi Package Type
A set of meta ITTF Documents targeting a specific technology ('webpack', 'gatsby', 'express', ...). Is selected and configured through the Wizzi CLI interactive 'inquirer'.

### Wizzi Production
The generation of a set of software artifacts processed from a set of ITTF Documents.

### object 'answersCtx'
The context object created by the Wizzi CLI interactive 'inquirer'. It Is preprocessed for creating the cliCtx object.

### object 'cliCtx'
The context object of a wizzi-cli Meta Production. It is preprocessed for creating the wzCtx object.

### object 'wzCtx'
The context object of a Wizzi Production.

