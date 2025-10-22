import { io, Socket } from "socket.io-client";
import { getConfig } from "../setup";
import picocolors from "picocolors";
import { loading } from "../utils";

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

    async test() {
        
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

        this.socket.close();
    }
}