import app from './app.js';
import http from 'http';

const PORT = process.env.PORT || 3000;

//Create HTTP server
const server = http.createServer(app);
async function run() {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
run();
