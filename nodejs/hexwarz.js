

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

function handleLogin(id, ws, msg) {
  connection[id].username = msg.username;
  ws.send(JSON.stringify({ "type": "loginResponse", "accepted": true }));
}

function handleNewAccount(id, ws, msg) {
  connection[id].username = msg.username;
  ws.send(JSON.stringify({ "type": "newAccountResponse", "accepted": true }));
}

function handleUserList(id, ws, msg) {
  var user = { };
  for (var id in connection) {
    if ("username" in connection[id]) {
      user[id] = { "username": connection[id].username };
    }
  }
  ws.send(JSON.stringify({ "type": "userListResponse", "user": user }));
}

function handleGameList(id, ws, msg) {
  var game = { };
  for (var id in game) {
    game[id] = { "id": id };
  }
  ws.send(JSON.stringify({ "type": "gameListResponse", "game": game }));
}

function handleCreateGame(id, ws, msg) {

}

function handleStartGame(id, ws, msg) {

}

function handleLeaveGame(id, ws, msg) {

}

function handleMessage(id, ws, msg) {
  try {
    if (msg.type == 'connect') {
      connection[id].connectReceived = true;
      ws.send(JSON.stringify({ "type": "connectResponse", "accepted": true }));
    } else if (msg.type == 'login') {
      handleLogin(id, ws, msg);
    } else if (msg.type == 'newAccount') {
      handleNewAccount(id, ws, msg);
    } else if (msg.type == 'userList') {
      handleUserList(id, ws, msg);
    } else if (msg.type == 'gameList') {
      handleGameList(id, ws, msg);
    } else if (msg.type == 'createGame') {
      handleCreateGame(id, ws, msg);
    } else if (msg.type == 'startGame') {
      handleStartGame(id, ws, msg);
    } else if (msg.type == 'leaveGame') {
      handleLeaveGame(id, ws, msg);
    } else {
      ws.send(JSON.stringify({ "type": "ERROR", "msg" : "Unrecognized type: " + msg.type }));
    }
  } catch (e) {
    ws.send(JSON.stringify({ "type": "ERROR", "msg" : "Exception: " + e }));
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