(function() {

  // date: 2013-05-27; author: mccreavy
  function Client(p) {
    var o = {
      "open": open,
      "hook": {},
      "login": login,
      "newAccount": newAccount,
      "pushHook": pushHook,
      "userList": userList,
      "createGame": createGame,
      "startGame": startGame,
      "onOpen": onOpen,
      "onClose": onClose,
      "onMessage": onMessage,
      "url": p.url
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

  // date: 2013-05-28; author: mccreavy
  function onOpen(e) {
    var msg = {
      "type": "connect",
      "version": 1.0
    };
    if ('OPEN' in this.hook) {
      for (var i = 0 ; i < this.hook['OPEN'].length ; i++) {
        try {
          this.hook['OPEN'][i](e);
        } catch (ex) {
          console.log("Client OPEN Hook Exception ", ex);
        }
      }
    }
    this.socket.send(msg);
  }

  // date: 2013-05-28; author: mccreavy
  function onClose(e) {
    if ('CLOSE' in this.hook) {
      for (var i = 0 ; i < this.hook['CLOSE'].length ; i++) {
        try {
          this.hook['CLOSE'][i](e);
        } catch (ex) {
          console.log("Client CLOSE Hook Exception ", ex);
        }
      }
    }
  }

  // date: 2013-05-28; author: mccreavy
  function onMessage(e) {
    if ('MESSAGE' in this.hook) {
      for (var i = 0 ; i < this.hook['MESSAGE'].length ; i++) {
        try {
          this.hook['MESSAGE'][i](e);
        } catch (ex) {
          console.log("Client MESSAGE Hook Exception ", ex);
        }
      }
    }
    var d;
    try {
      d = JSON.parse(data);
      console.log("message", d);
    } catch(ex) {
      return;
    }
    if (d.type == "connectResponse") {

    } else if (d.type == "loginResponse") {

    } else if (d.type == "userListResponse") {

    } else if (d.type == "gameListResponse") {

    } else if (d.type == "chatMessage") {

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