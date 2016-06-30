"use strict";
var httpPort = parseInt(process.argv[2]);
var wsPort = parseInt(process.argv[3]);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: wsPort });
var apps = {};
wss.on('connection', function (ws) { return apps[ws.upgradeReq.url] = ws; });
var http = require('http');
var server = http.createServer();
server.on('clientError', function (err, socket) { return socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'); });
server.on('request', function (request, response) {
    var body = [];
    request
        .on('data', function (chunk) { return body.push(chunk); })
        .on('end', function () {
        var ws = apps[request.url];
        if (ws) {
            try {
                ws.send(Buffer.concat(body).toString());
            }
            catch (error) {
                console.log("Failed to send message to app \"" + request.url + "\". Try (re)starting WebSocket client.");
            }
        }
        else {
            console.log("App \"" + request.url + "\" does not exist yet. Try (re)starting WebSocket client.");
        }
    });
    response.end();
});
server.listen(httpPort);
