"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander"); // add this line
const figlet = require("figlet");
const step_1_1 = require("./jswizzi/step_1");
const step_2_1 = require("./jswizzi/step_2");
const step_3_1 = require("./jswizzi/step_3");
const step_1_2 = require("./mtree/step_1");
//add the following line
const program = new Command();
console.log(figlet.textSync("@wizzi/mtree examples"));
program
    .description("Lab CLI with examples of `wizzi` core package")
    .option("--parse1", "Execute a parsing with JsWizziRunner")
    .option("--load1", "Execute loading an Ittf document")
    .option("--load2", "Execute load_mtree_1")
    .option("--load3", "Execute load_jswizzi_2")
    .parse(process.argv);
const options = program.opts();
console.log('choice', options);
if (options.parse1) {
    (0, step_1_1.parse_1)();
}
else if (options.load1) {
    (0, step_2_1.load_jswizzi_1)();
}
else if (options.load2) {
    (0, step_1_2.load_mtree_1)();
}
else if (options.load3) {
    (0, step_3_1.load_jswizzi_2)();
}
else {
    program.help();
}
//# sourceMappingURL=index.js.map