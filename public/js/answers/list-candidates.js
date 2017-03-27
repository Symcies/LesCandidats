var headerRow = function() {
  var header = document.createElement('h1');
  header.textContent = "Résultats détaillés";

  var row = document.createElement('div');
  row.className = 'row text-center';
  row.appendChild(header);

  return row;
};


var nameCol = function(bio, number) {

  /// First column
  var index = document.createElement('h1');
  index.textContent = number + 1 + '.';

  var indexCol = document.createElement('div');
  indexCol.className = 'col-lg-1 col-md-1 col-sm-1 col-xs-1';
  indexCol.appendChild(index);

  /// First column
  var picture = document.createElement('img');
  picture.style.height = '60px' ;
  picture.src = '/img/profiles/' + bio['shortName'] + '.jpg';

  var pictureContainer = document.createElement('div');
  pictureContainer.style.borderRadius = '30px';
  pictureContainer.style.overflow = "hidden";
  pictureContainer.style.width = '60px';
  pictureContainer.style.height = '60px';

  pictureContainer.appendChild(picture);

  var pictureCol = document.createElement('div');
  pictureCol.className = "col-lg-3 col-md-3 col-sm-3 col-xs-3";
  pictureCol.appendChild(pictureContainer);

  /// Second column
  var name = document.createElement('h1');
  name.textContent = bio['name'];

  var polParty = document.createElement('h2');
  polParty.textContent = bio['partyName'];

  var partyCol = document.createElement('div');
  partyCol.className = 'col-lg-8 col-md-8 col-sm-8 col-xs-8';
  partyCol.appendChild(name);
  partyCol.appendChild(polParty);

  var row = document.createElement('div');
  row.className = 'row subCandidateRow';
  row.appendChild(indexCol);
  row.appendChild(pictureCol);
  row.appendChild(partyCol);

  var col = document.createElement('div');
  col.className = 'col-lg-6 col-md-6 col-sm-6 col-xs-6';
  col.appendChild(row);

  return col;
};

var percentageCol = function(percentage) {

  var progress = document.createElement('div');

  /*
  if(percentage >= 75) {
    progress.style.backgroundColor = "#788965";
  } else if(percentage >= 50) {
    progress.style.backgroundColor = "#123456";
  } else if(percentage >= 25) {
    progress.style.backgroundColor = "#123456";
  }
  else {
    progress.style.backgroundColor = "#890098";
  }
  */
  progress.style.backgroundColor = "#667fa0";

  progress.className = "progress-bar";
  progress.role = "progressbar";
  progress.setAttribute('aria-valuenow', percentage);
  progress.setAttribute('aria-valuemin', 0);
  progress.setAttribute('aria-valuemax', 100);
  progress.textContent = (percentage).toFixed(0) + '%';
  progress.style.width = percentage + "%";

  var container = document.createElement('div');
  container.className = 'progress candidateProgress';
  container.appendChild(progress);

  var resultCol = document.createElement('div');
  resultCol.className = 'col-lg-4 col-md-4 col-sm-4 col-xs-4';
  resultCol.appendChild(container);

  return resultCol;

};

var bioCol = function(bio) {

  var link  = document.createElement('p');
  link.textContent = 'Biographie';

  var col = document.createElement('div');
  col.className = 'col-lg-2 col-md-2 col-sm-2 col-xs-2 bioLink';
  col.id = bio['shortName'];
  col.appendChild(link);

  return col;
};


var candidateRow = function(candidate, number) {
  var shortName = candidate[0];
  var percentage = candidate[1];

  var name   = nameCol(listOfCandidates[shortName], number);
  var result = percentageCol(percentage);
  var bio    = bioCol(listOfCandidates[shortName]);

  /// Concatenating the elements
  var newRow = document.createElement('div');
  newRow.className = "row candidateRow";
  newRow.appendChild(name);
  newRow.appendChild(result);
  newRow.appendChild(bio);


  return newRow;
};





(function() {
  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-10 col-xs-offset-1';
  mainCol.appendChild(headerRow());

  var j = 0;
  for(var i=0; i<userAnswers.length; ++i) {
    if(userAnswers[i][0] != "FA" && userAnswers[i][0] != "JL") {
      var candidate = candidateRow(userAnswers[i], j);
      mainCol.appendChild(candidate);
      ++j;
    }
  }

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(mainCol);

  var container = document.getElementById('listOfCandidates');
  container.appendChild(mainRow);

})();


////////////////////////////////////////////////////////////////////////////////
/// Launch the modal
////////////////////////////////////////////////////////////////////////////////
var changeBiography = function(bio) {
  // TO DO : DO NOT RELOAD EACH TIME !!
  bootstrapStructure = loadBoostrapStructure(bio);
  var container = document.getElementById('singleBiography');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(bootstrapStructure);
};


$(".bioLink").click(function(e){

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
