const express = require('express');
require("dotenv").config();
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const mqtt = require('mqtt');

const PORT = process.env.PORT || 7000
const TOPIC = process.env.TOPIC
const SERVER_MQTT = process.env.SERVER_MQTT
const server = http.createServer(app);
const httpServer = server.listen(PORT);
const ioServer = new Server(httpServer)
console.log('🤘...Websocket service run in port ' + PORT);

const clientMqtt = mqtt.connect(SERVER_MQTT)

ioServer.on('connection', socketServer => {
    console.log('Connect Socket Server')
})

clientMqtt.on('connect', function () {
    clientMqtt.subscribe(TOPIC, error => {
      if (!error) {
        clientMqtt.publish(TOPIC, 'Hello mqtt')
      }
    })
  })

  clientMqtt.on('message', function (topic, message) {
    console.log(message.toString())
    ioServer.emit('message',message.toString())
  })
