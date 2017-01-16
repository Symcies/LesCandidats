
//////////////////////////////////
///  Import the server modules ///
//////////////////////////////////
var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var querystring = require('querystring');


//////////////////////////////////////
/// Import the JS backend modules ///
/////////////////////////////////////

var constructSurvey = require('./routes/constructSurvey');
var userPoliticalCompliance = require('./routes/userPoliticalCompliance')

/////////////////////////////////////////
/// Public files : CSS and Javascript ///
/////////////////////////////////////////
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

/////////////////////////////////////////
/// Package used
/////////////////////////////////////////
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

/////////////////////////////////////////
/// Global variables
/////////////////////////////////////////
var themes;

/////////////////////////
/// Launch the server ///
/////////////////////////
server.listen(8080);

app.get('/', function (req, res) {
  res.render('main.ejs');
});

app.get('/biographies', function (req, res) {
  res.render('bio.ejs');
});

app.get('/analyse', function (req, res) {
  res.render('analyse.ejs');
});

app.get('/concept', function (req, res) {
  res.render('concept.ejs');
});

app.get('/sources', function (req, res) {
  res.render('sources.ejs');
});

app.get('/test', function (req, res) {
  res.render('test.ejs');
});

app.post('/questions', function(req, res) {
  var userThemeSelection = req.body;
  var renderSurvey = function(questions)
  {
    res.render('questions.ejs', {surveyJSON:questions});
  };
  // TODO : The user should select the number of question

  var totalNumberOfQuestions = 20;
  constructSurvey.constructSurvey(userThemeSelection, totalNumberOfQuestions,  renderSurvey);
});


app.post('/answers', function(req, res) {
  var renderResults = function(results)
  {
    res.render('answers.ejs', {results:results});
  }
  userPoliticalCompliance.computeResults(req.body, renderResults);

});
