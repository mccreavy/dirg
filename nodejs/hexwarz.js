

var TicTacToe = require('./TicTacToe').TicTacToe;

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

function sendObj(c, obj) {
  var o = JSON.stringify(obj);
  console.log(">" + c.id + "> Sending: " + o);
  c.ws.send(o);
}

function sendAll(obj) {
  for (var i in connection) {
    sendObj(connection[i], obj);
  }
}

function handleClose(id) {
  // remove the player from any active games?
  // instead of iterating over all games, connection will have list of games.
  for (var i in game) {
    console.log("Need to check about removing id " + id + " from game " + i);
  }

  for (var i in connection) {
    sendObj(connection[i], { "type": "userRemoved",
       "user": { "id" : id }});
  }
}

function handleConnect(c, msg) {
  c.connectReceived = true;
  if (msg.version >= 1.0) {
    sendObj(c, { "type": "connectResponse", "accepted": true });
    sendUserList(c);
    sendGameList(c);
  } else {
    sendObj(ws, { "type": "connectResponse", "accepted": false,
        "reason": "refresh client" });
    ws.close();
  }
}

function loadAccount(username, password) {
    return { "name": username, "id": username + "123" };
}

function newAccount(username, password) {
    return { "name": username, "id": username + "123" };
}

function handleLogin(c, msg) {
  if ('account' in c) {
    sendObj(c, { "type": "loginResponse", "accepted": false,
        "reason": "already logged in: " + c.account.name });
    return;
  }

  var account = loadAccount(msg.username, msg.password);

  if (null == account) {
    sendObj(c, { "type": "loginResponse", "accepted": false,
        "reason": "invalid credentials" });
    return;
  }
  c.account = account;

  // TODO(mccreavy): restore user to any games they're active in.

  sendObj(c, { "type": "loginResponse", "accepted": true,
      "account": account });

  sendGameList(c);

  // Tell all connections about the new user
  sendAll({ "type": "userAdded",
      "user": { "name": account.name, "id" : account.id,
      "connectionId": c.id }});
}

function handleLogout(c, msg) {
  if (!("account" in c)) {
    sendObj(c, { "type": "logoutResponse", "accepted": false,
        "reason": "not logged in" });
    return;
  }

  sendObj(c, { "type": "logoutResponse", "accepted": true });
  // TODO(mccreavy): notify people they're legitimately logging out?
  c.ws.close();
}

/**
 * - TODO(mccreavy): if parameters not present, deny.
 * - if the user is already logged in, deny.
 */
function handleNewAccount(c, msg) {
  if ('account' in c) {
    sendObj(c, { "type": "newAccountResponse", "accepted": false,
        "reason": "already logged in: " + c.account.name });
    return;
  }

  var account = newAccount(msg.username, msg.password);

  if (null == account) {
    sendObj(c, { "type": "newAccountResponse", "accepted": false,
        "reason": "Couldn't create new account" });
    return;
  }

  c.account = account;
  sendObj(c, { "type": "newAccountResponse", "accepted": true,
      "account": account });

  sendAll({ "type": "userAdded",
      "user": { "username": account.name, "id" : account.id }});
}

function sendUserList(c) {
  var user = [];
  for (var id in connection) {
    if ("account" in connection[id]) {
      user.push({ "id": connection[id].account.id,
          "connectionId": id,
          "name": connection[id].account.name });
    }
  }
  sendObj(c, { "type": "userListResponse", "user": user });
}

function handleUserList(c, msg) {
  sendUserList(c);
}

function sendGameList(c) {
  var gameHeader = [];
  var gameState = [];
  for (var id in game) {
    gameHeader.push( game[id].getHeader() );
    if (("account" in c) && game[id].hasAccount(c.account.id)) {
      gameState.push( game[id].getState() );
    }
  }
  sendObj(c, { "type": "gameListResponse",
      "gameHeader": gameHeader,
      "gameState": gameState });
}

function handleGameList(c, msg) {
  sendGameList(c);
}

