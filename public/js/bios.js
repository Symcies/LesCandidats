
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


function loadImage(bio) {

  var portrait = document.createElement("img");
  portrait.height = 160;
  portrait.src = '/img/eyes/' + bio["shortName"] + 'eyes.jpg'
  portrait.alt = name;

  return portrait;
}

function loadTitle(bio) {
  var title = document.createElement('h2');
  title.className = 'title';
  title.textContent = bio["name"];

  return title;
}

function loadBioLink(bio) {

  var linkToBiographie = document.createElement('a');
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';
  linkToBiographie.id = bio['shortName'];

  var caption = document.createElement('div');
  caption.className = "caption";
  caption.appendChild(linkToBiographie);

  return caption;
}

var writeBiographe = function(bio) {

  var Image = loadImage(bio);
  var Title = loadTitle(bio);
  var Caption = loadBioLink(bio);

  var candidate = document.createElement('div');
  candidate.className = 'col-md-12 thumbnail text-center';
  candidate.id = bio['shortName'];
  candidate.appendChild(Title);
  candidate.appendChild(Image);
  candidate.appendChild(Caption)


  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-md-6 candidate';
  fullCandidate.appendChild(candidate);

  return fullCandidate;
};


(function() {

  listCandidates = shuffle(biographies);
  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2';

  for(var i = 0; i < listCandidates.length; ++i) {
    var fullCandidate = writeBiographe(listCandidates[i]);
    mainCol.appendChild(fullCandidate);
  }

  var container = document.getElementById('mainContainer');
  container.appendChild(mainCol);
}
)();
