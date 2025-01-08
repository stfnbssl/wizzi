import path from 'path'
import wizzi from '@wizzi/factory'
import {createFsWizziFactory} from '../factory'

export function cheat_1() {
    createFsWizziFactory(
        {},
        {
            items:[
                "./wizzi.plugin.ittf/index.js", 
            ],
            pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
        }, ((err, wf: wizzi.WizziFactory)=>{
            wf.getCheatsheet("ittf", ((err, result)=> {
                console.log('err', err);
                console.log('result', result);
            }))
        })
    );
} 
