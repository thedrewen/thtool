import prtsync from "prompt-sync";
// @ts-expect-error
import promptPassword from "password-prompt";
import pc from 'picocolors';
import fs from "fs";
import { Config } from "../type";

const prompt = prtsync({sigint: true})

export async function setup() {
    console.log(pc.green('👋 Welcome to ThTool Setup !\n'))
    const config : Config = getConfig();

    const questions : {text: string, element: 'server_host' | 'server_port' | 'username' | 'password'}[] = [
        {
            text: '💻 Define server host',
            element: 'server_host'
        },
        {
            text: '💻 Define server port',
            element: 'server_port'
        },
        {
            text : "😺 Define your username",
            element: "username"
        },
        {
            text : "🔒 Define your password",
            element: "password"
        }
    ]
    
    for (const q of questions) {
        if(q.element == "password") {
            const value = await promptPassword(pc.blue(`${q.text} : `));
            config[q.element] = value != '' ? value : config[q.element];
        }else{
            const value = await prompt(pc.blue(`${q.text} ${config[q.element] != undefined ? '('+config[q.element]+')' : ''}: `));
            config[q.element] = value != '' ? value : config[q.element];
        }
    };

    saveConfig(config);
    console.log(pc.green('💾 Setup complete !'))
}

export function getConfig() : Config {
    let rawdata = fs.readFileSync('./data/config.json');
    let config = JSON.parse(rawdata.toString('utf-8'));
    return config;
}

export function saveConfig(config: Config) {
    config.last_update = new Date();
    fs.writeFileSync('./data/config.json', JSON.stringify(config));
}