const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const PORT = process.env.PORT || 7000
const httpServer = server.listen(PORT);
const io = new Server(httpServer)

console.log('🤘...Websocket service run in port ' + PORT);