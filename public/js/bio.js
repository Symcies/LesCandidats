


var loadImage = function() {
  var portrait = document.createElement("img");
  portrait.src = '/img/' + biographie["shortName"] + '.jpg'
  portrait.height = 300;
  portrait.alt = name;

  var newCol = document.createElement('div')
  newCol.className = 'col-lg-2';

  newCol.appendChild(portrait);

  return newCol;

};

var loadName = function() {
  var name = document.createElement('div');
  name.className = 'row title';
  name.textContent = biographie['name'];

  return name;
};

var loadBio = function() {
  var bio = document.createElement('div');
  bio.className = 'col-lg-6'
  bio.textContent = biographie["shortBio"];

  return bio;
};

var loadCurrentSituation = function() {
  var currentSituation = document.createElement('div');
  currentSituation.className = 'col-lg-6';
  currentSituation.textContent = biographie['currentSituation'];

  return currentSituation;
};


(function () {
  var nameRow = loadName();
  var imageCol = loadImage();
  var bio = loadBio();
  var currentSituationCol = loadCurrentSituation();

  var container = document.getElementById('mainContainer');
  container.appendChild(nameRow);

  var newRow = document.createElement('div');
  newRow.className = 'row';
  newRow.appendChild(currentSituationCol);
  newRow.appendChild(imageCol);

  container.appendChild(newRow);

  var bioRow = document.createElement('div');
  bioRow.className = "row";
  bioRow.appendChild(bio);

  container.appendChild(bioRow);
})();
