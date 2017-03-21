var writeExplanation = function(explanation) {

  var wordH = document.createElement('h4')
  wordH.textContent = explanation[0];

  var explanationD = document.createElement('div');
  explanationD.className = 'text-left';
  for(var i = 1; i < explanation.length; ++i) {
    var p = document.createElement('p');
    p.textContent = explanation[i];
    explanationD.appendChild(p);
  }

  var col = document.createElement('div');
  col.className = "col-md-6";
  col.appendChild(wordH);
  col.appendChild(explanationD);

  return col;
};

( function() {
  var container = document.getElementById('words');
  for(var word in listOfWords) {
    if(!listOfWords.hasOwnProperty(word)) continue;

    var explanation = writeExplanation(listOfWords[word]);
    container.appendChild(explanation);
  }
})();
