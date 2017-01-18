

/// Functions

function visualChangesOnButtonClick(themeName, preferenceValue) {
  // TODO

};

function clickAddButton(e) {
  var slider = e.target.parentNode.nextElementSibling.firstElementChild;
  slider.value = parseInt(slider.value) + 1;
  //visualChangesOnButtonClick(themeName, CurrentPreference);
}


function clickSubButton(e) {
  var slider = e.target.parentNode.nextElementSibling.firstElementChild;
  slider.value = parseInt(slider.value) - 1;
  //visualChangesOnButtonClick(themeName, CurrentPreference);
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
    var intensity = document.getElementById(themeName).value;
    userPreference[themeName] = intensity;
  }


  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "questions");

  for(var key in userPreference) {
      if(userPreference.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", userPreference[key]);

          form.appendChild(hiddenField);
       }
  }
  document.body.appendChild(form);
  form.submit();


};

(function() {
  document.getElementById('submission').addEventListener('click', function(e) {
    sendUserSelectionToServer();
  });
})();
