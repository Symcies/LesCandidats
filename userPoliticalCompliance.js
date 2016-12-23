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



////////////
// TODO : The previous MongoClient has to be used only once, between this file and userPreference.js
////////////


var getResultsOfGivenQuestion = function(questionText, questionAnswer, callback) {
  db.collection('questions').find({"question.name":questionText}, {"reponses":1, "_id":0}).toArray(function(err, politicalPreference) {
    callback(err, politicalPreference[0].reponses[questionAnswer])
  });

};

var sumJSObjects = function(finalObject, result) {
  for(key in result) {
    if(!finalObject[key]) {
      finalObject[key] = result[key];
    } else {
      finalObject[key] += result[key];
    }
  };
};



var computeResults = function(userSurveyResults, renderResults)
{
  var iteratorResults = Object.keys(userSurveyResults);

  getResultsPerQuestion = [];
  for(var i = 0; i < iteratorResults.length; ++i) {
    var questionText = iteratorResults[i];
    var questionAnswer = userSurveyResults[questionText];
    getResultsPerQuestion.push( getResultsOfGivenQuestion.bind(null, questionText, questionAnswer));
  };



  async.parallel( getResultsPerQuestion
  , function(err, results) {
    var finalSum = {};
    var obj = null;
    for(var i=0; i < results.length; i++) {
      obj=results[i];
      sumJSObjects(finalSum, obj);
    }
    renderResults(finalSum);
  });


};




////////////////////////
/// Export functions ///
////////////////////////
module.exports = {
  computeResults: computeResults,
};
