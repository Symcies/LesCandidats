//////////////////////////////////
/// Different libraries loaded ///
//////////////////////////////////
var async     = require('async');
var MongoPool = require("./../../database/mongo-pool");


////////////////////////////////////////
/// MongoDB function to extract data ///
////////////////////////////////////////


var firstTypeQuestion = function(MongoQuestion) {

  return ;
};

var secondTypeQuestion = function(MongoQuestion) {
  return ;
};

var thirdTypeQuestion = function(MongoQuestion) {
  return ;
};



var processQuestion = function(MongoQuestion, questionType) {
  if(Type == 'FirstType') {
    return FirstTypeQuestion(MongoQuestion);
  }
  else if(Type == 'SecondType') {
    return SecondTypeQuestion(MongoQuestion);
  }
  else if(Type == 'ThirdType') {
    return ThirdTypeQuestion(MongoQuestion);
  }
  else
  {
    console.log('Problem with one of the question type: ', MongoQuestion);
  }
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
    db.collection('questions').find({"_id": {$in: listIDs}}, {question:1, _id:0, "question.type":1, "question.choices":1, "question.name":1}).toArray(function(err, questions) {

      var surveyJSON = {};
      surveyJSON["title"] = "Questions";
      pages = [];
      OrderOfQuestions = Array.apply(null, {length: questions.length}).map(Number.call, Number)
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


    });
  });
};

////////////////////////
/// Export functions ///
////////////////////////
module.exports.retrieveQuestions = retrieveQuestions;
