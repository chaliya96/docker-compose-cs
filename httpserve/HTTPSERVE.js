const express = require("express");
let fs = require("fs")

const app = express();

app.listen(3001, () => {
    console.log("Server running on port 3001");
   });

app.get("/", function(req, res) {
    fs.readFile('/logs/file.log', function (err, data) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(data)
        res.end()
      });
});