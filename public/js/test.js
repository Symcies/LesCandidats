////////////////////////////////////////////////////////////////////////////////
/// Global variables
////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////
/// Load the sliders
////////////////////////////////////////////////////////////////////////////////

var loadSlider = function(themeName) {
  var sliderColumn = document.createElement('div');
  sliderColumn.className = 'row';

  var slider = document.createElement('input');
  slider.type = "range";
  slider.id = themeName;
  slider.value = '1';
  slider.min = '1';
  slider.max = '13';

  slider.oninput = function () {
    slider.style.backgroundImage = changeSliderColor(slider);
  };

  sliderColumn.appendChild(slider);

  return sliderColumn;
}

////////////////////////////////////////////////////////////////////////////////
/// Buttons effects
////////////////////////////////////////////////////////////////////////////////


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
/// Load the theme text with the buttons
////////////////////////////////////////////////////////////////////////////////
 var loadThemeText = function(themeName) {

   var subButton = document.createElement('input');
   subButton.type = "button";
   subButton.value = "-";
   subButton.className = "sub";

   var addButton = document.createElement('input');
   addButton.type = "button";
   addButton.value = "+";
   addButton.className = "add";

   var themeText = document.createElement('span');
   themeText.textContent = themeName;

   var newTheme = document.createElement('div');
   newTheme.className = 'row text-center';


   // Concatenating the elements
   newTheme.appendChild(subButton);
   newTheme.appendChild(themeText);
   newTheme.appendChild(addButton);

   return newTheme;

 };




////////////////////////////////////////////////////////////////////////////////
/// Function to add a theme to the test
////////////////////////////////////////////////////////////////////////////////

function addTheme(themeName) {

  var themeText = loadThemeText(themeName);
  var slider = loadSlider(themeName);

  // Creating all the elements
  var newDiv = document.createElement('div');
  newDiv.className = "col-md-2 col-md-offset-5";

  newDiv.appendChild(themeText);
  newDiv.appendChild(slider);

  var newRow = document.createElement('div');
  newRow.className = "row";
  newRow.appendChild(newDiv);

  // Adding it to the container
  var testDiv = document.getElementById('testRows');
  testDiv.appendChild(newRow);
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

function sendUserSelectionToServer(surveylength) {

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
  var lengthField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "length");
  hiddenField.setAttribute("value", surveylength);

  document.body.appendChild(form);
  form.submit();


};


(function() {
  var buttons = document.getElementsByClassName("btn");
  for(var i = 0; i < buttons.length; ++i) {

    buttons[i].addEventListener('click', function(e) {
      var length = e.target.getAttribute("data-length");
      sendUserSelectionToServer(length);
    });
  }
})();
