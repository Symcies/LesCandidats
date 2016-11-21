
///////////////////////////////
/// Connect to MongoDB host ///
///////////////////////////////
var MongoClient = require('mongodb').MongoClient;
//MongoClient.connect('mongodb://publicuser:publicmdp@ds155747.mlab.com:55747/political-preference-questions'), (err, database) => {

//});


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

var getListIDs = function(questionsPerTheme) {
  return [0, 1, 2, 3, 4, 5, 6, 9, 38];
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
  return listIDs;
};


//////////////////////////////////////
/// Convert the user preference into  ///
/////////////////////////////////////
var userQuestions = function(userData) {
  // Get the number of questions per theme w.r.t the user preference
  var questionsPerTheme = ConvertToQuestionsPerTheme(userData);

  // From a number of questions/theme to a list of ID/theme
  var listIDs = getListIDs(questionsPerTheme);

  // Get a shuffled list of IDs
  listIDs = shuffleListIDs(listIDs);

  // Get the questions and return them to the front
  return getQuestionsFromMongoDB(listIDs);
};


////////////////////////
/// Export functions ///
////////////////////////
module.exports = {
  userQuestions: userQuestions,
};
