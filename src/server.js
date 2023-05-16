import app from './app.js';
import { connectDataBase } from './database/connectDB.js';
import * as socketio from 'socket.io';
import WebSockets from './utils/WebSockets.js';
import http from 'http';

const PORT = process.env.PORT || 3000;
//Create HTTP server
const server = http.createServer(app);
/** Create socket connection */
global.io = new socketio.Server(server);
const _instanceWebSocket = new WebSockets();
global.io.on('connection', _instanceWebSocket.connection);
async function run() {
    await connectDataBase();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
run();
