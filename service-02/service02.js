var express = require("express");

var app = express();

var server = app.listen(8002, () => {
    console.log("Service 02 is running");
   });

   app.get("/", (req, res, next) => {
    res.writeHeader(200, { 'Content-Type': 'text/plain' })
    res.write("Hello from " + req.client.remoteAddress + " : " + req.client.remotePort +
    "\nto " + req.client.localAddress + " : " + req.client.localPort);
    res.end();
    });