(function() {

  // date: 2013-05-27; author: mccreavy
  function Client(p) {
    var o = {
      "open": open,
      "close": close,
      "hook": {},
      "login": login,
      "logout": logout,
      "message": message,
      "callHooks": callHooks,
      "newAccount": newAccount,
      "pushHook": pushHook,
      "userList": userList,
      "createGame": createGame,
      "startGame": startGame,
      "onOpen": onOpen,
      "onClose": onClose,
      "onMessage": onMessage,
      "url": p.url,
      "account": null, // You
      "user": {}, // Active Users, keyed by UserId
      "game": {} // Active Games, keyed by GameId
    };
    return o;
  }

  // date: 2013-05-22; author: mccreavy
  function pushHook(type, f) {
    if (!(type in this.hook)) {
      this.hook[type] = [];
    }
    this.hook[type].push(f);
  }

  // date: 2013-05-28; author: mccreavy
  function open() {
    this.socket = dirg.Socket(this);
    var self = this;
    this.socket.pushHook('OPEN', function(e) { self.onOpen(e) });
    this.socket.pushHook('CLOSE', function(e) { self.onClose(e) });
    this.socket.pushHook('MESSAGE', function(e) { self.onMessage(e) });

    // I should expect a OPEN and a VERSION 
  }

  function close() {
    this.socket.close();
  }

  // date: 2013-06-15; author: mccreavy
  // TODO(mccreavy): signature should accept varargs that get passed to hook.
  function callHooks(hookName, arg) {
    if (hookName in this.hook) {
      for (var i = 0 ; i < this.hook[hookName].length ; i++) {
        try {
          console.log("calling " + hookName + " with " + arg);
          this.hook[hookName][i](arg);
        } catch (ex) {
          console.log("Hook " + hookName + " Exception ", ex);
        }
      }
    }
  }

  // date: 2013-05-28; author: mccreavy
  function onOpen(e) {
    var msg = {
      "type": "connectRequest",
      "version": 1.0
    };
    this.callHooks("OPEN", e);
    this.socket.send(msg);
  }

  // date: 2013-05-28; author: mccreavy
  function onClose(e) {
    this.account = null; // Want to forget?  Handle accidental disconnect?
    this.callHooks("CLOSE", e);
    this.user = {};
    this.callHooks("USER_LIST_UPDATED");
    this.game = {};
    this.callHooks("GAME_LIST_UPDATED");
  }

  // date: 2013-05-28; author: mccreavy
  function onMessage(e) {
    this.callHooks("MESSAGE", e);
    var d;
    console.log("e: ", e);
    try {
      d = JSON.parse(e.data);
      console.log("message", d);
    } catch(ex) {
      console.log("Original message: ", e);
      console.log("ex: ", ex);
      return;
    }
    console.log("MESSAGE: ", d);
    // TODO(mccreavy): change to switch
    if (d.type == "connectResponse") {

    } else if (d.type == "loginResponse") {
      if (d.accepted) {
        // Store this user's information in the client.
        this.account = d.account;
        this.callHooks("LOGIN_SUCCESS", d);
      } else {
        this.callHooks("LOGIN_FAIL", d);
      }
    } else if (d.type == "logoutResponse") {
      if (d.accepted) {
        this.callHooks("LOGOUT", d);
      }
    } else if (d.type == "newAccountResponse") {
      if (d.accepted) {
        // Store this user's information in the client.
        this.account = d.account;
        this.callHooks("NEW_ACCOUNT_SUCCESS", d);
      } else {
        this.callHooks("NEW_ACCOUNT_FAIL", d);
      }
    } else if (d.type == "userListResponse") {
      this.user = {};
      for (var i = 0 ; i < d.user.length ; i++) {
        this.user[d.user[i].id] = d.user[i];
      }
      this.callHooks("USER_LIST_UPDATED");
    } else if (d.type == "userAdded") {
      this.user[d.user.id] = d.user;
      this.callHooks("USER_LIST_UPDATED");
    } else if (d.type == "userRemoved") {
      delete this.user[d.user.id];
      this.callHooks("USER_LIST_UPDATED");
    } else if (d.type == "gameAdded") {
      this.game[d.gameHeader.id] = d.gameHeader;
      this.callHooks("GAME_LIST_UPDATED");
    } else if (d.type == "gameListResponse") {
       for (var i = 0 ; i < d.game.length ; i++) {
         this.game[d.game[i].id] = d.game[i];
       }
       this.callHooks("GAME_LIST_UPDATED");
    } else if (d.type == "createGameResponse") {
      if (d.accepted) {
        this.game[d.game.id] = d.game;
        this.callHooks("GAME_UPDATED", d.game.id);
      } else {
        alert("failed create game");
      }
    } else if (d.type == "chatMessage") {

    } else if (d.type == "accountJoin") {
        this.game[d.gameId].account.push(d.accountId);
        // Add the player to the game.
        this.callHooks("GAME_UPDATED", d.gameId);
    } else if (d.type == "accountPart") {
        // Remove the player from the game.
        for (var i = 0 ; i < this.game[d.gameId].account.length ; i++) {
          if (this.game[d.gameId].account == d.accountId) {
              this.game[d.gameId].account.splice(i, 1);
          }
        }
        this.callHooks("GAME_UPDATED", d.gameId);
    }
  }

  // date: 2013-05-28; author: mccreavy
  function login(p) {
    dirg.assert("username" in p, "username required");
    dirg.assert("password" in p, "password required");
    var msg = {
      "type": "login",
      "username": p.username,
      "password": p.password
    };
    this.socket.send(msg);
  }

  function logout() {
    var msg = {
      "type": "logout"
    };
    this.socket.send(msg);
  }

  function message(destination, content) {
    var msg = {
      "type": "message",
      "destination": destination,
      "content": content
    };
    this.socket.send(msg);
  }

  // date: 2013-05-28; author: mccreavy
  function newAccount(p) {
    dirg.assert("username" in p, "username required");
    dirg.assert("password" in p, "password required");
    var msg = {
      "type": "newAccount",
      "username": p.username,
      "password": p.password
    };
    this.socket.send(msg);
  }

  // date: 2013-05-28; author: mccreavy
  function userList(p) {
    var msg = {
      "type": "userList"
    };
    this.socket.send(msg);
  }

  // date: 2013-06-01; author: mccreavy
  function createGame(p) {
    var msg = {
      "type": "createGame"
      // is it private, level, etc...
    };
    this.socket.send(msg);
  }

  // date: 2013-06-01; author: mccreavy
  function startGame(p) {
    var msg = {
      "type": "startGame"
    };
    this.socket.send(msg);
  }

  window.dirg.Client = Client;
})();