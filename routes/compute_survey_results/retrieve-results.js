////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async       = require('async');
var biographies = require('./../../data/biographies');
var themes      = require('./../../data/themes');
var MongoPool   = require("./../../database/mongo-pool");

////////////////////////////////////////////////////////////////////////////////
/// Inspect and process the result of the database query
////////////////////////////////////////////////////////////////////////////////

var processQuery = function(questionChoices, questionAnswer) {
  var userAnswer = {};
  var topAnswer = 0;

  var N = questionChoices.length;
  for(var i = 0; i < N; ++i) {
    choice = questionChoices[i];
    Answers = choice['answers']
    if(choice["value"] == questionAnswer)
    {
      userAnswer = Answers;
    }

    for(party in Answers) {
      if(Answers.hasOwnProperty(party)) {
        topAnswer = Math.max(topAnswer, Answers[party]);
      }
    }
  }
  return [userAnswer, topAnswer];
}

////////////////////////////////////////////////////////////////////////////////
/// Query the database
////////////////////////////////////////////////////////////////////////////////

var getResultsOfGivenQuestion = function(questionText, questionAnswer, callback) {
  var Query = {
    "question.name": questionText,
  };
  var Projection = {
    "_id": 0,
    "theme": 1,
    "question.choices": 1,
  };
  MongoPool.getInstance(function (db){
    db.collection('questions').find(Query, Projection).toArray(function(err, queryResult) {

      Answers = processQuery(queryResult[0]['question']['choices'], questionAnswer);
      // TODO: NEED TO ADD THE TYPE
      console.log('I NEED TO ADD THE TYPE -> retrieve-results. l.53');
      results = {};
      results['userAnswer'] = Answers[0];
      results['theme'] = queryResult[0]['theme'];
      results['topAnswer'] = Answers[1];
      callback(err, results)
    });
  });
};


////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getResultsOfGivenQuestion: getResultsOfGivenQuestion,
};
