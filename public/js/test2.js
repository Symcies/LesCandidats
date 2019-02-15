var color1 = 'rgb(132, 16, 2)';
var color2 = 'rgb(241, 169, 160)';
var color3 = 'rgb(231, 165, 4)';
var color4 = 'rgb(200, 247, 197)';
var color5 = 'rgb(22, 161, 1)';
var colorNSPP = 'rgba(158, 158, 158, 0.4)';

////////////////////////////////////////////////////////////////////////////////
/// Delete Marianne if not enough space
////////////////////////////////////////////////////////////////////////////////

var MarianneDelete = (function() {
  var Marianne = document.getElementById('Marianne');
  var MarianneWidth = Marianne.clientWidth;

  var wrap = document.getElementById('wrap');
  var wrapWidth = wrap.clientWidth;

  var fakeCol = document.getElementById('tiRow');
  var colWidth = fakeCol.clientWidth;

  if((wrapWidth - colWidth)/2 < MarianneWidth + 20) {
    Marianne.style.height = '0px';
  }
});

MarianneDelete();
$(window).resize(function() {
  MarianneDelete();
});
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

  var name = document.createElement('p');
  name.textContent = listOfCandidates[candidate]["name"];


  var nameDiv = document.createElement('div');
  nameDiv.className = "headName";
  nameDiv.style.display = "none";
  nameDiv.appendChild(name);

  var pictureContainer = document.createElement('div');
  pictureContainer.className = "pictureContainer col-lg-1 col-md-1 col-sm-1 col-xs-1";
  pictureContainer.appendChild(picture);
  pictureContainer.appendChild(nameDiv);

  return pictureContainer;
};

var candidatesRow = function(orderCandidates) {
  var row = document.createElement('div');
  row.className = 'row';

  for(var i = 0; i < orderCandidates.length; ++i) {
    candCol = headCol(orderCandidates[i]);
    row.appendChild(candCol);
  }

  var col = document.createElement('div');
  col.className = 'col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-12 col-xs-12';
  col.appendChild(row);

  var containerRow = document.createElement('div');
  containerRow.className = 'row';
  containerRow.appendChild(col);

  return containerRow;
};

////////////////////////////////////////////////////////////////////////////////
/// Row of question + Answers
////////////////////////////////////////////////////////////////////////////////



/// Question part

function invertName(e, text) {

  if(e.target.firstChild.textContent == text[0]) {
    e.target.firstChild.textContent = text[1];
  } else {
    e.target.textContent = text[0];
  }
}

function invertColor(e) {

  var children = e.target.parentNode.nextSibling.firstChild.children;
  for(var i = 0; i < children.length; ++i) {
    var child = children[i];

    if(child.style.backgroundColor == color1)      { child.style.backgroundColor = color5; }
    else if(child.style.backgroundColor == color2) { child.style.backgroundColor = color4; }
    else if(child.style.backgroundColor == color4) { child.style.backgroundColor = color2; }
    else if(child.style.backgroundColor == color5) { child.style.backgroundColor = color1; }
  }
};

function displaySelection1(e) {
  var parent = e.target.parentNode;
  parent.firstChild.style.height = "20px";
  parent.firstChild.style.fontSize = "15px";
  parent.className = 'col-lg-2 col-md-2 col-sm-12 col-xs-12 questionMark';
  parent.parentNode.removeChild(parent.parentNode.childNodes[2]);
  parent.parentNode.removeChild(parent.parentNode.childNodes[1]);
  parent.nextSibling.style.display = "inline";
};

function displaySelection2(e) {
  var parent = e.target.parentNode;
  parent.firstChild.style.height = "20px";
  parent.firstChild.style.fontSize = "15px";
  parent.className = 'col-lg-2 col-md-2 col-sm-12 col-xs-12 questionMark';
  parent.nextSibling.style.display = "inline";
  parent.parentNode.removeChild(parent.parentNode.childNodes[1]);
  parent.parentNode.removeChild(parent.parentNode.childNodes[0]);
};

