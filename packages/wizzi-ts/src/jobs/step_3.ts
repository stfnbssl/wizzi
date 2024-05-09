import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

var stepIttfPath = path.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'step_3');
var stepResultsPath = path.join(__dirname, '..', '..', 'src', 'jobs', 'results', 'step_3');

export function job_3() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.html/index.js", 
                "./wizzi.plugin.json/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=> {
            const pman: wizzi.ProductionManager = wf.createProductionManager({}, {});
            pman.addProductionStepRequest({
                name: "Examples - step - 3a",
                model: {cwd: stepIttfPath, src: "first.html.ittf", schema: "html", contexts : [], transformers: []},
                gen: { generator: "html/document"},
                options: {basedir: ""},
                dest: { folder: stepResultsPath, path: path.join(stepResultsPath, 'first.html'), extension: ".html"},
                contexts: []
            });
            pman.addProductionStepRequest({
                name: "Examples - step - 3b",
                model: {
                    cwd: stepIttfPath, 
                    src: "forms.html.ittf", 
                    schema: "html", 
                    contexts: [{
                        cwd: stepIttfPath, 
                        src: "formsData.json.ittf", 
                        schema: "json", 
                        exportName: "data"
                    }],
                    transformers: []
                },
                gen: { generator: "html/document"},
                options: {basedir: ""},
                dest: { folder: stepResultsPath, path: path.join(stepResultsPath, 'forms.html'), extension: ".html"},
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
