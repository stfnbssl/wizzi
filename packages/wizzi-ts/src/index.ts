const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import wizzi from "@wizzi/factory";
import path from 'path'
import {artifact_1} from './artifacts/step_1'
import {artifact_gen_folder_1} from './artifacts/gen_folder_1'
import {job_1} from './jobs/step_1'
import {job_2} from './jobs/step_2'
import {job_3} from './jobs/step_3'
import {job_4} from './jobs/step_4'
import {job_epic} from './jobs/epic'
import {meta_1} from './meta/step_1'
import {cheat_1} from './cheatsheets/step_1'

//add the following line
const program = new Command();

console.log(figlet.textSync("@wizzi/factory examples"));

program
  .description("Lab CLI with examples of `wizzi` core package")
  .option("--artifact1", "Execute a simple artifact generation")
  .option("--genfolder1", "Execute a folder artifact generation")
  .option("--job1", "Execute a simple wizzi job")
  .option("--job2", "Execute a wizzi job with set/get production context values")
  .option("--job3", "Execute a artifact info production")
  .option("--job4", "Execute a artifact info production with collection context")
  .option("--jobepic", "Execute a lab wizzi job for epic stack")
  .option("--cheat1", "Retrieve a cheatsheet")
  .option("--meta1", "Execute a meta production")
  .parse(process.argv);

const options = program.opts();

console.log('choice', options)

if (options.artifact1) { artifact_1(); } 
else if (options.genfolder1) { artifact_gen_folder_1(); }   
else if (options.job1) { job_1(); }   
else if (options.job2) { job_2(); }
else if (options.job3) { job_3(); }
else if (options.job4) { job_4(); }
else if (options.jobepic) { job_epic(); }
else if (options.meta1) { meta_1(); }   
else if (options.cheat1) { cheat_1(); }
else {
    program.help();
}