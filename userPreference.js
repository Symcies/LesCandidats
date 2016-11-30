
///////////////////////////////
/// Connect to MongoDB host ///
///////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://publicuser:publicmdp@ds155747.mlab.com:55747/political-preference-questions', (err, database) => {
  if (err) return console.log(err)
  db = database
})

////////////////////////////////////////
/// MongoDB function to extract data ///
////////////////////////////////////////
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


var GetIdsWithCorrespondingTheme = function(theme, database, callback) {
  var listIDS = [];
  console.log(theme);
  database.collection('questions').find({"theme":theme}, {"_id":1}).toArray(function(err, results) {
  });
  return [];
};




var getListIDs = function(questionsPerTheme) {
  var finalIDs = [];

  var questionsPerThemeIterator = Object.keys(questionsPerTheme);
  for(var i = 0; i < questionsPerThemeIterator.length; ++i) {
    var name = questionsPerThemeIterator[i];
    var numberOfQuestions = questionsPerTheme[name];
    var listIDs = GetIdsWithCorrespondingTheme(name, db);
    console.log(listIDs);
    if(listIDs.length > numberOfQuestions) {
      var listIDs = getRandomSubarray(listIDs, numberOfQuestions);
    }
    finalIDs.concat(listIDs);
  }

  //console.log(finalIDs);
  return finalIDs;
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

var getQuestionsFromMongoDB = function(listIDs) {
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
  return surveyJSON;
};



/////////////////////////////////////////////////////
/// Select the questions based on user preference ///
/////////////////////////////////////////////////////
var ConvertToQuestionsPerTheme = function(userData) {

  /////////////////////////
  // NUMBER OF QUESTIONS //
  var numberOfQuestions = 20;
  //   TODO : MOVE IT    //
  /////////////////////////

  var userDataIterator = Object.keys(userData);

  var sumPreferences = 0;
  for(var i = 0; i < userDataIterator.length; ++i) {
    var name = userDataIterator[i];
    sumPreferences += parseInt(userData[name]);
  }

  var questionsPerTheme = {};
  for(var i = 0; i < userDataIterator.length; ++i) {
    var name = userDataIterator[i];
    var questions = userData[name] * numberOfQuestions / sumPreferences;
    questionsPerTheme[name] = questions;
  }

  // TODO : Rounding the number of questions
  // TODO : Return the question if the sum is null!

  return questionsPerTheme;

};




////////////////////////////////////////////////////////////////////////////////
///  Convert the user favorite themes into a personnalized survey to render  ///
////////////////////////////////////////////////////////////////////////////////

var constructSurvey = function(userFavoriteTheme, callbackFunction) {

    /// Get the number of question per theme
    
    /////////////////////////
    // NUMBER OF QUESTIONS //
    var numberOfQuestions = 20;
    //   TODO : MOVE IT    //
    /////////////////////////

    var userDataIterator = Object.keys(userData);

    var sumPreferences = 0;
    for(var i = 0; i < userDataIterator.length; ++i) {
      var name = userDataIterator[i];
      sumPreferences += parseInt(userData[name]);
    }

    var questionsPerTheme = {};
    for(var i = 0; i < userDataIterator.length; ++i) {
      var name = userDataIterator[i];
      var questions = userData[name] * numberOfQuestions / sumPreferences;
      questionsPerTheme[name] = questions;
    }

    // TODO : Rounding the number of questions
    // TODO : Return the question if the sum is null!



    // TO USE IN THIS ORDER

    // Get the number of questions per theme w.r.t the user preference
    //ConvertToQuestionsPerTheme(userFavoriteTheme);

    // From a number of questions/theme to a list of ID/theme
    //var listIDs = getListIDs(questionsPerTheme);

    // Get a shuffled list of IDs
    //listIDs = shuffleListIDs(listIDs);

    // Get the questions and return them to the front
    //var questions = getQuestionsFromMongoDB(listIDs);


    /// Render the view with the personalized questions
    //callbackFunction(questions);
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports.constructSurvey = constructSurvey;
