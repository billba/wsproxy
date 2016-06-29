# WSProxy

WebSocket is a great way for a server app to push a stream of messages to a client app. But what if your server app can't (easily) use WebSockets? That's the situation we were in today. So I wrote this simple proxy that allows a server app to POST messages via HTTP (which is usually pretty easy) and have them delivered to a WebSocket client like magic! 

Supports multiple server apps running against the same proxy - just give each its own unique app name. 

## Run

Clone this repo and then:

    npm install

Now decide on (different) port numbers for theHTTPhttp and WS services. They will be the same for all apps sharing this proxy. If you're running more than one server app, each must have its own unique app name.

Then (from the repo folder) run: 

    node wsproxy.js {httpport} {wsport}

Connect your WS client to **ws://{host}:{wsport}/{appname}**.

Any content POSTed to **http://{host}:{httpport}/{appname}** will be sent to said client.

## Playground

Two (very) simple web pages are provided to:

* [Post test messages](sendtest.html) to the proxy via HTTP, and
* [Create a WebSocket client](wstest.html) to see the posted messages

Pro tips:

1. The port numbers you enter in these web pages need to match those you gave on the command line to wsproxy.js
2. You can create multiple instances of the WebSocket client page, one for each app name

## Build

This project uses TypeScript, so you'll have to install it if you don't already have it: 

    npm install typescript

Then build away: 

    npm run build

