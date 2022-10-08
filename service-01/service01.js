var express = require("express");
const axios = require('axios');

var app = express();

app.listen(8001, () => {
    console.log("Service 01 is running");
   });


const request_02 =  () => {
    return new Promise(function(resolve, reject){
        axios.get('http://service02:8002')
        .then(res => {
          console.log(res.data);
          resolve(res.data)
      
        })

    })
}


app.get("/", async (req, res) => {
    let s2_response = await request_02();
    res.writeHeader(200, { 'Content-Type': 'text/plain' })
    res.write("Hello from " + req.client.remoteAddress + " : " + req.client.remotePort +
    "\nto " + req.client.localAddress + " : " + req.client.localPort + "\n");
    res.write(s2_response);
    res.end();
});