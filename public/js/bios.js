
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

var listCurrentSituation = function(listPositions) {

  var list = document.createElement('ul');
  list.className = 'listPositions'

  for(var i = 0; i < listPositions.length; ++i) {
    var position = document.createElement('li');
    position.textContent = listPositions[i];
    list.appendChild(position);
  }

  return list;
};

var writeBiographe = function(name) {

  var bio = biographies[name];

  /// First row with the name
  var nameRow = document.createElement('div');
  nameRow.className = 'row';

  var title = document.createElement('h2');
  title.className = "title"
  title.textContent = bio["name"];

  nameRow.appendChild(title);

  /// SEcond row with eyes
  var eyesRow = document.createElement('div');
  eyesRow.className = 'row eyes';

  var portrait = document.createElement("img");
  portrait.src = '/img/' + bio["shortName"] + 'eyes.jpg'
  portrait.height = 160;
  portrait.alt = name;

  eyesRow.appendChild(portrait);

  /// Thirt row with functions

  var currentSituationRow = document.createElement('div');
  currentSituationRow.className = 'row';

  var currentSituation = listCurrentSituation(bio["currentSituation"]);

  currentSituationRow.appendChild(currentSituation);

  /// Fourth row with site
  var websiteRow = document.createElement('div');
  websiteRow.className = "row";

  var website = document.createElement('a');
  website.href = bio['website'];
  website.textContent = bio['partyName'];

  websiteRow.appendChild(website);

  /// Fifth row with link to full biographie
  var bioRow = document.createElement('div');
  bioRow.className = "row bio";

  var linkToBiographie = document.createElement('a');
  linkToBiographie.href = 'biographies/' + bio['shortName'];
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';

  bioRow.appendChild(linkToBiographie);


  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-lg-12 candidate';

  fullCandidate.appendChild(nameRow);
  fullCandidate.appendChild(eyesRow);
  fullCandidate.appendChild(currentSituationRow);
  fullCandidate.appendChild(websiteRow);
  fullCandidate.appendChild(linkToBiographie);

  var ext = document.createElement('div');
  ext.className = 'col-lg-4 framework';

  ext.appendChild(fullCandidate);

  return ext;
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
