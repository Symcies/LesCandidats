var headerRow = function() {
  var header = document.createElement('h1');
  header.textContent = "Résultats par thème";

  var explanation = document.createElement('p');
  explanation.textContent = "Ne sont affichés que les thèmes pour lesquels vous avez répondu plus de trois questions, ainsi que les candidats desquels vous êtes le plus proche";
  explanation.style.fontSize = "16px";

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
  col.className = 'col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-12';
  col.appendChild(par);

  return col;
};



var candidateCol = function(theme, params, names) {
  var row = document.createElement('div');
  row.className = 'row';

  var divSize = 0;
  if(names.length == 1)      { divSize = 'col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center' }
  else if(names.length == 2) { divSize = 'col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center' }
  else if(names.length == 3) { divSize = 'col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center' }
  else { divSize = 'col-lg-4 col-md-4 col-sm-6 col-xs-4'}


  for(var i = 0; i < names.length; ++i) {
    var picture = document.createElement('img');
    picture.style.height = '80px' ;
    picture.style.display = 'flex';
    picture.src = '/img/profiles/' + names[i] + '.jpg';


    var pictureContainer = document.createElement('div');
    pictureContainer.style.borderRadius = '40px';
    pictureContainer.style.overflow = "hidden";
    pictureContainer.style.width = '80px';
    pictureContainer.style.height = '80px';
    pictureContainer.style.marginTop = '10px';
    pictureContainer.style.justifyContent = 'block';
    pictureContainer.style.marginLeft = 'auto';
    pictureContainer.style.marginRight = 'auto';
    pictureContainer.appendChild(picture);

    var text = document.createElement('h4');
    text.textContent = (i+1) + '. ' +listOfCandidates[names[i]]['name'];

    var pictureCol = document.createElement('div');
    pictureCol.className = divSize;
    pictureCol.appendChild(pictureContainer);
    pictureCol.appendChild(text);

    row.appendChild(pictureCol);
  }


  /*
  for(var i = 0; i < 3; ++i) {

    var name = listOfCandidates[userAnswers[i][0]]['name'];
    var percentage = userAnswers[i][1];

    var p = document.createElement('p');
    p.textContent =  name;

    var nameCol = document.createElement('div');
    nameCol.className = 'col-lg-4 col-md-4 col-sm-4 col-xs-6';
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
    progressCol.className = 'col-lg-7 col-md-7 col-sm-7 col-xs-6';
    progressCol.appendChild(progressContainer);

    var row = document.createElement('div');
    row.className = 'row candidateThemeRow';
    row.appendChild(nameCol);
    row.appendChild(progressCol);

    col.appendChild(row);
  }
  */

  var col = document.createElement('div');
  col.className = 'col-lg-8 col-md-8 col-sm-8 col-xs-12';
  col.appendChild(row);

  return col;
};



var themeRow = function(theme, params, names) {



  var themeTitle = themeCol(theme);
  var candidates = candidateCol(theme, params, names);

  var row = document.createElement('div');
  row.className = 'row themeRow';
  row.appendChild(themeTitle);
  row.appendChild(candidates);

  return row;
};

function numberOfCandidate(userAnswers) {
  var names = [];
  for(var i = 0; i < userAnswers.length; ++i ) {
    if(userAnswers[i][1] > 50 && i < 3) {
      names.push(userAnswers[i][0]);
    }
  }
  return names;
};

(function() {

  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12';
  mainCol.appendChild(headerRow());

  for(var key in rawResults) {

    if(parseInt(rawResults[key]['NbOfQuestionsAnswered']) > 2) {
      userAnswers = sumOverThemes([key]);
      userAnswers = sortCandidates(userAnswers);
      var names = numberOfCandidate(userAnswers);
      if(names.length > 0 ) {
        var themeResults = themeRow(key, rawResults[key], names);
        mainCol.appendChild(themeResults);
      }
    }
  }

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(mainCol);

  var container = document.getElementById('listThemes');
  container.appendChild(mainRow);
})();
