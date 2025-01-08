import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var artifactPath = path.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'js', 'step_1.js.ittf');

export function artifact_1() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.js/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=>{
            wf.loadModel(
                'js', 
                artifactPath, 
                {}, 
                ((err, result)=> {
                    console.log('err', err);
                    console.log('result', result);
                }))
            })
    );
} 
