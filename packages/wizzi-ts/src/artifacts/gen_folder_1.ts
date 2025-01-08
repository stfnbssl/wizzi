import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var sourceFolderPath = path.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'folder_1');
var destFolderPath = path.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'output', 'folder_1');

export function artifact_gen_folder_1() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.js/index.js", 
                "./wizzi.plugin.json/index.js", 
                "./wizzi.plugin.html/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=>{
            wf.generateFolderArtifacts(
                sourceFolderPath,
                {}, 
                { 
                    destFolder: destFolderPath,
                    useMultiPartContext: true
                }, 
                ((err, result)=> {
                    console.log('err', err);
                    console.log('result', result);
                }))
            })
    );
} 
