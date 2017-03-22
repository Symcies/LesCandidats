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

    var name = listOfCandidates[userAnswers[i][0]]['name'];
    var percentage = userAnswers[i][1];

    var p = document.createElement('p');
    p.textContent =  name;

    var nameCol = document.createElement('div');
    nameCol.className = 'col-lg-4';
    nameCol.appendChild(p)

    var progress = document.createElement('div');
    progress.style.backgroundColor = "#667fa0";
    progress.className = "progress-bar";
    progress.role = "progressbar";
    progress.setAttribute('aria-valuenow', percentage);
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemax', 100);
    progress.textContent = (percentage).toFixed(0) + '%';
    progress.style.width = percentage + "%";

    var progressContainer = document.createElement('div');
    progressContainer.className = 'progress themeProgress';
    progressContainer.appendChild(progress);

    var progressCol = document.createElement('div');
    progressCol.className = 'col-lg-7';
    progressCol.appendChild(progressContainer);

    var row = document.createElement('div');
    row.className = 'row candidateThemeRow';
    row.appendChild(nameCol);
    row.appendChild(progressCol);

    col.appendChild(row);
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
