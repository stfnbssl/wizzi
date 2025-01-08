import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var artifactPath = path.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'json', 'step_2.json.ittf');
var artifactDataPath = path.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'json', 'step_2_data.json.ittf');

export function artifact_2() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.json/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=>{
            wf.loadModelAndGenerateArtifact(
                artifactDataPath, 
                {}, 
                "json/document", 
                ((err, result)=> {
                    console.log('err', err);
                    console.log('result', result);
                    wf.loadModelAndGenerateArtifact(
                        artifactPath, 
                        {
                            modelRequestContext: { 
                                mTreeBuildUpContext: {
                                    data: JSON.parse(result)}
                                }
                        }, 
                        "json/document", 
                        ((err, result)=> {
                            console.log('err', err);
                            console.log('result', result);
                        }))
                }))
            })
    );
} 
