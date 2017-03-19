
////////////////////////////////////////////////////////////////////////////////
/// Display results
////////////////////////////////////////////////////////////////////////////////

var selectBest = function(results) {
  var candidate = '';
  var maxResult = 0;
  for(var key in results) {
    if(!results.hasOwnProperty(key)) continue;
    if(parseInt(results[key]) > maxResult) {
      maxResult = parseInt(results[key]);
      candidate = key;
    }
  }
  return [candidate, maxResult];
};


////////////////////////////////////////////////////////////////////////////////
/// Display favorite candidate
////////////////////////////////////////////////////////////////////////////////
var percentageRow = function(name, percentage) {

  var text = document.createElement('h2');
  text.textContent = "Avec près de " + (percentage).toFixed(1) + "% d'affinités, le candidat qui vous correspond le mieux est ";

  var container = document.createElement('div');
  container.className = 'col-md-8 col-md-offset-3 text-center';
  container.appendChild(text);

  var row = document.createElement('div');
  row.className = 'row';
  row.appendChild(container);

  return row;

};

var candidateRow = function(bio) {

  /// First column
  var picture = document.createElement('img');
  picture.height = 250;
  picture.src = '/img/profiles/' + bio['shortName'] + '.jpg';

  var pictureContainer = document.createElement('div');
  pictureContainer.style.borderRadius = '100px';
  pictureContainer.style.overflow = "hidden";
  pictureContainer.style.width = '200px';
  pictureContainer.style.height = '200px';
  pictureContainer.appendChild(picture);

  var name = document.createElement('h2');
  name.textContent = bio['name'];

  var nameContainer = document.createElement('div');
  nameContainer.appendChild(name);

  var firstCol = document.createElement('div');
  firstCol.className = "col-md-4"
  firstCol.appendChild(nameContainer);
  firstCol.appendChild(pictureContainer);



  /// Second column
  var program = document.createElement('div');

  for(var i = 0; i < bio['program'].length; ++i) {
    var Par = document.createElement('p');
    Par.textContent = bio['program'][i];
    program.appendChild(Par);
  }

  var secondCol = document.createElement('div');
  secondCol.className = 'col-md-8';
  secondCol.appendChild(program);

  /// Concatenate to build row
  var miniRow = document.createElement('div');
  miniRow.className = 'row';
  miniRow.appendChild(firstCol);
  miniRow.appendChild(secondCol);

  var mainCol = document.createElement('div');
  mainCol.className = 'col-md-8 col-md-offset-3 text-center';
  mainCol.appendChild(miniRow);

  var mainRow = document.createElement('div');
  mainRow.className = 'row';
  mainRow.appendChild(mainCol);

  return mainRow;
};


var displayFirst = function(favoriteCandidate, percentage) {

  /// First row : percentage
  var percentage = percentageRow(favoriteCandidate["name"], percentage );

  ///  Second row : two col -->
  var candidate = candidateRow(favoriteCandidate);

  var container = document.getElementById('favoriteCandidate');
  container.appendChild(percentage);
  container.appendChild(candidate);

  // TODO: Third Row : Share on twitter or facebook

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
