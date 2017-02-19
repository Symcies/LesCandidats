
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

function loadCaption(bio) {

  var title = document.createElement('h2');
  title.className = 'title';
  title.textContent = bio["name"];

  /*
  /// Link to biographie
  // TODO = remove link to have just a button --> See example here : http://v4-alpha.getbootstrap.com/components/modal/#modal-components

  var linkToBiographie = document.createElement('a');
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';
  linkToBiographie.id = bio['shortName'];

  var bioRow = document.createElement('div');
  bioRow.className = "row";
  bioRow.appendChild(linkToBiographie);
  */

  var caption = document.createElement('div');
  caption.className = "caption";
  caption.appendChild(title);

  return caption;
}

var writeBiographe = function(name) {

  var bio = biographies[name];

  var Image = loadImage(bio);
  var Caption = loadCaption(bio);

  var candidate = document.createElement('div');
  candidate.className = 'col-md-12 thumbnail text-center';
  candidate.appendChild(Image);
  candidate.appendChild(Caption);

  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-md-4 candidate';
  fullCandidate.appendChild(candidate);

  return fullCandidate;
};


(function() {
  var listCandidates = [];

  for(var candidate in biographies) {
    listCandidates.push(candidate);
  }

  listCandidates = shuffle(listCandidates);
  var container = document.getElementById('mainContainer');

  for(var i = 0; i < listCandidates.length; ++i) {

    var fullCandidate = writeBiographe(listCandidates[i]);
    container.appendChild(fullCandidate);
  }

}
)();
