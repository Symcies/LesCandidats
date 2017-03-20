
////////////////////////////////////////////////////////////////////////////////
/// Display results
////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
/// Display favorite candidate
////////////////////////////////////////////////////////////////////////////////
var percentageRow = function(name, percentage) {

  var text = document.createElement('h4');
  text.textContent = "Avec près de " + (percentage).toFixed(1) + "% d'affinités, " + name + " est le candidat qui vous correspond le mieux";


  var row = document.createElement('div');
  row.className = 'row text-center';
  row.appendChild(text);

  return row;

};

var candidateRow = function(bio) {

  /// First column
  var picture = document.createElement('img');
  picture.height = 270;
  picture.src = '/img/profiles/' + bio['shortName'] + '.jpg';

  var pictureContainer = document.createElement('div');
  pictureContainer.style.borderRadius = '100px';
  pictureContainer.style.overflow = "hidden";
  pictureContainer.style.width = '200px';
  pictureContainer.style.height = '200px';
  pictureContainer.appendChild(picture);

  var pictureCol = document.createElement('div');
  pictureCol.className = "col-md-4";
  pictureCol.appendChild(pictureContainer);


  var name = document.createElement('h1');
  name.textContent = bio['name'];


  var nameCol = document.createElement('div');
  nameCol.className = "col-md-8"
  nameCol.id = "nameCol";
  nameCol.style.height = '200px';
  nameCol.appendChild(name);

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(pictureCol);
  mainRow.appendChild(nameCol);

  return mainRow;
};


var displayFirst = function(favoriteCandidate, percentage) {


  ///  Candidate row
  var candidate = candidateRow(favoriteCandidate);

  /// Percentage row
  var percentage = percentageRow(favoriteCandidate["name"], percentage );

  /// Third row : share on twitter, facebook
  //var share = shareRow();

  var mainCol = document.createElement('div');
  mainCol.className = 'col-md-8 col-md-offset-3';
  mainCol.appendChild(candidate);
  mainCol.appendChild(percentage);
  //mainCol.appendChild(share);

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(mainCol);

  var container = document.getElementById('favoriteCandidate');
  container.appendChild(mainRow);
};


////////////////////////////////////////////////////////////////////////////////
/// Initialize the results
////////////////////////////////////////////////////////////////////////////////


(function() {
  favoriteCandidate = userAnswers[0];
  percentage = favoriteCandidate[1];
  favoriteCandidate = listOfCandidates[favoriteCandidate[0]];
  displayFirst(favoriteCandidate, percentage);
}
)();

//initializeResults();
