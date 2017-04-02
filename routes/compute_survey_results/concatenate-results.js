////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async       = require('async');
var biographies = require('./../../data/biographies');
var themes      = require('./../../data/themes');



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
  var newResults = previousResults;

  /// Update the number of question answered
  newResults['NbOfQuestionsAnswered'] += 1;

  /// Update the top answered
  newResults['topAnswer'] += (0.1*queryResult['topAnswer'] + 0.9)*themeImportance;

  /// Update the grade of each party
  for(var key in queryResult['userAnswer']) {
    if(!queryResult['userAnswer'].hasOwnProperty(key)) continue;
    var convertX = 0.1 * (queryResult['userAnswer'][key]) + 0.9;
    newResults[key] += convertX*themeImportance;
  }
  return newResults;
};

////////////////////////////////////////////////////////////////////////////////
/// Compute the importance of the theme
////////////////////////////////////////////////////////////////////////////////

var computeThemeImportance = function(userPreference) {
  var DegreeOfImportance = 1.8;
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
