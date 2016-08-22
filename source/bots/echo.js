"use strict";

var bus = require("./../bus.js");

bus.on ('message', function (type, id, message)
{
    bus.emit ('send', type, id, message); 
});