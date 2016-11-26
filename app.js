//////////////////////////////////
///  Import the server modules ///
//////////////////////////////////
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);


//////////////////////////////////////
/// Import the JS backend modules ///
/////////////////////////////////////

var userPreference = require('./userPreference');
var userPoliticalCompliance = require('./userPoliticalCompliance')

/////////////////////////////////////////
/// Public files : CSS and Javascript ///
/////////////////////////////////////////
app.use(express.static(__dirname + '/public'));


/////////////////////////////////////////
//LOL
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

/////////////////////////
/// Launch the server ///
/////////////////////////
server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/questions', function(req, res) {
  console.log(req.body);
  //console.log(res.json(req.body));
  res.sendFile(__dirname + '/questions.html');
});
