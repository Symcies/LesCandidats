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

      results = {};
      results['userAnswer'] = Answers[0];
      results['theme'] = queryResult[0]['theme'];
      results['topAnswer'] = Answers[1];
      callback(err, results)
    });
  });
};

////////////////////////////////////////////////////////////////////////////////
/// Update the user results based on the answers
////////////////////////////////////////////////////////////////////////////////

var initResultFormat = function(queryResult) {

  var resultFormatPerTheme = {};
  for(key in biographies.listOfCandidates) {
      if (!biographies.listOfCandidates.hasOwnProperty(key)) continue;
      resultFormatPerTheme[biographies.listOfCandidates[key]['shortName']] = 0;
  }
  resultFormatPerTheme['topAnswer'] = 0;
  resultFormatPerTheme['NbOfQuestionsAnswered'] = 0;

  var resultFormat = {};
  for(var i= 0; i < themes.listOfThemes.length; ++i) {

    var theme = themes.listOfThemes[i]['name'];
    resultFormat[theme] = JSON.parse(JSON.stringify(resultFormatPerTheme));
  }

  return resultFormat;
};

////////////////////////////////////////////////////////////////////////////////
/// Update the user results based on the answers
////////////////////////////////////////////////////////////////////////////////

var sumJSObjects = function(queryResult, resultsOfTheTheme, themeImportance) {

  var newResults = resultsOfTheTheme;

  /// Update the number of question answered
  newResults['NbOfQuestionsAnswered'] += 1;

  /// Update the top answered
  newResults['topAnswer'] += queryResult['topAnswer']*themeImportance;

  /// Update the grade of each party
  for(var key in queryResult['userAnswer']) {
    if(queryResult['userAnswer'].hasOwnProperty(key)) {
      newResults[key] = queryResult['userAnswer'][key]*themeImportance + resultsOfTheTheme[key];
    }
  }

  return newResults;

};


////////////////////////////////////////////////////////////////////////////////
/// Compute the importance of the theme
////////////////////////////////////////////////////////////////////////////////

var computeThemeImportance = function(userPreference) {
  var DegreeOfImportance = 1;
  return ((DegreeOfImportance - 1) * userPreference  + 20 - DegreeOfImportance)/19;
};


////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoDB host
////////////////////////////////////////////////////////////////////////////////

var computeResults = function(surveyResults, userPreferences, renderResults)
{
  getResultsPerQuestion = [];

  for(var key in surveyResults) {
    if(surveyResults.hasOwnProperty(key)){
      var questionAnswer = surveyResults[key];
      getResultsPerQuestion.push( getResultsOfGivenQuestion.bind(null, key, questionAnswer));
    }
  };

  async.parallel(
    getResultsPerQuestion,
    function(err, queryResults) {
      var resultsPerTheme = initResultFormat(queryResults);
      for(var i=0; i < queryResults.length; i++) {
        queryResult = queryResults[i];
        var theme = queryResult['theme'];

        var themeImportance = computeThemeImportance(userPreferences[theme])
        resultsPerTheme[theme]  = sumJSObjects(queryResult, resultsPerTheme[theme], themeImportance);
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
