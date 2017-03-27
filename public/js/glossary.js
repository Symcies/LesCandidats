var writeExplanation = function(word, explanation) {

  var text = document.createElement('i');
  text.textContent = word;

  var wordH = document.createElement('blockquote')
  wordH.appendChild(text);

  var explanationD = document.createElement('div');
  explanationD.className = 'text-left';
  for(var i = 0; i < explanation.length; ++i) {
    var p = document.createElement('p');
    p.textContent = explanation[i];
    explanationD.appendChild(p);
  }

  var col = document.createElement('div');
  col.className = "col-lg-6 col-md-6 col-sm-6 col-xs-12 col";
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
