"use strict";

var bus = require("./bus.js");
var cn = require('chuck-norris-api');

bus.on ('message', function (type, id, message)
{
    if (message==='chuck')
    {
        cn.getRandom().then(function (data) 
        {
            // console.log(data.value.joke);
            bus.emit ('send', type, id, data.value.joke); 
        });
    }
});