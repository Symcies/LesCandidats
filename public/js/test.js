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
  var subButton = document.createElement('input');
  subButton.type = "button";
  subButton.value = "-";
  subButton.className = "sub";

  var addButton = document.createElement('input');
  addButton.type = "button";
  addButton.value = "+";
  addButton.className = "add";


  var slider = document.createElement('input');
  slider.type = "range";
  slider.id = themeName;
  slider.value = '1';
  slider.min = '1';
  slider.max = '13';

  slider.oninput = function () {
    slider.style.backgroundImage = changeSliderColor(slider);
  };

  var addButtonColumn = document.createElement("div");
  addButtonColumn.className = "col-md-1 buttonCol";
  addButtonColumn.appendChild(addButton);

  var subButtonColumn = document.createElement("div");
  subButtonColumn.className = "col-md-1 buttonCol";
  subButtonColumn.appendChild(subButton);

  var sliderColumn = document.createElement('div');
  sliderColumn.className = 'col-md-10 sliderCol';
  sliderColumn.appendChild(slider);


  var sliderRow = document.createElement('div');
  sliderRow.className = "row sliderRow"
  sliderRow.appendChild(subButtonColumn);
  sliderRow.appendChild(sliderColumn);
  sliderRow.appendChild(addButtonColumn);

  return sliderRow;
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



   var themeText = document.createElement('span');
   themeText.className = "themeText";
   themeText.textContent = themeName;

   var themeCol = document.createElement('div');
   themeCol.className = "col-md-offset-2";
   themeCol.appendChild(themeText);

   var themeRow = document.createElement('div');
   themeRow.className = 'row';
   themeRow.appendChild(themeCol);

   return themeRow;

 };




////////////////////////////////////////////////////////////////////////////////
/// Function to add a theme to the test
////////////////////////////////////////////////////////////////////////////////

function addTheme(themeName, offset) {

  var themeTextRow = loadThemeText(themeName);
  var sliderRow = loadSlider(themeName);

  // Creating all the elements
  var newDiv = document.createElement('div');
  if(offset) {
    newDiv.className = "col-md-3 col-md-offset-3";
  }
  else {
    newDiv.className = "col-md-3";
  }


  newDiv.appendChild(themeTextRow);
  newDiv.appendChild(sliderRow);

  var newRow = document.createElement('div');
  newRow.className = "row";
  newRow.appendChild(newDiv);

  // Adding it to the container
  var testDiv = document.getElementById('testRows');
  testDiv.appendChild(newDiv);
};

////////////////////////////////////////////////////////////////////////////////
/// Init the list of themes of the test
////////////////////////////////////////////////////////////////////////////////

(function init(){
  var NumberOfThemes = listOfThemes.length;
  offset = true;
  for(var i = 0; i < NumberOfThemes; ++i)
  {
    addTheme(listOfThemes[i], offset);
    offset = !offset;
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
