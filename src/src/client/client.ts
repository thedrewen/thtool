import { io, Socket } from "socket.io-client";
import { getConfig } from "../setup";
import picocolors from "picocolors";
import { loading } from "../utils";
import PromptSync from "prompt-sync";
import readline from "readline";

const prompt = PromptSync({sigint: true})

export class ThClient {
    private socket : Socket | null = null;

    constructor() {
        const config = getConfig();
        if(config.url == undefined || config.url == '') {
            console.error(picocolors.red('👾 The server URL is not configured!'))
            return;
        }

        this.socket = io(config.url);

        this.socket.on("connect", () => {
            console.info(picocolors.green(`✅ Connected to server !`));
            
            this.socket?.emit('setUsername', config.username);
        });
    }

    async test(closeCon : boolean = true) {
        
        const loader = loading();
        await new Promise((res, rej) => setTimeout(() => {clearInterval(loader);res('')}, 1000))
        console.log('\r ');

        if(this.socket == null) {
            console.error(picocolors.yellow('💻 This client is not valid, please configure it! (npx thtool setup)'));
            return;
        }
        
        if(this.socket.connected) {
            console.info(picocolors.green(`✅ Connection established!`));
        }else{
            console.warn(picocolors.yellow(`📛 Connection failed !`));
        }

        if(closeCon) {
            this.socket.close();
        }
    }

    async connectToChat() {
        
        await this.test(false); 

        this.socket?.on('message', (message) => {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            console.info(message);
            rl.prompt(true);
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        rl.prompt();
        rl.on('line', (line) => {
            this.socket?.emit('message', line);
            rl.prompt();
        }).on('close', () => {
            console.log('Exit !');
            this.socket?.close();
            process.exit(0);
        });
    }
}