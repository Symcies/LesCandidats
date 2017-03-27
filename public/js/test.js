////////////////////////////////////////////////////////////////////////////////
/// Global variables
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
/// Load the sliders
////////////////////////////////////////////////////////////////////////////////

var loadSlider = function(theme) {
  var slider = document.createElement('input');
  slider.setAttribute('class', 'slid');
  slider.setAttribute('id', theme['name']);
  slider.setAttribute('data-slider-id', 'Slider');
  slider.setAttribute('type', 'text');
  slider.setAttribute('data-slider-min', '1');
  slider.setAttribute('data-slider-max', '20');
  slider.setAttribute('data-slider-step', '1');
  slider.setAttribute('data-slider-value', '7');

  var sliderRow = document.createElement('div');
  sliderRow.appendChild(slider);

  return sliderRow;
}

////////////////////////////////////////////////////////////////////////////////
/// Load the theme text with the buttons
////////////////////////////////////////////////////////////////////////////////
 var loadThemeText = function(theme) {
   var themeText = document.createElement('span');
   themeText.textContent = theme['name'];

   var themeRow = document.createElement('div');
   themeRow.className = 'row themeText';
   themeRow.appendChild(themeText);

   return themeRow;

 };

 ////////////////////////////////////////////////////////////////////////////////
 /// Load the icon
 ////////////////////////////////////////////////////////////////////////////////

var loadThemeIcon = function(theme) {
  var themeIcon = document.createElement('i');
  themeIcon.className = 'fa fa-' + theme['icon'] + '  fa-fw icon';

  var iconCol = document.createElement('div');
  iconCol.className = 'col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-1 col-xs-2 iconCol';
  iconCol.appendChild(themeIcon);

  return iconCol;
}

////////////////////////////////////////////////////////////////////////////////
/// Function to add a theme to the test
////////////////////////////////////////////////////////////////////////////////

function addTheme(theme) {

  /// load the text and slider rows
  var themeTextRow = loadThemeText(theme);
  var sliderRow = loadSlider(theme);

  // Concatenate the text and slider into a column
  var TextSliderCol = document.createElement('div');
  TextSliderCol.className = 'col-lg-8 col-md-8 col-sm-8 col-xs-10 textCol';
  TextSliderCol.appendChild(themeTextRow);
  TextSliderCol.appendChild(sliderRow);

  // Load the icon column
  var iconCol = loadThemeIcon(theme);

  // Concatenate the col within a row
  var ThemeRow = document.createElement('div');
  ThemeRow.className = 'row';
  ThemeRow.appendChild(iconCol);
  ThemeRow.appendChild(TextSliderCol);

  // Creating all the elements
  var newDiv = document.createElement('div');
  newDiv.className = "col-lg-6 col-md-6 col-sm-6 col-xs-12 themeUnit";
  newDiv.appendChild(ThemeRow);

  return newDiv;
};

////////////////////////////////////////////////////////////////////////////////
/// Init the list of themes of the test
////////////////////////////////////////////////////////////////////////////////

(function initThemes(){
  var NumberOfThemes = listOfThemes.length;
  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-10 col-xs-offset-1';

  for(var i = 0; i < NumberOfThemes; ++i)
  {
    var theme = addTheme(listOfThemes[i]);
    mainCol.appendChild(theme);
  }

  // Adding it to the container
  var testDiv = document.getElementById('testRows');
  testDiv.appendChild(mainCol);
})();


$('.slid').slider({
	formatter: function(value) {

		return 'Valeur: ' + value;
	}
});

////////////////////////////////////////////////////////////////////////////////
/// Send the data to the surver
////////////////////////////////////////////////////////////////////////////////

function sendUserSelectionToServer(surveylength) {

  var userPreference = {}
  var numberOfThemes = listOfThemes.length;
  for(var i = 0; i < numberOfThemes; ++i) {
    var themeName = listOfThemes[i]['name'];
    var intensity = document.getElementById(themeName).getAttribute('data-value');
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
  lengthField.setAttribute("type", "hidden");
  lengthField.setAttribute("name", "length");
  lengthField.setAttribute("value", surveylength);
  form.appendChild(lengthField);

  document.body.appendChild(form);
  form.submit();


};

$(".btn-group > .btn").click(function(){
    $(".btn-group > .btn").removeClass("active");
    $(this).addClass("active");
});


$(".validation").click(function() {
  var activeButton = document.getElementsByClassName('active');
  if(activeButton.length == 1) {

    length = activeButton[0].getAttribute("data-length");
    sendUserSelectionToServer(length);
  }
  else {
    $("#myModal").modal('show');
  }
});


$("#conceptDiv").click(function(){
  window.location.href="/concept";
});
