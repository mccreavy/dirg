

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ 'port': 8080 });

// List of open connections, keyed by socket
var connectionCount = 0;
var connection = { };
var game = { };

function printConnections() {
  for (var i in connection) {
    console.log("CONNECTION " + i);
  }
}

function handleMessage(id, ws, msg) {
  if (msg.type == 'CONNECT') {
    connection[id].connectReceived = true;
    ws.send(JSON.stringify({ "type": "CONNECT_ACCEPTED" }));
  } else if (msg.type == 'LOGIN') {

  } else if (msg.type == 'NEWACCOUNT') {

  } else if (msg.type == 'CREATE_GAME') {

  } else if (msg.type == 'START_GAME') {

  } else if (msg.type == 'LEAVE_GAME') {

  }
}

wss.on('connection', function(ws) {
  var id = connectionCount++;
  connection[id] = { 'ws': ws };

  ws.on('message', function(message) {
    console.log('received: %s', message);
    handleMessage(id, ws, JSON.parse(message));
    printConnections();
  });
  ws.on('close', function() {
    delete connection[id];
    console.log('closed');
    printConnections();
  });

  setInterval(function() {
    ws.send(JSON.stringify({ "type": "PING" }));
  }, 5000);
});