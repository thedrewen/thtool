import picocolors from "picocolors";
import {Server} from "socket.io";

export class ThServer {
    
    public port: number;
    private io: Server | null = null;

    constructor(port: number) {
        this.port = port;
    }

    run() {
        this.io = new Server(this.port);

        this.io.on('connection', (socket) => {
            socket.on('setUsername', (username) => {
                socket.data.username = username;
                console.info(picocolors.green(`👋 ${username} (${socket.id}) join.`));
            });

            socket.on('disconnect', (data) => {
                console.info(picocolors.yellow(`[${data}] 🔕 ${socket.data.username} (${socket.id}) left.`))
            })
        });

        console.log(picocolors.green(`✅ Server running on :${this.port}`))
    }
}