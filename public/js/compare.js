////////////////////////////////////////////////////////////////////////////////
/// Utilities
////////////////////////////////////////////////////////////////////////////////

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

////////////////////////////////////////////////////////////////////////////////
/// Title
////////////////////////////////////////////////////////////////////////////////

var loadTitle = function(themeName) {
  var title = document.createElement('h2');
  title.textContent = themeName;

  return title;
};

////////////////////////////////////////////////////////////////////////////////
/// Row of the candidate heads
////////////////////////////////////////////////////////////////////////////////

var headCol = function(candidate) {
  var picture = document.createElement('img');
  picture.className = "img-responsive heads";
  picture.src = '/img/profiles/' + candidate + '.jpg';

  var pictureContainer = document.createElement('div');
  pictureContainer.className = "pictureContainer col-lg-1 col-md-1 col-sm-1 col-xs-1";
  pictureContainer.appendChild(picture);

  return pictureContainer;
};

var candidatesRow = function(orderCandidates) {
  var row = document.createElement('div');
  row.className = 'row';

  var margin = document.createElement('div');
  margin.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1';
  row.appendChild(margin);

  for(var i = 0; i < orderCandidates.length; ++i) {
    candCol = headCol(orderCandidates[i]);
    row.appendChild(candCol);
  }
  return row;
};

////////////////////////////////////////////////////////////////////////////////
/// Row of questions
////////////////////////////////////////////////////////////////////////////////

var questionCol = function(text) {
  var col = document.createElement('div');
  col.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1';
  col.textContent = text;

  return col;
}

var answerCol = function(candidate, candidates) {
  var col = document.createElement('div');
  col.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1 block';
  col.style.height = '50px';


  var color1 = '#121212';
  var color2 = '#565656';
  var color3 = '#898989';
  var color4 = '#ABABAB';
  var color5 = '#EFEFEF';
  var colorNSPP = '#123456';

  if(candidate in candidates) {

    if(candidates[candidate] == 1) { col.style.backgroundColor = color1; }
    else if(candidates[candidate] == 2) { col.style.backgroundColor = color2; }
    else if(candidates[candidate] == 3) { col.style.backgroundColor = color3; }
    else if(candidates[candidate] == 4) { col.style.backgroundColor = color4; }
    else if(candidates[candidate] == 5) { col.style.backgroundColor = color5; }
    else { col.style.backgroundColor = colorNSPP; }

  } else {
    col.style.backgroundColor = colorNSPP;
  }

  return col;
}

var questionRow = function(question, orderCandidates) {
  var row = document.createElement('div');
  row.className = 'row';

  var questCol = questionCol(question['question']);
  row.appendChild(questCol);

  for(var i = 0; i < orderCandidates.length; ++i) {
    var ansCol = answerCol(orderCandidates[i], question["candidates"]);
    row.appendChild(ansCol);
  }

  return row;
};


////////////////////////////////////////////////////////////////////////////////
/// Concatenate into one theme
////////////////////////////////////////////////////////////////////////////////

var addTheme = function(themeName, questions) {

  var themeCol = document.createElement('div');
  themeCol.className = 'col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12';

  /// Add title
  title = loadTitle(themeName);
  themeCol.appendChild(title);

  /// Add candidateRow
  orderCandidates = [];
  for(var c in listOfCandidates) {orderCandidates.push(c);}
  orderCandidates = shuffle(orderCandidates);

  candidateHeads = candidatesRow(orderCandidates);
  themeCol.appendChild(candidateHeads);

  /// Add questions
  for(var i = 0; i < questions.length; ++i) {
    quest = questionRow(questions[i], orderCandidates);
    themeCol.appendChild(quest);
  }

  return themeCol;
};

(function() {
  var container = document.getElementById('compareRow');
  for(var theme in comparison) {
    if(!comparison.hasOwnProperty(theme)) continue;
    var themeCol = addTheme(theme, comparison[theme]);
    container.appendChild(themeCol);
  }
})();
