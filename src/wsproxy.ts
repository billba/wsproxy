const httpPort = parseInt(process.argv[2]);
const wsPort = parseInt(process.argv[3]);

import WebSocket = require('ws');
const wss = new WebSocket.Server({ port: wsPort });

interface Apps {
    [appname: string]: WebSocket;
}

const apps:Apps = {};

wss.on('connection', ws => apps[ws.upgradeReq.url] = ws);

import http = require('http');
const server = http.createServer();

server.on('clientError', (err, socket) => socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'));

server.on('request', (request:http.IncomingMessage, response:http.ServerResponse) => {
    var body = [];
    request
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
        const ws = apps[request.url];
        if (ws) {
            try {
                ws.send(Buffer.concat(body).toString());
            } catch(error) {
                console.log(`Failed to send message to app "${request.url}". Try (re)starting WebSocket client.`);
            }
        } else {
            console.log(`App "${request.url}" does not exist yet. Try (re)starting WebSocket client.`);
        }
    });
    response.end();
});

server.listen(httpPort);
