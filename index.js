// Create references for libraries
var express = require('express');
var http = require('http');
var firebase = require('firebase');
var dotenv = require('dotenv');
var mailgun = require('mailgun-js');

// Express server setup
var app = express();
var server = http.createServer(app);
dotenv.load();

// Authenticate with firebase
firebase.initializeApp({
  serviceAccount: "firebase-credentials-pm.json",
  databaseURL: "https://mutant-hours-pm.firebaseio.com"
});

var rootRef = firebase.database().ref();

// Authenticate with mailgun
var mailgunClient = mailgun({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN });


//Listen for new emails being added to firebase and send email thought mailgun
var emailsRef = rootRef.child('emails');
emailsRef.on('child_added', function(snapshot){
  var email = snapshot.val();
  var emailData = {
    from: '<postmaster@' + process.env.MAILGUN_DOMAIN + '>',
    to: email.emailAddress,
    subject: 'Thanks for signing up!',
    text: 'Welcome to Mutant Office Hours.'
  };
  mailgunClient.messages().send(emailData, function(error, body){
    console.log(body);
    if (error) {
      console.log(error);
    }
  });
});

server.listen(3030, function(){
  console.log('Listening on http://localhost:3030');
});
