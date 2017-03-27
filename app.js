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
var compare         = require('./data/compare');
var addiSources     = require('./data/sources');
var glossary        = require('./data/glossary');
var biographies     = require('./data/biographies');
var infoContent     = require('./data/infoContent');
var SurveyQuestions = require('./routes/construct_survey/main.js');
var SurveyResults   = require('./routes/compute_survey_results/main.js')
var themeSecurity   = require('./security/input-themes.js');
var answersSecurity = require('./security/input-answers.js');


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

app.get('/glossary', function (req, res) {
  res.render('glossary.ejs', {listOfWords: glossary.listOfWords});
});

app.get('/sources', function (req, res) {
  res.render('sources.ejs', {listOfCandidates:biographies.listOfCandidates, candidateOrder:biographies.alphabeticalOrder, addiSources:addiSources.sources});
});

app.get('/test', function (req, res) {
  res.render('test.ejs', {listOfThemes: themes.listOfThemes});
});

app.get('/compare', function (req, res) {
  res.render('compare.ejs', {comparison: compare.comparison, listOfCandidates: JSON.stringify(biographies.listOfCandidates)});
});

app.post('/questions', function(req, res) {
  /// Check the security
  //console.log('should be true', themeSecurity.checkUserThemes(req.body));
  if(!themeSecurity.checkUserThemes(req.body)) res.render('hack.ejs');

  /// Process the data
  var results = req.body;
  var totalNumberOfQuestions = results.length;
  delete results.length;
  var userThemeSelection = results;

  var renderSurvey = function(err, questions)
  {

    if(err) { res.render('hack.ejs'); }

    res.render('questions.ejs', {surveyJSON:questions, userPreferences:results});
  };

  SurveyQuestions.constructSurvey(userThemeSelection, totalNumberOfQuestions,  renderSurvey);
});




app.post('/answers', function(req, res) {

  /// Check the security
  //console.log('should be true', answersSecurity.checkUserAnswers(req.body));
  if(!answersSecurity.checkUserAnswers(req.body)) res.render('hack.ejs');

  /// Preprocess the data
  var surveyData = req.body;
  var userPreferences = JSON.parse(surveyData.userPreferences);
  delete surveyData.userPreferences;

  /// Render the results
  var renderResults = function(err, results)
  {
    //console.log(err);
    //if(err) { res.render('hack.ejs'); }
    res.render('answers.ejs', {results:err, listOfCandidates: JSON.stringify(biographies.listOfCandidates)});
  }

  SurveyResults.computeResults(surveyData, userPreferences, renderResults);

});

var examples = {
   "Travail" : {
     "JLM": 5,
     "FF": 7,
     "topAnswer": 7,
     "NbOfQuestionsAnswered": 2,
   },
   "Société": {
     "BH": 19,
     "NA": 2,
     "JLM": 8,
     "EM": 4,
     "MLP": 7,
     "topAnswer": 19,
     "NbOfQuestionsAnswered": 9
   },
   "Santé": {
   },
   "Sécurité": {
     "EM": 7,
     "topAnswer":7,
     "NbOfQuestionsAnswered": 3
   },
   "Environnement": {
     "NDA": 8,
     "BH": 5,
     "JL": 3,
     "topAnswer": 8,
     "NbOfQuestionsAnswered": 2,
   },
   "Culture": {
     "JC": 3,
     "PP": 4,
     "FA": 3,
     "topAnswer": 4,
     "NbOfQuestionsAnswered": 3
   }
};


app.get('/answers_test', function(req, res) {
  res.render('answers.ejs', {results:examples, listOfCandidates: JSON.stringify(biographies.listOfCandidates)});
});

app.get('*', function(req, res) {
  res.status(404);
  res.render('404.ejs', { url: req.url });
  return;
});
