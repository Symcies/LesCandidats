
////////////////////////////////////////////////////////////////////////////////
/// Sum over the themes
////////////////////////////////////////////////////////////////////////////////

var sumOverThemes = function(themesToSum) {

  var maxValue = 0;
  var selectedResults = {};
  for(var candidate in listOfCandidates) {
    selectedResults[candidate] = 0;
  }

  for(var i = 0; i < themesToSum.length; ++i) {
    var theme = themesToSum[i];
    for(key in rawResults[theme]) {
      if(key != 'topAnswer' && key != 'NbOfQuestionsAnswered'){
        selectedResults[key] = selectedResults[key] + rawResults[theme][key];
      }
    }
    if('topAnswer' in rawResults[theme]) {
      maxValue += parseInt(rawResults[theme]['topAnswer']);
    }

  }

  return [selectedResults, maxValue];
};


var sortCandidates = function(userAnswers) {
  var maxValue = userAnswers[1];
  var userAnswers = userAnswers[0];

  var sortedResults = [];
  for (var result in userAnswers)
    sortedResults.push([result, userAnswers[result]/maxValue*100])

    sortedResults.sort(function(a, b) {
    return b[1] - a[1]
  });

  return sortedResults;
};

( function() {
  var allThemes = [];
  for(key in rawResults) {
    if(!rawResults.hasOwnProperty[key]) {
      allThemes.push(key);
    }
  }

  userAnswers = sumOverThemes(allThemes);
  userAnswers = sortCandidates(userAnswers);
})();
