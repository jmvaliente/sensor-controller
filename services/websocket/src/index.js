const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const mqtt = require('mqtt');

const server = http.createServer(app);
const PORT = process.env.PORT || 7000
const httpServer = server.listen(PORT);
const ioServer = new Server(httpServer)
console.log('🤘...Websocket service run in port ' + PORT);

const clientMqtt = mqtt.connect('mqtt://test.mosquitto.org')

ioServer.on('connection', socketServer => {
    console.log('Connect Socket Server')
})

clientMqtt.on('connect', function () {
    clientMqtt.subscribe('testtopic/10', error => {
      if (!error) {
        clientMqtt.publish('testtopic/10', 'Hello mqtt')
      }
    })
  })

  clientMqtt.on('message', function (topic, message) {
    console.log(message.toString())
    ioServer.emit('message',message.toString())
  })
