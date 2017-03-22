
////////////////////////////////////////////////////////////////////////////////
/// Display results
////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
/// Display favorite candidate
////////////////////////////////////////////////////////////////////////////////
var headerRow = function(bio) {
  var text = document.createElement('h1');
  text.id = "titleName";
  text.textContent = "Votre candidat 2017 est " + bio['name'];

  var col = document.createElement('div');
  col.className = 'col-lg-12 text-center';
  col.appendChild(text);

  var row = document.createElement('div');
  row.className = 'row text-center';
  row.appendChild(col);

  return row;
};

var percentageRow = function(name, percentage) {

  var progress = document.createElement('div');
  progress.style.backgroundColor = "#bf4847";
  progress.className = "progress-bar";
  progress.role = "progressbar";
  progress.setAttribute('aria-valuenow', percentage);
  progress.setAttribute('aria-valuemin', 0);
  progress.setAttribute('aria-valuemax', 100);
  progress.textContent = (percentage).toFixed(1) + '%';
  progress.style.width = percentage + "%";
  progress.style.fontSize = "18px";
  progress.style.lineHeight = "30px";

  var container = document.createElement('div');
  container.className = 'progress';
  container.appendChild(progress);
  container.style.height = "30px";


  var text = document.createElement('h4');
  text.textContent = "Avec près de " + (percentage).toFixed(1) + "% d'affinités, " + name + " est le candidat qui vous correspond le plus";

  var col = document.createElement('div');
  col.className = 'col-lg-8 col-lg-offset-2';
  col.appendChild(container);
  col.appendChild(text);

  var row = document.createElement('div');
  row.className = 'row text-center';
  row.appendChild(col);

  return row;

};

var candidateRow = function(bio) {

  /// First column
  var picture = document.createElement('img');
  picture.height = 150;
  picture.src = '/img/profiles/' + bio['shortName'] + '.jpg';

  var pictureContainer = document.createElement('div');
  pictureContainer.style.borderRadius = '75px';
  pictureContainer.style.overflow = "hidden";
  pictureContainer.style.width = '150px';
  pictureContainer.style.height = '150px';
  pictureContainer.appendChild(picture);

  var pictureCol = document.createElement('div');
  pictureCol.className = "col-lg-3 col-lg-offset-2";
  pictureCol.appendChild(pictureContainer);

  /// Second column

  // Site part
  var site = document.createElement('p');
  site.textContent = 'Son site officiel';

  var siteContainer = document.createElement('div');
  siteContainer.className = 'favBox';
  siteContainer.appendChild(site);
  siteContainer.addEventListener('click', function (event) {
    window.open(bio['website']);
});

  // Biographie part
  var biographie = document.createElement('p');
  biographie.textContent = 'Sa biographie';

  var biographieContainer = document.createElement('div');
  biographieContainer.className = 'favBox modalBio';
  biographieContainer.id = bio['shortName'];
  biographieContainer.appendChild(biographie);

  /// Concatenate elements
  var nameCol = document.createElement('div');
  nameCol.className = "col-lg-4 col-md-offset-1 text-center"
  nameCol.id = "nameCol";
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

  /// Header row
  var header = headerRow(favoriteCandidate);

  ///  Candidate row
  var candidate = candidateRow(favoriteCandidate);

  /// Percentage row
  var percentage = percentageRow(favoriteCandidate["name"], percentage );

  /// Third row : share on twitter, facebook
  //var share = shareRow();

  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2';
  mainCol.id = "favoriteCandidateCol";
  mainCol.appendChild(header);
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


$(".modalBio").click(function(e){
  var bio;
  for(var key in listOfCandidates)
  {
    if(!listOfCandidates.hasOwnProperty(key)) continue;
    if(listOfCandidates[key]['shortName'] == $(this).attr("id"))
    {
      bio = listOfCandidates[key];
      break;
    }
  }
  changeBiography(bio);
  $("#singleBio").modal('show');
});
