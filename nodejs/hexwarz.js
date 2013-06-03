

require('./game');

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ 'port': 8080 });

// List of open connections, keyed by socket
var connectionCount = 0;
var connection = { };
var gameCount = 0;
var game = { };

function printConnections() {
  for (var i in connection) {
    console.log("CONNECTION " + i);
  }
}

function handleConnect(id, ws, msg) {
  connection[id].connectReceived = true;
  if (msg.version >= 1.0) {
    ws.send(JSON.stringify({ "type": "connectResponse", "accepted": true }));
  } else {
    ws.send(JSON.stringify({ "type": "connectResponse", "accepted": false, "reason": "refresh client" }));
    ws.close();
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
  var id = gameCount++;
  game[id] = Game();
  ws.send(JSON.stringify({ "type": "connectResponse", "id": id }));
}

function handleStartGame(id, ws, msg) {
  if (!msg.id in game) {
    ws.send(JSON.stringify({ "type": "startGameResponse", "accepted": false,
        "reason": "unknown id: " + msg.id }));
    return;
  }

  console.log("Starting Game -- initialize with current number of players");
}

function handleLeaveGame(id, ws, msg) {

}

function handleMessage(id, ws, msg) {
  try {
    if (msg.type == 'connect') {
      handleConnect(id, ws, msg);
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
    clearInterval(connection[id].interval);
    delete connection[id];
    console.log('closed');
    printConnections();
  });

  connection[id].interval = setInterval(function() {
    ws.send(JSON.stringify({ "type": "PING" }));
  }, 5000);
});