const http = require('http');
const websocket = require('websocket').server;
const httpServer = http.createServer();

httpServer.listen(process.env.PORT, () => {
  console.log('Web Socket server now online!');
});

const server = new websocket({
  httpServer
});

let connections = [];
let gameObjects = {};
server.on('request', req => {
  const connection = req.accept(null, req.origin);
  connection.send(JSON.stringify({
    event: 'REQUEST'
  }));

  connection.on('message', res => {
    const response = JSON.parse(res.utf8Data);
    switch(response.event) {
      case 'REGISTER': {
        connections = [...connections, connection];
        connection.send(JSON.stringify({
          event: 'START',
          objects: gameObjects
        }));
        break;
      }
      case 'ADD': {
        console.log(response.object)
        if(!gameObjects[response.object.id]) gameObjects[response.object.id] = response.object;
        else {
          gameObjects[response.object.id] = res.object
        }

        for(const con of connections) {
          con.send(JSON.stringify({
            event: 'RENDER',
            object: response.object
          }))
        }
        break;
      }
    }
  })
})