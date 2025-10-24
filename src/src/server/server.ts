import picocolors from "picocolors";
import {Server, Socket} from "socket.io";

export class ThServer {
    
    public port: number;
    private io: Server | null = null;
    public clients : Socket[] = [];

    constructor(port: number) {
        this.port = port;
    }

    run() {
        this.io = new Server(this.port);

        this.io.on('connection', (socket : Socket) => {
            socket.on('setUsername', (username) => {
                socket.data.username = username;
                console.info(picocolors.green(`👋 ${username} (${socket.id}) join.`));

                this.clients.push(socket);
            });

            socket.on('message', (message) => {
                console.log(picocolors.blue(`💬 ${socket.data.username} >> ${message}`));
                this.clients.forEach((s) => {
                    s.emit('message', `[${socket.data.username}] >> ${message}`);
                });
            });

            socket.on('disconnect', (data) => {
                this.clients = this.clients.filter(s => s != socket);
                console.info(picocolors.yellow(`[${data}] 🔕 ${socket.data.username} (${socket.id}) left.`))
            });
        });

        console.log(picocolors.green(`✅ Server running on :${this.port}`))
    }
}