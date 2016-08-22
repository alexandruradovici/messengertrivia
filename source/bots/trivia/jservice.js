"use strict";

var request = require ('request');

function getRandomQuestion (done)
{
    request ('http://jservice.io/api/random', function (error, response, body)
    {
      done (error, body);  
    });
}

module.exports.getRandomQuestion = getRandomQuestion;