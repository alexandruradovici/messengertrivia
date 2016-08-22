"use strict";

var express = require ('express'); // load express
var server = express (); // create server
var morgan = require ('morgan');
// Load message processors
require ('./bots/log.js');
require ('./bots/chuck.js');
require ('./bots/echo.js');

server.use (morgan ('tiny')); // display request logs

// Load messengers

// facebook
var facebook = require("./messengers/facebook.js");
server.use (facebook);

server.listen (process.env.PORT, function (error)
{
    if (error)
    {
        console.log ('Error starting server '+error);
    }
    else
    {
        console.log ('Server started with port '+process.env.PORT);
    }
});