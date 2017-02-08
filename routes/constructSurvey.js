//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async = require('async');


///////////////////////////////
/// Connect to MongoDB host ///
///////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var db;

var MongoDBKey = require('./MongoDBKey');

MongoClient.connect(MongoDBKey.key, (err, database) => {
  if (err) return console.log(err)
  db = database
})

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
  MongoQuestions = shuffleListIDs(MongoQuestions);
  for(var i = 0; i < MongoQuestions.length; ++i)
  {
      page = {};
      page["name"] = "page" + i;
      page["questions"] = [MongoQuestions[i]["question"]];
      pages.push(page);
  }
  surveyJSON["pages"] = pages;
  surveyRender(surveyJSON);
};


var getQuestionsFromMongoDB = function(listIDs, surveyRender) {
  db.collection('questions').find({"_id": {$in: listIDs}}, {question:1, _id:0, "question.type":1, "question.choices":1, "question.name":1}).toArray(function(err, questions) {
    //console.log(questions);
    transformMongoDBQuestionIntoSurveyJSQuestion(listIDs, questions, surveyRender);
  });
};


////////////////////////////////////////////////////////////////////////////////
///  Convert the user favorite themes into a personnalized survey to render  ///
////////////////////////////////////////////////////////////////////////////////

var constructSurvey = function(userThemeSelection, totalNumberOfQuestions, surveyRender) {
    console.log(totalNumberOfQuestions);
    if(totalNumberOfQuestions == "1") {
      totalNumberOfQuestions = 2;
    }
    else if (totalNumberOfQuestions == "2") {
      totalNumberOfQuestions = 20;
    }
    else if (totalNumberOfQuestions == "3") {
      totalNumberOfQuestions = 30;
    }

    var iteratorTheme = Object.keys(userThemeSelection);

    var sumPreferences = 0;
    for(var i = 0; i < iteratorTheme.length; ++i) {
      var themeName = iteratorTheme[i];
      sumPreferences += parseInt(userThemeSelection[themeName]);
    }

    getQuestionIDsPerTheme = [];
    for(var i = 0; i < iteratorTheme.length; ++i) {
      var themeName = iteratorTheme[i];
      var themeNumberOfQuestions = parseInt(userThemeSelection[themeName]) * totalNumberOfQuestions / sumPreferences;
      console.log(themeName, themeNumberOfQuestions);
      getQuestionIDsPerTheme.push( GetQuestionIDsOfGivenTheme.bind(null, themeName, themeNumberOfQuestions) );
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
