"use strict";

// token for sending mesages (is stored in the environment)
var MESSENGER_TOKEN = process.env.MESSENGER_TOKEN;


var express = require("express");
var router = express.Router ();
var bodyparser = require ('body-parser');

var bus = require ('./bus.js');

// functions for using the messenger messages
// var messenger = require ('./messenger.js');
var request = require ('request');

var trivia = require ('./trivia.js');

router.use (bodyparser.json ()); // read body for POST and PUT as JSON


// WEB Interface

// this is used for registering and verifying the facebook webhook
// https://developers.facebook.com/docs/messenger-platform/quickstart
router.get ('/messenger', function (req, res)
{
    console.log (req.query);
    // req.query['hub.mode'] - this has to be subscribe (facebook tutorial)
    // req.query['hub.challenge'] - this has to be sent back to facebook (facebook tutorial)
    // req.query['hub.verify_token'] - this is the value we wrote in token (facebook tutorial)
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'token')
    {
        res.send (req.query['hub.challenge']);
    }
    else
    {
        res.status(403).send (''); // send an error response to facebook
    }
});

// this is used for receiving messages from facebook
router.post ('/messenger', function (req, res)
{
    // get user id
    var id = getId(req.body);
    // get message text
    var message = getMessage(req.body);
    // console.log ('Message from '+id+' '+message);
    bus.emit ('message', 'facebook', id, message);
    res.send (''); // send an empty, so that the server knows we got the message 
});

bus.on ('send', function (type, id, message)
{
   if (type === 'facebook')
   {
       sendMessage (id, message);
   }
});

// Messenger interface

// token for sending mesages (is stored in the environment)
var MESSENGER_TOKEN = process.env.MESSENGER_TOKEN;

function sendMessage (id, message)
{
    request (
    {
      uri:'https://graph.facebook.com/v2.6/me/messages?access_token='+MESSENGER_TOKEN,
      method: 'POST',
      json:
      {
        recipient:
        {
        	id:id
        },
        message:{
        	text:message
        }
      }
    }, function (error, response, body)
    {
      console.log (body);
    });
}

function getId (data) 
{
    return data.entry[0].messaging[0].sender.id;
}

function getMessage (data)
{
    return data.entry[0].messaging[0].message.text;
}

// export the router
module.exports = router;