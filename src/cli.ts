#!/usr/bin/env node
import { test } from "./src/test";
import { Command } from "commander";
import figlet from "figlet";
import { version } from '../package.json';
import { setup } from "./src/setup";

console.clear();
console.log(figlet.textSync('ThTool'));

const program = new Command();

program
    .name('thtool')
    .description('ThTool CLI')
    .version(version);

program
    .command('test')
    .description('Run test')
    .action(() => {
        test();
    });

program
    .command('setup')
    .description('Run setup')
    .action(() => {
        setup();
    });

program.parse(process.argv);