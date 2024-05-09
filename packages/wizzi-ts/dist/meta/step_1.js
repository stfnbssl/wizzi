"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta_1 = void 0;
const path_1 = __importDefault(require("path"));
const meta_2 = require("../meta");
var metaCtxPath = path_1.default.join(__dirname, '..', '..', 'src', 'meta', 'ittf', 'step_1.json.ittf');
var destPath = path_1.default.join(__dirname, '..', '..', 'src', 'meta', 'output', 'step_1');
function meta_1() {
    (0, meta_2.generateMeta)(metaCtxPath, destPath, meta_2.pluginOptions, meta_2.metaPluginOptions, {}, ((err, result) => {
    }));
}
exports.meta_1 = meta_1;
//# sourceMappingURL=step_1.js.map