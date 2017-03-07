//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async     = require('async');
var app       = require('./../../app.js');
var MongoPool = require("./../../database/mongo-pool");

MongoPool.getInstance(function (db){
    // Query your MongoDB database.
});


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


var shuffleListIDs = function(listIDs) {
  var currentIndex = listIDs.length, temporaryValue, randomIndex;

  while(0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = listIDs[currentIndex];
    listIDs[currentIndex] = listIDs[randomIndex];
    listIDs[randomIndex] = temporaryValue;
  }

  return listIDs;
};




////////////////////////////////////////
/// MongoDB function to extract data ///
////////////////////////////////////////

var transformMongoDBQuestionIntoSurveyJSQuestion = function(listIDs, MongoQuestions, surveyRender)
{
  var surveyJSON = {};
  surveyJSON["title"] = "Questions";
  pages = [];
  OrderOfQuestions = Array.apply(null, {length: MongoQuestions.length}).map(Number.call, Number)
  OrderOfQuestions = shuffleListIDs(OrderOfQuestions);
  for(var i = 0; i < OrderOfQuestions.length; ++i)
  {
    var questionNumber = OrderOfQuestions[i]
    var questionType = MongoQuestions[questionNumber]["type"];
    var questions = processQuestion(MongoQuestions[questionNumber], questionType);

    page = {};
    page["name"] = "page" + i;
    page["questions"] = questions;
    pages.push(page);
  }
  surveyJSON["pages"] = pages;
  surveyRender(surveyJSON);
};


var getQuestionsFromMongoDB = function(listIDs, surveyRender) {
  MongoPool.getInstance(function (db){
    db.collection('questions').find({"_id": {$in: listIDs}}, {question:1, _id:0, "question.type":1, "question.choices":1, "question.name":1}).toArray(function(err, questions) {
      transformMongoDBQuestionIntoSurveyJSQuestion(listIDs, questions, surveyRender);
    });
  });
};


////////////////////////////////////////////////////////////////////////////////
///  Convert the user favorite themes into a personnalized survey to render  ///
////////////////////////////////////////////////////////////////////////////////

var constructSurvey = function(userThemeSelection, totalNumberOfQuestions, surveyRender) {
    if      (totalNumberOfQuestions == "1") { totalNumberOfQuestions = 1; }
    else if (totalNumberOfQuestions == "2") { totalNumberOfQuestions = 20; }
    else if (totalNumberOfQuestions == "3") { totalNumberOfQuestions = 25; }

    var sumPreferences = 0;
    for(var key in userThemeSelection) {
      if(userThemeSelection.hasOwnProperty(key)) {
        sumPreferences += parseInt(userThemeSelection[key]);
      }
    }

    getQuestionIDsPerTheme = [];
    for(var key in userThemeSelection) {
      if(userThemeSelection.hasOwnProperty(key))
      {
        var themeNumberOfQuestions = parseInt(userThemeSelection[key]) * totalNumberOfQuestions / sumPreferences;
        themeNumberOfQuestions = Math.round(themeNumberOfQuestions);
        if(themeNumberOfQuestions < 1) { themeNumberOfQuestions = 1}
        getQuestionIDsPerTheme.push( GetQuestionIDsOfGivenTheme.bind(null, key, themeNumberOfQuestions) );
      }
    }

    async.parallel(getQuestionIDsPerTheme
    , function(err, results)
    {
        listIDs = [].concat.apply([], results);
        getQuestionsFromMongoDB(listIDs, surveyRender);
    });
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports.constructSurvey = constructSurvey;
