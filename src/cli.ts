#!/usr/bin/env node
import { test } from "./src/test";
import { Command } from "commander";
import figlet from "figlet";
import { version } from '../package.json';
import { setup } from "./src/setup";
import { ThServer } from "./src/server/server";
import { ThClient } from "./src/client/client";

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
        new ThClient()
            .test();
    });

program
    .command('server')
    .description('Run server')
    .option('-p, --port <value>', 'Server Port', '8080')
    .action((options) => {
        new ThServer(options.port)
            .run();
    });

program
    .command('setup')
    .description('Run setup')
    .action(() => {
        setup();
    });

program.parse(process.argv);