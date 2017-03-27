var color1 = 'rgb(171, 22, 4)';
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

  var fakeCol = document.getElementById('fakeCol');
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

  var pictureContainer = document.createElement('div');
  pictureContainer.className = "pictureContainer col-lg-1 col-md-1 col-sm-1 col-xs-1";
  pictureContainer.appendChild(picture);

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
  col.className = 'col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 col-xs-10 col-xs-offset-2';
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

    if(child.style.backgroundColor == color1) { child.style.backgroundColor = color5; }
    else if(child.style.backgroundColor == color2) { child.style.backgroundColor = color4; }
    else if(child.style.backgroundColor == color4) { child.style.backgroundColor = color2; }
    else if(child.style.backgroundColor == color5) { child.style.backgroundColor = color1; }
  }
};


var questionCol = function(text) {
  var quest = document.createElement('p');
  quest.textContent = text[0];

  var col = document.createElement('div');
  col.className = 'col-lg-2 col-md-2 col-sm-2 col-xs-2 questionMark';
  col.setAttribute('val', 0);
  col.appendChild(quest);
  col.onclick = function (event) {
    invertColor(event);
    invertName(event, text);
  }
  return col;
}

/// Answers part

var answerCol = function(candidate, candidates) {

  var col = document.createElement('div');
  col.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1 block';
  col.style.height = '50px';




  if(candidate in candidates) {
    var value  = candidates[candidate]["value"];
    if(value == 1)      { col.style.backgroundColor = color1; }
    else if(value == 2) { col.style.backgroundColor = color2; }
    else if(value == 3) { col.style.backgroundColor = color3; }
    else if(value == 4) { col.style.backgroundColor = color4; }
    else if(value == 5) { col.style.backgroundColor = color5; }
    else {
      col.style.backgroundColor = colorNSPP;
    }

    var pop = document.createElement('button');
    pop.className = 'btn btn-lg';
    pop.type = "button";
    pop.setAttribute('data-toggle', 'popover');
    pop.setAttribute('data-placement', 'bottom');
    pop.setAttribute('data-trigger', 'hover');
    //pop.setAttribute('title', candidates[candidate]['title']);
    pop.setAttribute('data-html', 'true');
    var content = '';
    if(candidates[candidate]['content'].length > 1 && candidates[candidate].hasOwnProperty('content')) {
      for(var i = 0; i < candidates[candidate]['content'].length; ++i) {
        content += i+1 + '. ' + candidates[candidate]['content'][i] + '<br/>';
      }
    } else if (candidates[candidate]['content'].length == 1 && candidates[candidate].hasOwnProperty('content')){
      content += candidates[candidate]['content'][0];
    }
    /*
    if(candidates[candidate].hasOwnProperty('source') && candidates[candidate]['source'] != "" && candidates[candidate]['source'] != " ") {
      content += '<a href=' + candidates[candidate]['source'] + '> Source </a>';
    }
    */
    pop.setAttribute('data-content', content);
    col.appendChild(pop);

  } else {
    col.style.backgroundColor = colorNSPP;
  }

  return col;
}

var questionRow = function(question, orderCandidates) {

  var answersRow = document.createElement('div');
  answersRow.className = 'row';

  var questCol = questionCol(question['question']);

  for(var i = 0; i < orderCandidates.length; ++i) {
    var ansCol = answerCol(orderCandidates[i], question["candidates"]);
    answersRow.appendChild(ansCol);
  }

  var answersCol = document.createElement('div');
  answersCol.className = 'col-lg-10 col-md-10 col-sm-10 col-xs-10';
  answersCol.appendChild(answersRow);

  /// Concatenate into one row
  var row = document.createElement('div');
  row.className = 'row';
  row.appendChild(questCol);
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
})