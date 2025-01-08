const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import wizzi from "@wizzi/factory";
import path from 'path'
import {parse_1} from './jswizzi/step_1'
import {load_jswizzi_1} from './jswizzi/step_2'
import {load_jswizzi_2} from './jswizzi/step_3'
import {load_mtree_1} from './mtree/step_1'
import {load_mtree_script} from './mtree/step_2'
import {load_dump_mtree} from './mtree/load_dump_mtree'

//add the following line
const program = new Command();

console.log(figlet.textSync("@wizzi/mtree examples"));

program
  .description("Lab CLI with examples of `wizzi` core package")
  .option("--parse1", "Execute a parsing with JsWizziRunner")
  .option("--load1", "Execute loading an Ittf document")
  .option("--load2", "Execute load_mtree_1")
  .option("--script", "Execute load_mtree_script")
  .option("--load3", "Execute load_jswizzi_2")
  .option("--load_dump", "Execute load_dump_mtree")
  .option('-f, --file <filename>', 'Specify the input filename') // Option for input file
  .option('-o, --output-format <format>', 'Specify the output format (e.g., json, xml)', 'json') // Option with a default  
  .parse(process.argv);

const options = program.opts();

console.log('choice', options)

if (options.parse1) { parse_1(); }   
else if (options.load1) { load_jswizzi_1(); }   
else if (options.load2) { load_mtree_1(); }   
else if (options.load3) { load_jswizzi_2(); }   
else if (options.script) { load_mtree_script(); }   
else if (options.load_dump) { load_dump_mtree(options); }   
else {
    program.help();
}

