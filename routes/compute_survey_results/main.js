////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async       = require('async');
var concatenateResults  = require("./concatenate-results");
var retrieveResults     = require("./retrieve-results");


////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoDB host
////////////////////////////////////////////////////////////////////////////////

var computeResults = function(surveyResults, userPreferences, renderResults)
{
  getResultsPerQuestion = [];

  for(var key in surveyResults) {
    if(surveyResults.hasOwnProperty(key)){
      var questionAnswer = surveyResults[key];
      getResultsPerQuestion.push( retrieveResults.getResultsOfGivenQuestion.bind(null, key, questionAnswer));
    }
  };

  async.parallel(
    getResultsPerQuestion,
    function(err, queryResults) {
      concatenateResults(queryResults, renderResults, userPreferences);
    });

};

////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  computeResults: computeResults,
};
