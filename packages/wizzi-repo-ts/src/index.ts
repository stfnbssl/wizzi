const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import {read_write_json} from './json/step_1'

//add the following line
const program = new Command();

console.log(figlet.textSync("@wizzi/repo examples"));

program
  .description("Lab CLI with examples of `wizzi` core package")
  .option("--rw1", "Read/write on a json store")
  .parse(process.argv);

const options = program.opts();

console.log('choice', options)

if (options.rw1) { read_write_json(); }   
else {
    program.help();
}

