var selectIDs = require('./select-ids.js');

//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async     = require('async');

var constructSurvey = function(userPreferences, totalNumberOfQuestions, surveyRender) {
    if      (totalNumberOfQuestions == "1") { totalNumberOfQuestions = 15; }
    else if (totalNumberOfQuestions == "2") { totalNumberOfQuestions = 20; }
    else if (totalNumberOfQuestions == "3") { totalNumberOfQuestions = 25; }

    var sumPreferences = 0;
    for(var key in userPreferences) {
      if(userPreferences.hasOwnProperty(key)) {
        sumPreferences += parseInt(userPreferences[key]);
      }
    }

    numberOfQuestionsPerTheme = {};

    for(var key in userPreferences) {
      if(userPreferences.hasOwnProperty(key))
      {
        var themeNumberOfQuestions = parseInt(userPreferences[key]) * totalNumberOfQuestions / sumPreferences;
        themeNumberOfQuestions = Math.round(themeNumberOfQuestions);
        if(themeNumberOfQuestions < 1) { themeNumberOfQuestions = 1}

        numberOfQuestionsPerTheme[key] = themeNumberOfQuestions;
      }
    }

    selectIDs.selectIDs(numberOfQuestionsPerTheme, surveyRender, totalNumberOfQuestions);
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports.constructSurvey = constructSurvey;
