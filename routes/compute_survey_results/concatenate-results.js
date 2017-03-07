////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async       = require('async');
var biographies = require('./../../data/biographies');
var themes      = require('./../../data/themes');
var MongoPool   = require("./../../database/mongo-pool");


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

var sumJSObjects = function(queryResult, previousResults, themeImportance) {
  var Type = queryResult['Type'];

  if(Type == 'FirstType') {
    return firstTypedQuestion(queryResult, previousResults, themeImportance);
  }
  else if(Type == 'SecondType') {
    return secondTypedQuestion(queryResult, previousResults, themeImportance);
  }
  else if(Type == 'ThirdType') {
    return thirdTypedQuestion(queryResult, previousResults, themeImportance);
  }
  else
  {
    console.log('Problem with one of the question type: ', MongoQuestion);
  }


};

var firstTypeQuestion = function(queryResults, previousResults, themeImportance) {
    var newResults = resultsOfTheTheme;

    /// Update the number of question answered
    newResults['NbOfQuestionsAnswered'] += 1;

    /// Update the top answered
    newResults['topAnswer'] += queryResult['topAnswer']*themeImportance;

    /// Update the grade of each party
    for(var key in queryResult['userAnswer']) {
      if(!queryResult['userAnswer'].hasOwnProperty(key)) continue;

      newResults[key] = queryResult['userAnswer'][key]*themeImportance + resultsOfTheTheme[key];
    }

    return newResults;
};

var secondTypeQuestion = function(queryResults, previousResults, themeImportance) {
  return ;
};

var thirdTypeQuestion = function(queryResults, previousResults, themeImportance) {
  return ;
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

var concatenateResults = function(listOfResults, renderResults, userPreferences)
{
  var resultsPerTheme = initResultFormat(listOfResults);

  for(var i=0; i < listOfResults.length; i++) {
    queryResult = listOfResults[i];
    var theme = queryResult['theme'];
    var themeImportance = computeThemeImportance(userPreferences[theme])
    resultsPerTheme[theme]  = sumJSObjects(queryResult, resultsPerTheme[theme], themeImportance);
  }

  renderResults(resultsPerTheme);
};

////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  concatenateResults: concatenateResults,
};
