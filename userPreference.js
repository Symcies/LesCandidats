//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async = require('async');


///////////////////////////////
/// Connect to MongoDB host ///
///////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://publicuser:publicmdp@ds155747.mlab.com:55747/political-preference-questions', (err, database) => {
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

var transformMongoDBQuestionIntoSurveyJSQuestion = function(MongoQuestions, surveyRender)
{
  var surveyJSON = {};
  surveyJSON["title"] = "Questions";
  pages = [];
  for(var i = 0; i < MongoQuestions.length; ++i)
  {
      page = {};
      page["name"] = "page" + i;
      page["questions"] = [MongoQuestions[i]["question"]];
      //console.log("PAGE", page);
      pages.push(page);
  }
  surveyJSON["pages"] = pages;
  console.log(surveyJSON);
  surveyRender(surveyJSON);
};


var getQuestionsFromMongoDB = function(listIDs, surveyRender) {
/*
  var surveyJSON = { title: "Tell us, what technologies do you use?", pages: [
    { name:"page1", questions: [
      { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
      { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visible: false }
    ]},
        { name: "page2", questions: [
          { type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
          { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visible: false } ] },
        { name: "page3",questions: [
          { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
       ],
       triggers: [
        { type: "visible", operator: "equal", value: "Yes", name: "frameworkUsing", questions: ["framework"]},
        { type: "visible", operator: "equal", value: "Yes", name: "mvvmUsing", questions: ["mvvm"]}
     ]
  };
  */

  db.collection('questions').find({"_id": {$in: listIDs}}).toArray(function(err, questions) {

    //console.log("MONGO QUESTIONS", questions);
    transformMongoDBQuestionIntoSurveyJSQuestion(questions, surveyRender);
  });
};


////////////////////////////////////////////////////////////////////////////////
///  Convert the user favorite themes into a personnalized survey to render  ///
////////////////////////////////////////////////////////////////////////////////

var constructSurvey = function(userThemeSelection, totalNumberOfQuestions, surveyRender) {

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
      getQuestionIDsPerTheme.push( GetQuestionIDsOfGivenTheme.bind(null, themeName, themeNumberOfQuestions) );
    }

    async.parallel(getQuestionIDsPerTheme
    , function(err, results)
    {
        listIDs = [].concat.apply([], results);
        listIDs = shuffleListIDs(listIDs);
        getQuestionsFromMongoDB(listIDs, surveyRender);
    });
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports.constructSurvey = constructSurvey;
