
var indexCol = function(number) {
  var index = document.createElement('h1');
  index.textContent = (number+1) + '.';

  var col = document.createElement('div');
  col.className = 'col-md-1 col-md-offset-4';
  col.appendChild(index);

  return col;
};

var nameCol = function(bio) {


  var partyCol = document.createElement('div');
  partyCol.className = 'col-md-2 '
  partyCol.textContent = bio['name'];

  return partyCol;
};

var percentageCol = function(percentage) {

  var perc = document.createElement('div');
  perc.textContent = (percentage).toFixed(1) + '%';
  perc.style.width = 5*percentage +'px';
  perc.style.backgroundColor = 'black';

  var resultCol = document.createElement('div');
  resultCol.className = 'col-md-2';
  resultCol.appendChild(perc);

  return resultCol;

};

var bioCol = function(bio) {

  var link  = document.createElement('a');
  link.textContent = 'Biographie';
  link.className = "bioLink";
  link.id = bio['shortName'];

  var col = document.createElement('div');
  col.className = 'col-md-2';
  col.appendChild(link);

  return col;
};


var candidateRow = function(candidate, number) {
  var shortName = candidate[0];
  var percentage = candidate[1];

  var index  = indexCol(number);
  var name   = nameCol(listOfCandidates[shortName]);
  var result = percentageCol(percentage);

  var bio    = bioCol(listOfCandidates[shortName]);

  /// Concatenating the elements
  var newRow = document.createElement('div');
  newRow.className = "row";
  newRow.appendChild(index);
  newRow.appendChild(name);
  newRow.appendChild(result);
  newRow.appendChild(bio);


  return newRow;
};


var headerRow = function() {
  var text = document.createElement('h2');
  text.textContent = "Les résultats détaillés";

  var col = document.createElement('div');
  col.className = 'col-md-6 col-md-offset-4 text-center';
  col.appendChild(text);

  var row = document.createElement('div');
  row.className = 'row';
  row.appendChild(col);

  return row;
};

(function() {

  var container = document.getElementById('listOfCandidates');

  var header = headerRow();
  container.appendChild(header);

  for(var i=0; i<userAnswers.length; ++i) {
    var candidate = candidateRow(userAnswers[i], i);
    container.appendChild(candidate);
  }

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
