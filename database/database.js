"use strict";

var redis = require("redis");

var client = redis.createClient ();

client.on ('error', function (error)
{
    console.log ('Redis error '+error);
    // stop the process, it will be restarted
    process.exit (-1);
});

/* user is
    {
        name: ...,
        points: ...
    }
*/
function getUser (id, done)
{
    client.hgetall (id, function (error, result)
    {
        if (error) 
        {
            done (error);
        }
        else
        {
            done (null, result);
        }
    });
}

function setUser (id, user, done)
{
    client.hmset (id, user, function (error)
    {
        done (error); 
    });
}

function scorePoints (id, value, done)
{
    client.hset (id, 'points', value, function (error)
    {
       done (error); 
    });
}

module.exports.getUser = getUser;
module.exports.setUser = setUser;
module.exports.scorePoints = scorePoints;