var questionCols = function(text) {
  /// First col
  var quest1 = document.createElement('p');
  quest1.textContent = text[0];
  quest1.style.height = "48px";

  var col1 = document.createElement('div');
  col1.className = 'col-lg-4 col-md-4 col-sm-5 col-xs-5 col-lg-offset-2 col-md-offset-2 questionMark';
  col1.setAttribute('val', 0);
  col1.appendChild(quest1);

  $(col1).one('click', function(event) {
    displaySelection1(event);
    invertColor(event);
    invertName(event, text);
  })

  col1.onclick = function (event) {
    invertColor(event);
    invertName(event, text);
  }

  /// Second col
  var ppp = document.createElement('p');
  ppp.textContent = '\u2194';
  ppp.style.fontSize = "24px";

  var col2 = document.createElement("div");
  col2.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center';
  col2.style.paddingRight = "0px";
  col2.style.paddingLeft = "0px";
  col2.appendChild(ppp);


  /// Third col
  var quest3 = document.createElement('p');
  quest3.textContent = text[1];
  quest3.style.height = "48px";

  var col3 = document.createElement('div');
  col3.className = 'col-lg-4 col-md-4 col-sm-5 col-xs-5 questionMark';
  col3.setAttribute('val', 0);
  col3.appendChild(quest3);
  $(col3).one('click', function(event) {
    displaySelection2(event);
    invertName(event, text);
  })
  col3.onclick = function (event) {
    invertColor(event);
    invertName(event, text);

  }


  return [col1, col2, col3];
};

/// Answers part

var setPopOver = function(candidate) {
  var pop = document.createElement('button');
  pop.className = 'btn btn-lg';
  pop.type = "button";
  pop.setAttribute('data-toggle', 'popover');
  pop.setAttribute('data-placement', 'bottom');
  pop.setAttribute('data-trigger', 'hover');
  pop.setAttribute('data-html', 'true');

  var content = '';
  if(candidate['content'].length > 1 && candidate.hasOwnProperty('content')) {
    for(var i = 0; i < candidate['content'].length; ++i) {
      content += i+1 + '. ' + candidate['content'][i] + '<br/>';
    }
  } else if (candidate['content'].length == 1 && candidate.hasOwnProperty('content')){
    content += candidate['content'][0];
  }

  pop.setAttribute('data-content', content);

  return pop;
};

var answerCol = function(candidate, candidates) {

  var col = document.createElement('div');
  col.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1 block';


  if(candidate in candidates) {
    var value  = candidates[candidate]["value"];

    if(value == 1)      { col.style.backgroundColor = color1; }
    else if(value == 2) { col.style.backgroundColor = color2; }
    else if(value == 3) { col.style.backgroundColor = color3; }
    else if(value == 4) { col.style.backgroundColor = color4; }
    else if(value == 5) { col.style.backgroundColor = color5; }
    else                { col.style.backgroundColor = colorNSPP; }

    if(candidates[candidate]["content"].length > 0) {
      var pop = setPopOver(candidates[candidate]);
      col.textContent = "*";
      col.style.fontSize = "18px";
      col.appendChild(pop);
    }

  } else {
    col.style.backgroundColor = colorNSPP;
  }

  return col;
}

var questionRow = function(question, orderCandidates) {

  var answersRow = document.createElement('div');
  answersRow.className = 'row';

  var questCols = questionCols(question['question']);

  for(var i = 0; i < orderCandidates.length; ++i) {
    var ansCol = answerCol(orderCandidates[i], question["candidates"]);
    answersRow.appendChild(ansCol);
  }

  var answersCol = document.createElement('div');
  answersCol.className = 'col-lg-10 col-md-10 col-sm-12 col-xs-12 answersCol';
  answersCol.style.display = "none";
  answersCol.appendChild(answersRow);

  /// Concatenate into one row
  var row = document.createElement('div');
  row.className = 'row';
  row.style.minHeight = "50px";
  row.appendChild(questCols[0]);
  row.appendChild(questCols[1]);
  row.appendChild(questCols[2]);
  row.appendChild(answersCol);

  return row;
};


////////////////////////////////////////////////////////////////////////////////
/// Concatenate into one theme
////////////////////////////////////////////////////////////////////////////////

var addTheme = function(themeName, questions, orderCandidates) {

  var themeCol = document.createElement('div');
  themeCol.className = 'col-lg-11 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 themeBlock';

  /// Add title
  title = loadTitle(themeName);
  themeCol.appendChild(title);

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

  /// Add candidateRow
  orderCandidates = [];
  for(var c in listOfCandidates) {orderCandidates.push(c);}
  orderCandidates = shuffle(orderCandidates);

  var container = document.getElementById('compareRow');
  for(var theme in comparison) {
    if(!comparison.hasOwnProperty(theme)) continue;
    var themeCol = addTheme(theme, comparison[theme], orderCandidates);
    container.appendChild(themeCol);
  }

})();


$(".btn-group > .btn").click(function(){
    $(".btn-group > .btn").removeClass("active");
    $(this).addClass("active");
});

$(function () {
    $('[data-toggle="popover"]').popover()
});
