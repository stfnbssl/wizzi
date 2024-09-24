import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var jobPath = path.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'epic.wzjob.ittf');

export function job_epic() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.ts/index.js", 
                "./wizzi.plugin.json/index.js", 
                "./wizzi.plugin.wzjob/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=>{
            wf.executeJob({
                name: 'Job2 example',
                path: jobPath,
                productionOptions: {
                    indentSpaces: 4,
                    basedir: __dirname,
                    verbose: 2
                },
                globalContext: {
                    options: {
                        destFolder: 'output/epic'
                    }
                }}, ((err, result)=> {
                    console.log('err', err);
                    console.log('result', result);
                }))
            })
    );
} 
