

var Game = require('./game').Game;

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

function sendObj(ws, obj) {
  var o = JSON.stringify(obj);
  console.log("Sending: " + o);
  ws.send(o);
}

function sendAll(obj) {
  for (var i in connection) {
    sendObj(connection[i].ws, obj);
  }
}

function handleClose(id) {
  // remove the player from any active games?
  // instead of iterating over all games, connection will have list of games.
  for (var i in game) {
    console.log("Need to check about removing id " + id + " from game " + i);
  }

  for (var i in connection) {
    sendObj(connection[i].ws, { "type": "userRemoved",
       "user": { "id" : id }});
  }
}

function handleConnect(id, ws, msg) {
  connection[id].connectReceived = true;
  if (msg.version >= 1.0) {
    sendObj(ws, { "type": "connectResponse", "accepted": true });
    sendUserList(ws);
    sendGameList(ws);
  } else {
    sendObj(ws, { "type": "connectResponse", "accepted": false,
        "reason": "refresh client" });
    ws.close();
  }
}

function loadAccount(username, password) {
    return { "name": username, "id": 345 };
}

function newAccount(username, password) {
    return { "name": username, "id": 834 };
}

function handleLogin(id, ws, msg) {
  if ('account' in connection[id]) {
    sendObj(ws, { "type": "loginResponse", "accepted": false,
        "reason": "already logged in: " + connection[id].account.name });
    return;
  }

  var account = loadAccount(msg.username, msg.password);

  if (null == account) {
    sendObj(ws, { "type": "loginResponse", "accepted": false,
        "reason": "invalid credentials" });
    return;
  }
  connection[id].account = account;

  // TODO(mccreavy): restore user to any games they're active in.

  sendObj(ws, { "type": "loginResponse", "accepted": true,
      "account": account });

  // Tell all connections about the new user
  sendAll({ "type": "userAdded",
      "user": { "name": account.name, "id" : account.id,
      "connectionId": id }});
}

function handleLogout(id, ws, msg) {
  if (!("account" in connection[id])) {
    sendObj(ws, { "type": "logoutResponse", "accepted": false,
        "reason": "not logged in" });
    return;
  }

  sendObj(ws, { "type": "logoutResponse", "accepted": true });
  // TODO(mccreavy): notify people they're legitimately logging out?
  ws.close();
}

/**
 * - TODO(mccreavy): if parameters not present, deny.
 * - if the user is already logged in, deny.
 */
function handleNewAccount(id, ws, msg) {
  if ('account' in connection[id]) {
    sendObj(ws, { "type": "newAccountResponse", "accepted": false,
        "reason": "already logged in: " + connection[id].account.name });
    return;
  }

  var account = newAccount(msg.username, msg.password);

  if (null == account) {
    sendObj(ws, { "type": "newAccountResponse", "accepted": false,
        "reason": "Couldn't create new account" });
    return;
  }

  connection[id].account = account;
  sendObj(ws, { "type": "newAccountResponse", "accepted": true,
      "account": account });

  sendAll({ "type": "userAdded",
      "user": { "username": account.name, "id" : account.id }});
}

function sendUserList(ws) {
  var user = [];
  for (var id in connection) {
    if ("account" in connection[id]) {
      user.push({ "id": connection[id].account.id,
          "connectionId": id,
          "name": connection[id].account.name });
    }
  }
  sendObj(ws, { "type": "userListResponse", "user": user });
}

function handleUserList(id, ws, msg) {
  sendUserList(ws);
}

function sendGameList(ws) {
  var games = [];
  for (var id in game) {
    // TODO(mccreavy): send full representation of game.
    games.push({ "id": game[id].id,
        "owner": game[id].owner,
        "account": game[id].account });
  }
  console.log("FINAL: ");
  sendObj(ws, { "type": "gameListResponse", "game": games });
}

function handleGameList(id, ws, msg) {
  sendGameList(ws);
}

function handleCreateGame(connectionId, ws, msg) {
  if (!("account" in connection[connectionId])) {
    sendObj(ws, { "type": "createGameResponse", "accepted": false,
        "reason": "Must be logged in to create game" });
    return;
  }

  // TODO(mccreavy): conditionally create game, otherwise send accepted=false
  var newGame = Game({ owner: connection[connectionId].account.id });
  game[newGame.id] = newGame;

  sendObj(ws,
      { "type": "createGameResponse",
        "accepted": true,
        "game": { "id": newGame.id,
            "owner": newGame.owner,
            "account": newGame.account }
      });

  // Automatically add the given player?
  //if (newGame.addPlayer(userId)) {
  //  sendObj(ws, { "type": "playerAdded", "gameId": newGame.id,
  //      "userId": userId });
  //}
}

function handleStartGame(id, ws, msg) {
  if (!msg.id in game) {
    sendObj(ws, { "type": "startGameResponse", "accepted": false,
        "reason": "unknown id: " + msg.id });
    return;
  }

  console.log("Starting Game -- initialize with current number of players");
}

function handleLeaveGame(id, ws, msg) {

}

function handleMessage(id, ws, msg) {
  try {
    if (msg.type == 'connectRequest') {
      handleConnect(id, ws, msg);
    } else if (msg.type == 'login') {
      handleLogin(id, ws, msg);
    } else if (msg.type == "logout") {
      handleLogout(id, ws, msg);
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
      ws.send(JSON.stringify({ "type": "ERROR",
          "msg" : "Unrecognized type: " + msg.type }));
    }
  } catch (e) {
    sendObj({ "type": "ERROR", "msg" : "Exception: " + e });
    throw e;
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
    handleClose(id);
  });

  //connection[id].interval = setInterval(function() {
  //  ws.send(JSON.stringify({ "type": "PING" }));
  //}, 5000);
});