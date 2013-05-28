
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
wss.on('connection', function(ws) {
    console.log("onConnection");
    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send("more\n");
    });
    console.log("Sending something");
    ws.send('something\r\n');
});
