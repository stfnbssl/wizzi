import path from 'path'
import wizzi from '@wizzi/factory'
import {generateMeta, pluginOptions, metaPluginOptions} from '../meta'

var metaCtxPath = path.join(__dirname, '..', '..', 'src', 'meta', 'ittf', 'step_1.json.ittf');
var destPath = path.join(__dirname, '..', '..', 'src', 'meta', 'output', 'step_1');

export function meta_1() {
    generateMeta(
        metaCtxPath,
        destPath,
        pluginOptions,
        metaPluginOptions,
        {},
        ((err: any, result: any) => {
        })
    );
} 