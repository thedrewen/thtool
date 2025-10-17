#!/usr/bin/env node

import { test } from "./test";
import { Command } from "commander";
import figlet from "figlet";
import {version} from '../package.json'

console.clear();
console.log(figlet.textSync('ThTool'));

const program = new Command()
    .version(version)
    .option('-t, --test', 'Run test.')
    .parse(process.argv);

const options = program.opts();

if(options.test) {
    test();
}

