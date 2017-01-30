


var loadImage = function(shortName) {
  var imageRow = document.createElement("div");
  imageRow.className = "row";

  var portrait = document.createElement("img");
  portrait.src = '/img/' + shortName + '.jpg'
  portrait.height = 400;
  portrait.alt = name;

  imageRow.appendChild(portrait);

  return imageRow;

};

var loadName = function(name) {
  var nameRow = document.createElement('div');
  nameRow.className = 'row title';
  nameRow.textContent = name;

  return nameRow;
};

var loadBio = function(paragraphs) {
  var bio = document.createElement('div');
  bio.className = 'row'

  for(var i = 0; i < paragraphs.length; ++i) {
    var par = document.createElement('p');
    par.textContent = paragraphs[i];
    bio.appendChild(par);
  }

  return bio;
};

var loadCurrentSituation = function(listPositions) {
  var listRow = document.createElement('div');
  listRow.className = "row";

  var list = document.createElement('ul');
  list.className = 'listPositions'

  for(var i = 0; i < listPositions.length; ++i) {
    var position = document.createElement('li');
    position.textContent = listPositions[i];
    list.appendChild(position);
  }

  listRow.append(list);

  return listRow;
};

var loadWebsite = function(websiteName, partyName) {

  var websiteRow = document.createElement('div');
  websiteRow.className = "row";

  var website = document.createElement('a');
  website.href = websiteName;
  website.textContent = "Site de campagne  - " + partyName;

  websiteRow.appendChild(website);

  return websiteRow
};


(function () {

  /// Load the different parts
  var name = loadName(biography['name']);
  var image = loadImage(biography['shortName']);
  var bio = loadBio(biography['Bio']);
  var situation = loadCurrentSituation(biography['currentSituation']);
  var website = loadWebsite(biography['website'], biography['partyName']);

  /// Construct the first column
  var bioCol = document.createElement('div');
  bioCol.className = "col-lg-8";

  bioCol.appendChild(name);
  bioCol.appendChild(bio);

  /// Construct the second column
  var infoCol = document.createElement('div');
  infoCol.className = "col-lg-4";

  infoCol.appendChild(image);
  infoCol.appendChild(situation);
  infoCol.appendChild(website);

  /// construct the main row
  var mainRow = document.createElement('div');
  mainRow.className = 'row';

  mainRow.appendChild(bioCol);
  mainRow.appendChild(infoCol);

  /// Append to the main container
  var container = document.getElementById('mainContainer');
  container.appendChild(mainRow);
}
)();
