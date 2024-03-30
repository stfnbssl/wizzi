"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander"); // add this line
const figlet = require("figlet");
const step_1_1 = require("./json/step_1");
//add the following line
const program = new Command();
console.log(figlet.textSync("@wizzi/factory examples"));
program
    .description("Lab CLI with examples of `wizzi` core package")
    .option("--rw1", "Read/write on a json store")
    .parse(process.argv);
const options = program.opts();
console.log('choice', options);
if (options.rw1) {
    (0, step_1_1.read_write_json)();
}
else {
    program.help();
}
//# sourceMappingURL=index.js.map