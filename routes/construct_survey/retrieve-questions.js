//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async     = require('async');
var MongoPool = require("./../../database/mongo-pool");


////////////////////////////////////////
/// MongoDB function to extract data ///
////////////////////////////////////////

var processQuestion = function(MongoQuestion) {

  var questions = MongoQuestion["questions"];
  for(var i = 0; i < questions.length; ++i) {
    var choices = questions[i]["choices"];
    for(var j = 0; j < choices.length; ++j) {
      delete questions[i]["choices"][j]["answers"];
    }
    questions[i]['renderAs'] = 'icheck';
  }

  return questions;

};



////////////////////////////////////////
/// MongoDB function to extract data ///
////////////////////////////////////////
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


var retrieveQuestions = function(listIDs, surveyRender) {
  MongoPool.getInstance(function (db){
    db.collection('questions').find({"_id": {$in: listIDs}}, {questions:1, theme:1, _id:0 }).toArray(function(err, questions) {

      if(err)  { callback(err, 0); }
      var surveyJSON = {};
      pages = [];
      OrderOfQuestions = Array.apply(null, {length: questions.length}).map(Number.call, Number)
      OrderOfQuestions = shuffleListIDs(OrderOfQuestions);
      for(var i = 0; i < OrderOfQuestions.length; ++i)
      {
        var questionNumber = OrderOfQuestions[i];
        var processedQuestion = processQuestion(questions[questionNumber]);
        page = {};
        page["title"] = questions[questionNumber]['theme'];
        page["name"] = "page" + i;
        page["questions"] = processedQuestion;
        pages.push(page);
      }
      surveyJSON["pages"] = pages;
      surveyRender(err, surveyJSON);


    });
  });
};

////////////////////////
/// Export functions ///
////////////////////////
module.exports.retrieveQuestions = retrieveQuestions;
