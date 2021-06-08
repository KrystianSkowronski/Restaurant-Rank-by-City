const http = require('http');
const app = require("./app")

// port
const port = process.env.PORT || 3000;

// stworzenie serwera
const server = http.createServer(app);

// odpalenie serwera
server.listen(port);