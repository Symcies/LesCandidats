////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////


var results = {};
var listOfThemesToDisplay = []
var invertedlistOfParties = {};
for(var key in listOfParties){
    invertedlistOfParties[listOfParties[key]] = key;
}


////////////////////////////////////////////////////////////////////////////////
/// Sum over the themes
////////////////////////////////////////////////////////////////////////////////

var sumOverThemes = function(themesToSum) {

  var maxValue =0;
  var selectedResults = {};

  for(key in listOfParties) {
    if(!listOfParties.hasOwnProperty(key)) continue;
    selectedResults[listOfParties[key]] = 0;
  }


  for(var i = 0; i < themesToSum.length; ++i) {
    var theme = themesToSum[i];
    for(key in rawResults[theme]) {
      if(key != 'topAnswer'){
        selectedResults[key] = selectedResults[key] + rawResults[theme][key];
      }
      else {
        maxValue += rawResults[theme][key];
      }
    }
  }

  return [selectedResults, maxValue];
};


////////////////////////////////////////////////////////////////////////////////
/// Display one party
////////////////////////////////////////////////////////////////////////////////

var displayOneParty = function(party) {
  var partyName = party[0];
  var value = party[1];

  /// Creating the elemnts
  var newRow = document.createElement('div');
  newRow.className = "row";

  var leftMargin = document.createElement('div');
  leftMargin.className = 'col-lg-2';

  var partyCol = document.createElement('div');
  partyCol.className = 'col-lg-2'
  partyCol.textContent = invertedlistOfParties[partyName];

  var resultCol = document.createElement('div');
  resultCol.className = 'col-lg-2';
  resultCol.textContent = value + '%';

  /// Concatenating the elements
  newRow.appendChild(leftMargin);
  newRow.appendChild(partyCol);
  newRow.appendChild(resultCol);

  var container = document.getElementById('mainContainer');
  container.appendChild(newRow);
};

////////////////////////////////////////////////////////////////////////////////
/// Display results
////////////////////////////////////////////////////////////////////////////////

var displayResults = function(resultsToDisplay) {
  var maxValue = resultsToDisplay[1];
  var resultsToDisplay = resultsToDisplay[0];

  var sortedResults = [];
  for (var result in resultsToDisplay)
    sortedResults.push([result, resultsToDisplay[result]/maxValue*100])

  sortedResults.sort(function(a, b) {
    return b[1] - a[1]
  })

  for(var i=0; i<sortedResults.length; ++i) {
    displayOneParty(sortedResults[i]);
  }


}

////////////////////////////////////////////////////////////////////////////////
/// Initialize the results
////////////////////////////////////////////////////////////////////////////////


var initializeResults = function() {

  for(key in rawResults) {
    if(!rawResults.hasOwnProperty[key]) {
      listOfThemesToDisplay.push(key);
    }
  }
  selectedResults = sumOverThemes(listOfThemesToDisplay);
  displayResults(selectedResults);
};

initializeResults();
