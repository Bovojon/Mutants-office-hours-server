// Create references for libraries
var express = require('express');
var http = require('http');
var firebase = require('firebase');

// Express server setup
var app = express();
var server = http.createServer(app);

// Authenticate with firebase
firebase.initializeApp({
  serviceAccount: "firebase-credentials-pm.json",
  databaseURL: "https://mutant-hours-pm.firebaseio.com"
});


server.listen(3030, function(){
  console.log('Listening on http://localhost:3030');
});
