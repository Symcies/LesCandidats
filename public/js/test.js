////////////////////////////////////////////////////////////////////////////////
/// Global variables
////////////////////////////////////////////////////////////////////////////////

var listOfThemes = [
  "Système Politique",
  "Environnement",
  "Politique étrangère",
  "Economies et Finances",
  "Culture",
  "Justice",
  "Sécurité",
  "Santé",
  "Travail",
  "Numérique"
]

////////////////////////////////////////////////////////////////////////////////
/// Function on click of the buttons : ranges and inputs
////////////////////////////////////////////////////////////////////////////////

function visualChangesOnButtonClick(themeName, preferenceValue) {
  // TODO

};

function changeSliderColor(slider) {
  var value = (slider.value - slider.min)/(slider.max - slider.min);

  var backgroundImage = [
    '-webkit-gradient(',
      'linear, ',
      'left top, ',
      'right top, ',
      'color-stop(' + value + ', #09598C), ',
      'color-stop(' + value + ', #e8e8e8)',
    ')'
  ].join('');

  return backgroundImage;
};


function clickAddButton(e) {
  var slider = e.target.parentNode.nextElementSibling.firstElementChild;
  slider.value = parseInt(slider.value) + 1;
  slider.style.backgroundImage = changeSliderColor(slider);
  //visualChangesOnButtonClick(themeName, CurrentPreference);
}


function clickSubButton(e) {
  var slider = e.target.parentNode.nextElementSibling.firstElementChild;
  slider.value = parseInt(slider.value) - 1;
  slider.style.backgroundImage = changeSliderColor(slider);
  //visualChangesOnButtonClick(themeName, CurrentPreference);
};

////////////////////////////////////////////////////////////////////////////////
/// Function to add a theme to the test
////////////////////////////////////////////////////////////////////////////////

function addTheme(themeName) {

  // Creating all the elements
  var newRow = document.createElement('div');
  newRow.className = "row";

  var leftMargin = document.createElement('div');
  leftMargin.className = 'col-lg-2';

  var newTheme = document.createElement('div');
  newTheme.className = 'theme text-center col-lg-2';

  var subButton = document.createElement('input');
  subButton.type = "button";
  subButton.value = "-";
  subButton.className = "sub";

  var addButton = document.createElement('input');
  addButton.type = "button";
  addButton.value = "+";
  addButton.className = "add";

  var sliderColumn = document.createElement('div');
  sliderColumn.className = 'col-lg-4';

  var slider = document.createElement('input');
  slider.type = "range";
  slider.id = themeName;
  slider.value = '1';
  slider.min = '1';
  slider.max = '13';

  slider.oninput = function () {
    slider.style.backgroundImage = changeSliderColor(slider);
  };


  var themeText = document.createElement('span');
  themeText.className = "themeText"
  themeText.textContent = themeName;

  // Concatenating the elements
  newTheme.appendChild(subButton);
  newTheme.appendChild(themeText);
  newTheme.appendChild(addButton);

  sliderColumn.appendChild(slider);

  newRow.appendChild(leftMargin);
  newRow.appendChild(newTheme);
  newRow.appendChild(sliderColumn);


  // Adding it to the container
  var container = document.getElementById('mainContainer');
  var submissionNode = container.lastElementChild;
  container.insertBefore(newRow, submissionNode);
};

////////////////////////////////////////////////////////////////////////////////
/// Init the list of themes of the test
////////////////////////////////////////////////////////////////////////////////

(function init(){
  var NumberOfThemes = listOfThemes.length;
  for(var i = 0; i < NumberOfThemes; ++i)
  {
    addTheme(listOfThemes[i]);
  }
})();


////////////////////////////////////////////////////////////////////////////////
/// Add the input buttons (+) and (-)
////////////////////////////////////////////////////////////////////////////////


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


////////////////////////////////////////////////////////////////////////////////
/// Send the data to the surver
////////////////////////////////////////////////////////////////////////////////

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
