"use strict";

var bus = require ('./../../bus.js');
var questions = require ('./jservice.js');

var USERS = {};

function getAnswerPrint (answer)
{
    var answer_lines = '';
    for (var i=0; i<answer.length; i++)
      {
          if (answer[i].match (/[a-z]/i))
          {
            answer_lines = answer_lines + '_ ';
          }
          else
          {
              answer_lines = answer_lines+answer[i]+' ';
          }
      }
      return answer_lines;
}

function getAnswerHint (answer)
{
    var answer_hint = '';
    var step = parseInt(answer.length/3);
    var letter = 0;
    for (var i=0; i<answer.length; i++)
      {
          if (answer[i].match (/[a-z]/i))
          {
            //   console.log (i+' '+letter+' '+step+' '+letter%step);
              if (letter%step !== 0)
              {
                answer_hint = answer_hint + '_ ';
              }
              else
              {
                  answer_hint = answer_hint+answer[i]+' ';
              }
              letter = letter + 1;
          }
          else
          {
              answer_hint = answer_hint+answer[i]+' ';
          }
      }
      return answer_hint;
}

bus.on ('message', function (type, id, message)
{
    var question;
    if (message === 'question')
    {
       questions.getRandomQuestion (function (error, data)
       {
          if (error)
          {
              bus.emit ('send', type, id, 'nothing now');
          }
          else
          {
              var question = JSON.parse (data)[0];
              USERS[id] = question;
            //   console.log (question);
              var answer = '';
              console.log (question.answer);
              
              bus.emit ('send', type, id, question.question+'\n'+getAnswerPrint(question.answer));
              console.log (answer);
          }
       });
    }
    else
    if (message === 'hint')
    {
        if (!USERS[id])
        {
            bus.emit ('send', type, id, 'Type question first');
        }
        else
        {
            question = USERS[id];
            bus.emit ('send', type, id, question.question+'\n'+getAnswerHint(question.answer));
        }
    }
    else
    if (message === 'i don\'t know')
    {
        if (!USERS[id])
        {
            bus.emit ('send', type, id, 'Type question first');
        }
        else
        {
            question = USERS[id];
            bus.emit ('send', type, id, question.question+'\n'+question.answer);
            USERS[id] = null;
        }
    }
    else
    if (USERS[id])
    {
       question = USERS[id];
       if (question.answer.toLowerCase () === message.toLowerCase())
       {
           bus.emit ('send', type, id, 'Corect!\n');
       }
       else
       {
           bus.emit ('send', type, id, 'Wrong!\n');
       }
    }
});
