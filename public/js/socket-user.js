var socket = io.connect('http://localhost:8080');

document.getElementById('submit-button').addEventListener('click', function(e) {
  var userPreference = {};
  var themes = document.getElementsByClassName('cloudText');

  for(var i = 0; i < themes.length; ++i) {
    var themeName = themes[i].innerText;
    var themeValue = themes[i].dataset.preference;
    userPreference[themeName] = themeValue;
  }
  socket.emit('user-theme-preference', userPreference);
});



//////////////////////////////////////////////////////////////
// TODO : Hear when the server has send some dataset
// TODO : Once got, change the page, and let the user answer
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// TODO : addEventListener when the user submit his answers
// TODO : socket emit the user answers
// TODO : socket.emit('user-answer', userAnswer);
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// TODO : Hear when the server has send the final data to display to the user
//////////////////////////////////////////////////////////////
