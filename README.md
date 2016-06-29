# WSProxy

Extremely simple HTTP -> WS proxy

## Build

    npm install
    npm run build

## Run

    node wsproxy.js {httpport} {wsport}

## Use

Any content POSTed to http://host:httpport/appname will be sent to the WebSocket client connected to ws://{host}:{wsport}/{appname}

## Playground

[Send test messages via HTTP](sendtest.html)
[See messages in WebSocket client](wstest.html)