function handleCreateGame(c, msg) {
  if (!("account" in c)) {
    sendObj(c, { "type": "createGameResponse", "accepted": false,
        "reason": "Must be logged in to create game" });
    return;
  }

  // TODO(mccreavy): conditionally create game, otherwise send accepted=false
  var newGame = TicTacToe({ owner: c.account.id });
  game[newGame.id] = newGame;

  // TODO: move "extract just the header bit" into Game()
  sendAll({ "type": "gameAdded",
      "gameHeader": newGame.getHeader() });

  // Send the boardstate for this game to the owner.
  sendObj(c, { "type": "gameState",
      "gameState": newGame.getState() });
}

// date: 2013-07-10, author: mccreavy
function handleJoinGame(c, msg) {
  if (!("account" in c)) {
    sendObj(c, { "type": "joinGameResponse", "accepted": false,
        "reason": "Must be logged in to join game" });
    return;
  }
  if (!(msg.game in game)) {
    sendObj(c, { "type": "joinGameResponse", "accepted": false,
        "reason": "Could not find game '" + msg.game + "'" });
    return;
  }
  // TODO(mccreavy): is game in joinable state?  room to join?
  game[msg.game].account.push(c.account.id);
  sendAll({ "type": "gameJoined",
    "game": msg.game,
    "account": c.account.id
  });
  sendObj(c, { "type": "gameState",
      "gameState": game[msg.game].getState() });
}

// date: 2013-07-10, author: mccreavy
function handleExitGame(c, msg) {
  if (!("account" in c)) {
    sendObj(c, { "type": "exitGameResponse", "accepted": false,
        "reason": "Must be logged in to exit game" });
    return;
  }
  if (!(msg.game in game)) {
    sendObj(c, { "type": "exitGameResponse", "accepted": false,
        "reason": "Could not find game '" + msg.game + "'" });
    return;
  }
  // TODO(mccreavy): is account in game?
  // TODO(mccreavy): if account is owner, elect new owner
  // TODO(mccreavy): if game is empty, retire game
  for (var i = 0 ; i < game[msg.game].account.length ; i++) {
    if (game[msg.game].account[i] == c.account.id) {
      game[msg.game].account.splice(i, 1);
      break;
    }
  }

  sendAll({ "type": "gameExited",
    "game": msg.game,
    "account": c.account.id
  });
}

function handleStartGame(c, msg) {
  if (!msg.id in game) {
    sendObj(c, { "type": "startGameResponse", "accepted": false,
        "reason": "unknown id: " + msg.id });
    return;
  }

  console.log("Starting Game -- initialize with current number of players");
}

// date: 2013-07-08, author: mccreavy
function handleSendMessage(c, msg) {
  sendAll(msg);
}

function handleMessage(c, msg) {
  //try {
    if (msg.type == 'connectRequest') {
      handleConnect(c, msg);
    } else if (msg.type == 'login') {
      handleLogin(c, msg);
    } else if (msg.type == "logout") {
      handleLogout(c, msg);
    } else if (msg.type == 'newAccount') {
      handleNewAccount(c, msg);
    } else if (msg.type == 'userList') {
      handleUserList(c, msg);
    } else if (msg.type == 'gameList') {
      handleGameList(c, msg);
    } else if (msg.type == 'createGame') {
      handleCreateGame(c, msg);
    } else if (msg.type == 'joinGame') {
      handleJoinGame(c, msg);
    } else if (msg.type == 'exitGame') {
      handleExitGame(c, msg);
    } else if (msg.type == 'startGame') {
      handleStartGame(c, msg);
    } else if (msg.type == 'message') {
      handleSendMessage(c, msg);
    } else {
      c.send(JSON.stringify({ "type": "ERROR",
          "msg" : "Unrecognized type: " + msg.type }));
    }
  //} catch (e) {
  //  sendObj({ "type": "ERROR", "msg" : "Exception: " + e });
  //  throw e;
  //}
}

wss.on('connection', function(ws) {
  var id = connectionCount++;
  connection[id] = { 'ws': ws, 'id': id };

  ws.on('message', function(message) {
    console.log('received: %s', message);
    handleMessage(connection[id], JSON.parse(message));
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