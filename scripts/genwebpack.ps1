
<#  
    for wizzi-browser/wizzi-standalone
#>
Clear-Host
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-helpers
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-git
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core
wizzi webpack
set-location c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools
wizzi webpack
<# VIA robocopy C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\dist\node_modules\wizzi-legacy-v5 c:\my\wizzi\stfnbssl\wizzi-browser\build\wizzi_modules\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules#>



