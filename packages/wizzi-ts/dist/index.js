"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander"); // add this line
const figlet = require("figlet");
const step_1_1 = require("./jobs/step_1");
const step_2_1 = require("./jobs/step_2");
const step_3_1 = require("./jobs/step_3");
const step_4_1 = require("./jobs/step_4");
//add the following line
const program = new Command();
console.log(figlet.textSync("@wizzi/factory examples"));
program
    .description("Lab CLI with examples of `wizzi` core package")
    .option("--job1", "Execute a simple wizzi job")
    .option("--job2", "Execute a wizzi job with set/get production context values")
    .option("--job3", "Execute a artifact info production")
    .option("--job4", "Execute a artifact info production with collection context")
    .parse(process.argv);
const options = program.opts();
console.log('choice', options);
if (options.job1) {
    (0, step_1_1.job_1)();
}
else if (options.job2) {
    (0, step_2_1.job_2)();
}
else if (options.job3) {
    (0, step_3_1.job_3)();
}
else if (options.job4) {
    (0, step_4_1.job_4)();
}
else {
    program.help();
}
//# sourceMappingURL=index.js.map