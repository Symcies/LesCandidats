////////////////////////////////////////////////////////////////////////////////
/// Different libraries loaded
////////////////////////////////////////////////////////////////////////////////
var async       = require('async');
var biographies = require('./../../data/biographies');
var themes      = require('./../../data/themes');
var MongoPool   = require("./../../database/mongo-pool");

////////////////////////////////////////////////////////////////////////////////
/// Inspect and process the result of the database query
////////////////////////////////////////////////////////////////////////////////
var selectMaxValueRadiogroup = function(previousMax, answers) {
  var NewMax = previousMax;
  for(var key in answers) {
    NewMax = Math.max(NewMax, answers[key]);
  }
  return NewMax;
}

var accumulateTopAnswers = function(topAnswers, answers) {
  for(var key in answers) {
    topAnswers.push(answers[key]);
  }
  return topAnswers;
}

var getSumTopAnswers = function(topAnswers, sumNumber) {
  topAnswers = topAnswers.sort().reverse();
  topAnswer = 0;
  for(var i = 0; i < sumNumber; ++i) {
    topAnswer += topAnswers[i];
  }

  return topAnswer;
}

var addDictValues = function(container, dictToBeAdded) {
  var temp = container;

  for(var key in dictToBeAdded) {
    if(!dictToBeAdded.hasOwnProperty(key)) continue;

    if(!temp.hasOwnProperty(key)) {
      temp[key] = dictToBeAdded[key];
    }
    else {
      temp[key] = temp[key] + dictToBeAdded[key];
    }
  }

  return temp;
}

var processCheckboxType = function(choices, userAnswer) {
  /// Corresponds to multiple answers
  /// Must return [TopAnswer, userAnswer]
  var userPoints = {};
  var topAnswers = [];
  //console.log('checkbox', user)
  var userAnswers = userAnswer.split(',');

  for(var i = 0; i < choices.length; ++i) {
    if(userAnswers.includes(choices[i]["value"])) {
      userPoints = addDictValues(userPoints, choices[i]["answers"]);
    }
    topAnswers = accumulateTopAnswers(topAnswers, choices[i]["answers"])
  }
  topAnswer = getSumTopAnswers (topAnswers, userAnswers.length);
  return [topAnswer, userPoints];
}

var processRadiogroupType = function(choices, userAnswer) {
  /// Corresponds to one answer
  /// Must return [TopAnswer, userAnswer]

  var userPoints = {};
  var topAnswer = 0;

  for(var i = 0; i < choices.length; ++i) {
    if(choices[i]["value"] == userAnswer) {
      userPoints = addDictValues(userPoints, choices[i]["answers"]);
    }
    topAnswer = selectMaxValueRadiogroup(topAnswer, choices[i]["answers"])
  }

  return [topAnswer, userPoints];
}


var processQuery = function(queryResult, userAnswer) {
  var questionType = queryResult["type"];


  if(questionType == 'checkbox') {
    return processCheckboxType(queryResult["choices"], userAnswer)
  }
  else if(questionType == 'radiogroup') {
    return processRadiogroupType(queryResult["choices"], userAnswer)
  }
  else {
    console.log("There is a real problem with this question: ", queryResult);
  }

}



////////////////////////////////////////////////////////////////////////////////
/// Query the database
////////////////////////////////////////////////////////////////////////////////

var getResultsOfGivenQuestion = function(questionKey, userAnswer, callback) {

  var Query = {
    "questions": { "$elemMatch": {"name":  questionKey  }}
  };

  var Projection = {
    "_id": 0,
    "theme": 1,
    "questions.choices": 1,
    "questions.type": 1,
    "questions.name": 1,
  };
  MongoPool.getInstance(function (db){
    db.collection('questions').find(Query, Projection).toArray(function(err, queryResult) {

      var goodQuestion;
      for(var i = 0; i < queryResult[0]['questions'].length; ++i) {
        if(queryResult[0]['questions'][i]['name'] == questionKey) {
          goodQuestion = queryResult[0]['questions'][i];
          break;
        }
      }

      processedQuery = processQuery(goodQuestion, userAnswer);

      results = {};
      results['theme']      = queryResult[0]['theme'];
      results['topAnswer']  = processedQuery[0];
      results['userAnswer'] = processedQuery[1];

      callback(err, results)
    });
  });
};


////////////////////////////////////////////////////////////////////////////////
/// Exports function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getResultsOfGivenQuestion: getResultsOfGivenQuestion,
};
