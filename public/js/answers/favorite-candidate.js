
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
  picture.height = 200;
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

  /// Second column
  // Name part
  var name = document.createElement('h1');
  name.textContent = bio['name'];

  var nameContainer = document.createElement('div');
  nameContainer.className = 'nameContainer';
  nameContainer.appendChild(name);

  // Site part
  var site = document.createElement('p');
  site.textContent = 'Site officiel';

  var siteContainer = document.createElement('div');
  siteContainer.className = 'siteContainer';
  siteContainer.appendChild(site);

  // Biographie part
  var biographie = document.createElement('p');
  biographie.textContent = 'Biographie';

  var biographieContainer = document.createElement('div');
  biographieContainer.className = 'biographieContainer';
  biographieContainer.appendChild(biographie);

  /// Concatenate elements
  var nameCol = document.createElement('div');
  nameCol.className = "col-md-8 text-center"
  nameCol.id = "nameCol";
  nameCol.style.height = '200px';
  nameCol.appendChild(nameContainer);
  nameCol.appendChild(siteContainer);
  nameCol.appendChild(biographieContainer);

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(pictureCol);
  mainRow.appendChild(nameCol);

  return mainRow;
};

var shareRow = function() {


  var mainRow = document.createElement('div');
  mainRow.className = 'row';

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
/// Initialize the favorite candidate
////////////////////////////////////////////////////////////////////////////////


(function() {
  favoriteCandidate = userAnswers[0];
  percentage = favoriteCandidate[1];
  favoriteCandidate = listOfCandidates[favoriteCandidate[0]];
  displayFirst(favoriteCandidate, percentage);
}
)();


////////////////////////////////////////////////////////////////////////////////
/// Initialize the results
////////////////////////////////////////////////////////////////////////////////
jQuery(document).ready(function ($) {

  $('.rrssb-buttons').rrssb({
    // required:
    title: 'Mon candidat favori est '+ userAnswers[0],
    url: 'LesCandidats2017.fr',

    // optional:
    description: "Grâce aux candidats 2017, j'ai trouvé le candidat qui me correspond le plus",
    emailBody: 'Usually email body is just the description + url, but you can customize it if you want',
    image: '',
  });
});
