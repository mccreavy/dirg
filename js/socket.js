(function() {
  function Socket(p) {
    var o = {
      'websocket': new WebSocket(p.url),
      'close': close,
      'send': send,
      'onOpen': onOpen,
      'hook': {},
      'pushHook': pushHook,
      'onClose': onClose,
      'onMessage': onMessage,
      'onError': onError
    };

    o.websocket.onopen = function(e) { o.onOpen(e); };
    o.websocket.onclose = function(e) { o.onClose(e); };
    o.websocket.onmessage = function(e) { o.onMessage(e); };
    o.websocket.onerror = function(e) { o.onError(e); };

    return o;
  }

  // date: 2013-06-15; author: mccreavy
  function close() {
    this.websocket.close();
    this.websocket = null;
  }

  // date: 2013-05-28; author: mccreavy
  function send(data) {
    this.websocket.send(JSON.stringify(data));
  }

  // date: 2013-05-28; author: mccreavy
  function pushHook(type, f) {
    if (!(type in this.hook)) {
      this.hook[type] = [];
    }
    this.hook[type].push(f);
  }

  // date: 2013-05-28; author: mccreavy
  function onOpen(e) {
    if ('OPEN' in this.hook) {
      for (var i = 0 ; i < this.hook['OPEN'].length ; i++) {
        try {
          this.hook['OPEN'][i](e);
        } catch (ex) {
          console.log("Socket OPEN Hook Exception ", ex);
        }
      }
    }
  }

  // date: 2013-05-28; author: mccreavy
  function onClose(e) {
    if ('CLOSE' in this.hook) {
      for (var i = 0 ; i < this.hook['CLOSE'].length ; i++) {
        try {
          this.hook['CLOSE'][i](e);
        } catch (ex) {
          console.log("Socket CLOSE Hook Exception ", ex);
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
          console.log("Socket CLOSE Hook Exception ", ex);
        }
      }
    }
  }

  // date: 2013-05-28; author: mccreavy
  function onError(e) {
    if ('ERROR' in this.hook) {
      for (var i = 0 ; i < this.hook['ERROR'].length ; i++) {
        try {
          this.hook['ERROR'][i](e);
        } catch (ex) {
          console.log("Socket ERROR Hook Exception ", ex);
        }
      }
    }
  }

  window.dirg.Socket = Socket;
})();