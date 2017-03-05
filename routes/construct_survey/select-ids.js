//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async             = require('async');
var MongoPool         = require("./../../database/mongo-pool");
var retrieveQuestions = require("./retrieve-questions.js")

////////////////////////////////////////////////////////////////////////////////
///  Select the IDS of the questions out of the mongo database
////////////////////////////////////////////////////////////////////////////////

var getRandomSubarray = function(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

var GetQuestionIDsOfGivenTheme = function(themeName, themeNumberOfQuestions, callback) {
  MongoPool.getInstance(function(db) {
    db.collection('questions').find({"theme":themeName}, {"_id":1}).toArray(function(err, questionIDs) {
      listQuestionIDs = [];
      for(var i = 0; i < questionIDs.length; ++i)
      {
        listQuestionIDs.push(questionIDs[i]["_id"]);
      }
      if(questionIDs.length > themeNumberOfQuestions)
      {
        questionIDs = getRandomSubarray(questionIDs, themeNumberOfQuestions);
      }
      callback(err, listQuestionIDs);
    });
  });
};





////////////////////////////////////////////////////////////////////////////////
///  Convert the user favorite themes into a personnalized survey to render  ///
////////////////////////////////////////////////////////////////////////////////

var selectIDs = function(numberOfQuestionsPerTheme, surveyRender) {

    IDsPerTheme = [];
    for(var key in numberOfQuestionsPerTheme) {
      if(numberOfQuestionsPerTheme.hasOwnProperty(key))
      {
        var NbOfQuestions = numberOfQuestionsPerTheme[key];
        IDsPerTheme.push( GetQuestionIDsOfGivenTheme.bind(null, key, NbOfQuestions) );
      }
    }

    async.parallel(IDsPerTheme
    , function(err, results)
    {
        listIDs = [].concat.apply([], results);
        retrieveQuestions.retrieveQuestions(listIDs, surveyRender);
    });
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports.selectIDs = selectIDs;
