import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var stepIttfPath = path.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'step_4');
var stepResultsPath = path.join(__dirname, '..', '..', 'src', 'jobs', 'results', 'step_4');

export function job_4() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.js/index.js", 
                "./wizzi.plugin.json/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=> {
            const pman: wizzi.ProductionManager = wf.createProductionManager({}, {});
            pman.addProductionStepRequest({
                name: "Examples - step - 4",
                model: {cwd: stepIttfPath, src: "tableDto.js.ittf", schema: "js", contexts : [{
                    cwd: stepIttfPath, src: "schemaData.json.ittf", schema: "json", coll: {
                        name: 'tables', 
                        itemName: "tableDef", 
                        pathTemplateValues:[{
                            attribute: "name",
                            token: "Dto"
                        }]
                    }
                }], transformers: []},
                gen: { generator: "js/module"},
                options: {basedir: ""},
                dest: { folder: stepResultsPath, path: "{Dto}Dto", extension: ".js"},
                contexts: []
            });
            pman.run((err:any, result:wizzi.ProductionStep[]) => {
                console.log('err', err);
                if (err) {return;}
                result.forEach((item: wizzi.ProductionStep) => {
                    console.log('Result', item.genContexts[0].getContent())
                })
                pman.persistToFile((err:any, result:wizzi.PManPersistResult[]) => {
                    console.log('err', err);
                    if (err) {return;}
                    result.forEach((item: wizzi.PManPersistResult) => {
                        console.log('Result', item)
                    })
                })
            });
            })
    );
} 
