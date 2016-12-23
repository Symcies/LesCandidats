// Theme preferece of the user
var userPreference = {};

// Colors of the themes
var colors = { '0': 'rgb(247, 220, 168)',
               '1': 'rgb(247, 205, 168)',
               '2': 'rgb(247, 190, 168)',
               '3': 'rgb(247, 175, 168)',
               '4': 'rgb(247, 160, 168)',
               '5': 'rgb(247, 145, 168)'
             };


// Initilize the preferences
( function() {
  var themes = document.getElementsByClassName('theme');
  for(var i = 0; i < themes.length; ++i) {
    themes[i].parentNode.style.backgroundColor = colors[0];
    userPreference[themes[i]] = 0;
  }
})();


( function() {
  var rightButtons = document.getElementsByClassName('buttonRight');
  var leftButtons = document.getElementsByClassName('buttonLeft');

  for(var i = 0; i < rightButtons.length; ++i) {
    // Change the color of the cloud and affect a new value when + is hit
    rightButtons[i].addEventListener('click', function(e) {
      var preferenceValue = parseInt(e.target.nextElementSibling.dataset.preference);
      if(preferenceValue != Object.keys(colors).length) {
        preferenceValue += 1;
        e.target.nextElementSibling.dataset.preference = preferenceValue;
        e.target.parentNode.style.backgroundColor = colors[preferenceValue];
      }
    });
    // Change the color of the cloud and affect a new value when - is hit
    leftButtons[i].addEventListener('click', function(e) {
      var preferenceValue = parseInt(e.target.nextElementSibling.nextElementSibling.dataset.preference);
      if(preferenceValue != 0) {
        preferenceValue -= 1;
        e.target.nextElementSibling.nextElementSibling.dataset.preference = preferenceValue;
        e.target.parentNode.style.backgroundColor = colors[preferenceValue];
      }
    });

  }
})();


///////////////////////////
/// Send data to server ///
///////////////////////////

(function() {
  document.getElementById('submission').addEventListener('click', function(e) {
    var url = 'http://localhost:8080/questions?';

    var themes = document.getElementsByClassName('cloudText');
    userData = {};
    for(var i = 0; i < themes.length; ++i) {
      var themeName = themes[i].innerText;
      var themeValue = themes[i].dataset.preference;
      userData[themeName] = themeValue;
      url += themeName + '=' + themeValue + '&';
    }

    location.href = url;
    /*
    userData = JSON.stringify(userData);
    $.ajax({
      type: "POST",
      url: '/questions',
      data: userData,
      success: function(html){
         $('body').html(html); // place the html wherever you like
      },
      error: function(err){ alert('error'); },
      contentType: "application/json"
    });
    */

  });
})();
