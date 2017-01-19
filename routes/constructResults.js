////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async = require('async');


////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoDB host
////////////////////////////////////////////////////////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var db;
var MongoDBKey = require('./MongoDBKey');

MongoClient.connect(MongoDBKey.key, (err, database) => {
  if (err) return console.log(err)
  db = database
})

////////////
// TODO : The previous MongoClient has to be used only once, between this file and userPreference.js
////////////


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

  db.collection('questions').find(Query, Projection).toArray(function(err, queryResult) {

    Answers = processQuery(queryResult[0]['question']['choices'], questionAnswer);

    results = {};
    results['userAnswer'] = Answers[0];
    results['theme'] = queryResult[0]['theme'];
    results['topAnswer'] = Answers[1];
    callback(err, results)
  });

};

////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoDB host
////////////////////////////////////////////////////////////////////////////////

var sumJSObjects = function(finalObject, result) {
  for(key in result) {
    if(!finalObject[key]) {
      finalObject[key] = result[key];
    } else {
      finalObject[key] += result[key];
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoDB host
////////////////////////////////////////////////////////////////////////////////

var computeResults = function(surveyResults, renderResults)
{
  var iteratorResults = Object.keys(surveyResults);
  getResultsPerQuestion = [];
  for(var i = 0; i < iteratorResults.length; ++i) {
    var questionText = iteratorResults[i];
    var questionAnswer = surveyResults[questionText];
    getResultsPerQuestion.push( getResultsOfGivenQuestion.bind(null, questionText, questionAnswer));
  };

  async.parallel(
    getResultsPerQuestion,
    function(err, results) {
      var finalSum = {};
      var topAnswersSum = 0;

      for(var i=0; i < results.length; i++) {
        result = results[i];
        topAnswersSum += result['topAnswer'];
        sumJSObjects(finalSum, result['userAnswer']);
      }
      renderResults(finalSum);
  });

};

////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  computeResults: computeResults,
};
