/// Global variables
var InitialSliderWidth = document.getElementById(listOfThemes[0]).nextElementSibling;
InitialSliderWidth = parseInt(getComputedStyle(InitialSliderWidth).width);
var WidthIncrement = 60;


/// Functions

function visualChangesOnButtonClick(themeName, preferenceValue) {
  var themeDiv = document.getElementById(themeName);
  var slider = themeDiv.nextElementSibling;

  var newWidth = InitialSliderWidth + (preferenceValue - firstPreferenceValue) * WidthIncrement;

  themeDiv.nextElementSibling.style.width = newWidth +"px";

};


function clickAddButton(e) {
  var textNode = e.target.previousElementSibling;
  var themeName = textNode.innerText;
  var CurrentPreference = parseInt(textNode.dataset.preference);
  if(CurrentPreference != NumberMaxOfPreferenceIncrement) {
    CurrentPreference += 1;
    e.target.previousElementSibling.dataset.preference = CurrentPreference;
    visualChangesOnButtonClick(themeName, CurrentPreference);
  }


};

function clickSubButton(e) {
 var textNode = e.target.nextElementSibling;
 var themeName = textNode.innerText;
 var CurrentPreference = parseInt(textNode.dataset.preference);
 if(CurrentPreference != 1) {
   CurrentPreference -= 1;
   e.target.nextElementSibling.dataset.preference = CurrentPreference;
   visualChangesOnButtonClick(themeName, CurrentPreference);
 }


};

(function(e) {
  var addButtons = document.getElementsByClassName("add");
  var subButtons = document.getElementsByClassName("sub");

  var numberOfButtons = addButtons.length;
  for(var i = 0; i < numberOfButtons; ++i)
  {
    addButtons[i].addEventListener('click', clickAddButton);
    subButtons[i].addEventListener('click', clickSubButton);
  }
})();



function sendUserSelectionToServer() {

  var userPreference = {}
  var numberOfThemes = listOfThemes.length;
  for(var i = 0; i < numberOfThemes; ++i) {
    var themeName = listOfThemes[i];
    var intensity = document.getElementById(themeName).getElementsByTagName('span')[0];
    intensity = intensity.dataset.preference;
    userPreference[themeName] = intensity;
  }

  userPreference = JSON.stringify(userPreference);


  $.ajax({
    type: "POST",
    url: "/questions",
    data: userPreference,
    success: function(html){
       $('body').html(html); // place the html wherever you like
    },
    error: function(err){ alert('error'); },
    contentType: "application/json"
  });

};

(function() {
  document.getElementById('submission').addEventListener('click', function(e) {

    sendUserSelectionToServer();
  });
})();
