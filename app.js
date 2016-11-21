//////////////////////////////////
///  Import the server modules ///
//////////////////////////////////
var express = require('express');
var app = express();
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

/////////////////////////
/// Launch the server ///
/////////////////////////
server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('user-theme-preference', function (data) {

    var userQuestions = userPreference.userQuestions(data);
    // TODO : Send the questions to the user.
    console.log(1);
    app.post('/questions', function (req, res) {
      console.log(2);
      res.sendFile(__dirname + '/questions.html');
    });
  });
});
