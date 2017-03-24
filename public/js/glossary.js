var writeExplanation = function(word, explanation) {

  var wordH = document.createElement('h4')
  wordH.textContent = word;

  var explanationD = document.createElement('div');
  explanationD.className = 'text-left';
  for(var i = 0; i < explanation.length; ++i) {
    var p = document.createElement('p');
    p.textContent = explanation[i];
    explanationD.appendChild(p);
  }

  var col = document.createElement('div');
  col.className = "col-lg-4 col-md-4 col-sm-6 col-xs-12 col";
  col.appendChild(wordH);
  col.appendChild(explanationD);

  return col;
};

( function() {
  var container = document.getElementById('words');
  for(var word in listOfWords) {
    if(!listOfWords.hasOwnProperty(word)) continue;

    var explanation = writeExplanation(word, listOfWords[word]);
    container.appendChild(explanation);
  }
})();
