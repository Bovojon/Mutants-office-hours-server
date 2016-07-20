var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

server.listen(3030, function(){
  console.log('Listening on http://localhost:3030');
});
