const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import wizzi from "@wizzi/factory";
import path from 'path'
import {job_1} from './jobs/step_1'
import {job_2} from './jobs/step_2'
import {job_3} from './jobs/step_3'
import {job_4} from './jobs/step_4'

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

console.log('choice', options)

if (options.job1) { job_1(); }   
else if (options.job2) { job_2(); }
else if (options.job3) { job_3(); }
else if (options.job4) { job_4(); }
else {
    program.help();
}

