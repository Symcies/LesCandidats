//////////////////////////////////
///  Import the server modules ///
//////////////////////////////////
var express     = require('express');
var app         = express();
var url         = require('url');
var bodyParser  = require('body-parser');
var server      = require('http').Server(app);
require("./database/mongo-pool.js").initPool();

//////////////////////////////////////
/// Import the JS backend modules ///
/////////////////////////////////////
var themes          = require('./data/themes');
var biographies     = require('./data/biographies');
var infoContent     = require('./data/infoContent');
var SurveyQuestions = require('./routes/construct_survey/main.js');
var SurveyResults   = require('./routes/compute_survey_results/main.js')


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


app.get('/', function(req, res) {
  res.render('main.ejs');
})

app.get('/main', function(req, res) {
  res.render('main.ejs');
})

app.get('/biographies', function (req, res) {
  res.render('bios.ejs', {biographies: biographies.listOfCandidates});
});

app.get('/analyse', function (req, res) {
  res.render('analyse.ejs');
});

app.get('/info', function(req, res) {
  res.render('info.ejs', {info: infoContent.info});
});

app.get('/team', function(req, res) {
  res.render('team.ejs');
})

app.get('/concept', function (req, res) {
  res.render('concept.ejs');
});

app.get('/sources', function (req, res) {
  res.render('sources.ejs');
});

app.get('/test', function (req, res) {
  res.render('test.ejs', {listOfThemes: themes.listOfThemes});
});

app.post('/questions', function(req, res) {
  var results = req.body;
  var totalNumberOfQuestions = results.length;
  delete results.length;
  var userThemeSelection = results;

  var renderSurvey = function(questions)
  {
    res.render('questions.ejs', {surveyJSON:questions, userPreferences:results});
  };

  SurveyQuestions.constructSurvey(userThemeSelection, totalNumberOfQuestions,  renderSurvey);
});


app.post('/answers', function(req, res) {
  var surveyData = req.body;
  var userPreferences = JSON.parse(surveyData.userPreferences);
  delete surveyData.userPreferences;

  var renderResults = function(results)
  {
    res.render('answers.ejs', {results:results, listOfCandidates: JSON.stringify(biographies.listOfCandidates)});
  }

  SurveyResults.computeResults(surveyData, userPreferences, renderResults);

});

app.get('*', function(req, res) {
  res.status(404);
  res.render('404.ejs', { url: req.url });
  return;
});
