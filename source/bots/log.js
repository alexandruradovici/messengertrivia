"use strict";

var bus = require("./../bus.js");

bus.on ('message', function (type, id, message)
{
   console.log (type+' message from '+id+'-> '+message);
});