var headerRow = function() {
  var header = document.createElement('h1');
  header.textContent = "Résultats par thème";

  var explanation = document.createElement('p');
  explanation.textContent = "Seuls sont affichés les thèmes auxquels vous avez répondu plus de 3 questions";

  var row = document.createElement('div');
  row.className = 'row text-center';
  row.appendChild(header);
  row.appendChild(explanation);

  return row;
};


var themeCol = function(theme) {
  var par = document.createElement('h2');
  par.textContent = theme;

  var col = document.createElement('div');
  col.className = 'col-md-3 col-md-offset-1';
  col.appendChild(par);

  return col;
};

var candidateCol = function(theme, params) {
  var col = document.createElement('div');
  col.className = 'col-md-8';

  userAnswers = sumOverThemes([theme]);
  userAnswers = sortCandidates(userAnswers);

  for(var i = 0; i < 3; ++i) {
    var p = document.createElement('p');
    var name = listOfCandidates[userAnswers[i][0]]['name'];
    var perc = userAnswers[i][1]
    p.textContent =  name + " avec "  + (perc).toFixed(1) + "% d'affinités.";
    col.appendChild(p);
  }

  return col;
};

var themeRow = function(theme, params) {

  var themeTitle = themeCol(theme);
  var candidates = candidateCol(theme, params);

  var row = document.createElement('div');
  row.className = 'row themeRow';
  row.appendChild(themeTitle);
  row.appendChild(candidates);

  return row;
};

(function() {

  var mainCol = document.createElement('div');
  mainCol.className = 'col-md-8 col-md-offset-3';
  mainCol.appendChild(headerRow());

  for(var key in rawResults) {

    if(parseInt(rawResults[key]['NbOfQuestionsAnswered']) > 2) {
      var themeResults = themeRow(key, rawResults[key]);
      mainCol.appendChild(themeResults);
    }
  }

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(mainCol);

  var container = document.getElementById('listThemes');
  container.appendChild(mainRow);
})();
