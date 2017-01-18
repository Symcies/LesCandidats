/// Global variables
var NumberMaxOfPreferenceIncrement  = 6;
var firstPreferenceValue = 1;

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

/// Functions

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

  var themeText = document.createElement('span');
  themeText.setAttribute("data-preference",firstPreferenceValue);
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




(function init(){
  var NumberOfThemes = listOfThemes.length;
  for(var i = 0; i < NumberOfThemes; ++i)
  {
    addTheme(listOfThemes[i]);
  }
})();
