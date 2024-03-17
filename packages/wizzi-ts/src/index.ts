const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import wizzi from "@wizzi/factory";
import path from 'path'
import {job_2} from './jobs/step_2'

//add the following line
const program = new Command();

console.log(figlet.textSync("@wizzi/factory examples"));

program
  .description("Lab CLI with examples of `wizzi` core package")
  .option("--job2", "Execute a wizzi job with set/get production context values")
  .parse(process.argv);

const options = program.opts();

console.log('choice', options)

if (options.job2) {
    job_2();
}   
else if (options.compare1) {
}
else {
    program.help();
}

