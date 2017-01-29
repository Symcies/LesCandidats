
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
    position.textContent = "- " + listPositions[i];
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

  /// Second row with site, functions and picture

  var textColumn = document.createElement('div');
  textColumn.className = 'col-lg-7 textColumn';

  var currentSituation = listCurrentSituation(bio["currentSituation"]);

  var website = document.createElement('a');
  website.href = bio['website'];
  website.textContent = bio['partyName'];

  textColumn.appendChild(currentSituation);
  textColumn.appendChild(website);


  /// Load the image
  var portrait = document.createElement("img");
  portrait.src = '/img/' + bio["shortName"] + '.jpg'
  portrait.height = 200;
  portrait.alt = name;

  var imageColumn = document.createElement('div')
  imageColumn.className = 'col-lg-5 portrait';

  imageColumn.appendChild(portrait);

  var textRow = document.createElement('div');
  textRow.className = 'row';
  textRow.appendChild(textColumn);
  textRow.appendChild(imageColumn);

  /// Third row with the short bio
  var bioRow = document.createElement('div');
  bioRow.className = 'row';

  var resume = document.createElement('p');
  resume.className = "bio";
  resume.textContent = bio['shortBio'];

  bioRow.appendChild(resume);

  var linkToBiographie = document.createElement('a');
  linkToBiographie.href = 'biographies/' + bio['shortName'];
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';

  var linkRow = document.createElement('div');
  linkRow.className = 'row linkRow'
  linkRow.appendChild(linkToBiographie);


  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-lg-12 candidate';

  fullCandidate.appendChild(nameRow);
  fullCandidate.appendChild(textRow);
  fullCandidate.appendChild(bioRow);
  fullCandidate.appendChild(linkRow);

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

  for(var i = 0; i < listCandidates.length; ++i) {

    var fullCandidate = writeBiographe(listCandidates[i]);

    var container = document.getElementById('mainContainer');
    container.appendChild(fullCandidate);
  }

}
)();
