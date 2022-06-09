Clear-Host
robocopy c:\my\wizzi\wizzi\packages\wizzi-mtree\dist "C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-mtree" /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\wizzi\packages\wizzi-mtree\dist c:\my\wizzi\wizzi-examples\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules