
////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async = require('async');
var config = require('./../config');


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
/// Update the user results based on the answers
////////////////////////////////////////////////////////////////////////////////

var initResultFormat = function(queryResult) {

  var resultFormatPerTheme = {};
  for(key in config.listOfParties) {
      if (!config.listOfParties.hasOwnProperty(key)) continue;
      resultFormatPerTheme[config.listOfParties[key]] = 0;
  }
  resultFormatPerTheme['topAnswer'] = 0;

  var resultFormat = {};
  for(key in config.listOfThemes) {
    if (!config.listOfThemes.hasOwnProperty(key)) continue;

    var theme = config.listOfThemes[key];
    resultFormat[theme] = JSON.parse(JSON.stringify(resultFormatPerTheme));
  }

  return resultFormat;
};

////////////////////////////////////////////////////////////////////////////////
/// Update the user results based on the answers
////////////////////////////////////////////////////////////////////////////////

var sumJSObjects = function(queryResult, resultsPerTheme) {

  var theme = queryResult['theme'];
  var gradesPerParties = queryResult['userAnswer'];
  var previousResults = resultsPerTheme[theme];
  var newResults = previousResults;

  newResults['topAnswer'] = previousResults['topAnswer'] + queryResult['topAnswer'];

  for(key in gradesPerParties) {
    if(!gradesPerParties.hasOwnProperty(key)) continue;


    grade = gradesPerParties[key];

    newResults[key] = previousResults[key] + gradesPerParties[key];

  }

  return newResults;
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
    function(err, queryResults) {
      var resultsPerTheme = initResultFormat(queryResults);

      for(var i=0; i < queryResults.length; i++) {
        queryResult = queryResults[i];
        var theme = queryResult['theme'];

        var tt  = sumJSObjects(queryResult, resultsPerTheme);
        
        resultsPerTheme[theme] = tt
        break;
      }
      renderResults(resultsPerTheme);
  });

};

////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  computeResults: computeResults,
};
