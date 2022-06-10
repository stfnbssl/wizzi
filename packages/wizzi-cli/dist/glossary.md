# Glossary
## wizzi-cli
The wizzi factory command line interface.
## Command 'create'
The CLI command for creating the package of a Wizzi production from an available starter. Executes a meta production.
## Production starter
A meta production for generating a type of Wizzi production ('webpack', 'gatsby', 'express', ...).
### Meta production
A Wizzi production that processes meta ittf documents into artifact ittf documents.
### Meta ittf document
A templated ittf document of schema 'ittf' (.js.ittf.ittf, .html.ittf.ittf, ...) that in a meta production is processed for generating an ittf document (.js.ittf, .html.ittf, ...) of an artifact production.
### Artifact ittf document
An ittf document (.js.ittf, .html.ittf, ...) that in a Wizzi production generates a software artifact (.js, .html, ...).
### Wizzi production (artifacts production)
The generation of a set of software artifacts processed from a set of ittf documents.
### Wizzi production type
A set of meta ittf documents targeting a specific technology ('webpack', 'gatsby', 'express', ...). Is selected and configured through the Wizzi CLI interactive 'inquirer'.
### object 'answersCtx'
The context object created by the Wizzi CLI interactive 'inquirer'. Is preprocessed for creating the cliCtx object.
### object 'cliCtx'
The context object of a wizzi-cli meta production. Is preprocessed for creating the wzCtx object.
### object 'wzCtx'
The context object of an artifact production (Wizzi production).
