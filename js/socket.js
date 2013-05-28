(function() {
  function Socket(p) {
    console.log("p ", p);
    var o = {
      'websocket': new WebSocket(p.url),
      'onOpen': onOpen,
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

  function onOpen(e) {
    console.log("onOpen: ", e);
    this.websocket.send(JSON.stringify({"type": "CONNECT"}));
  }

  function onClose(e) {
    console.log("onClose: ", e);
  }

  function onMessage(e) {
    console.log("onMessage: ", e);
    //this.websocket.send({'foo': 'bar'});
  }

  function onError(e) {
    console.log("onError: ", e);
  }

  window.dirg.Socket = Socket;
})();