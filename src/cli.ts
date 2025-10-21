#!/usr/bin/env node

import { test } from "./src/test";
import { Command } from "commander";
import figlet from "figlet";
import {version} from '../package.json'
import { setup } from "./src/setup";

console.clear();
console.log(figlet.textSync('ThTool'));

const program = new Command()
    .version(version)
    .option('-t, --test', 'Run test.')
    .option('-s, --setup', 'Run setup.')
    .parse(process.argv);

const options = program.opts();

if(options.test) {
    test();
}else if(options.setup) {
    setup();
}