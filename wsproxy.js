"use strict";
var httpport = parseInt(process.argv[2]);
var wsport = parseInt(process.argv[3]);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: wsport });
var apps = {};
wss.on('connection', function (ws) {
    var appname = ws.upgradeReq.url;
    apps[appname] = ws;
});
var http = require('http');
var server = http.createServer();
server.on('clientError', function (err, socket) { return socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'); });
server.on('request', function (request, response) {
    var body = [];
    request
        .on('data', function (chunk) { return body.push(chunk); })
        .on('end', function () {
        var ws = apps[request.url];
        if (ws)
            ws.send(Buffer.concat(body).toString());
        else
            console.log("App \"" + request.url + "\"\" does not exist");
    });
    response.end();
});
server.listen(httpport);
