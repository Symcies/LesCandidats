
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


function loadImage(bio) {

  var portrait = document.createElement("img");
  portrait.className = "img-responsive";
  portrait.src = '/img/profiles/' + bio["shortName"] + '.jpg'
  portrait.alt = name;

  var portraitContainer = document.createElement('div');
  portraitContainer.className = "portraitContainer";
  portraitContainer.appendChild(portrait);

  return portraitContainer;
}

function loadTitle(bio) {
  var title = document.createElement('h2');
  title.className = 'title';
  title.textContent = bio["name"];

  return title;
}

function loadBioLink(bio) {

  var linkToBiographie = document.createElement('a');
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';
  linkToBiographie.id = bio['shortName'];

  var caption = document.createElement('div');
  caption.className = "caption";
  caption.appendChild(linkToBiographie);

  return caption;
}

var writeBiographe = function(bio) {

  var Image = loadImage(bio);
  var Title = loadTitle(bio);
  //var Caption = loadBioLink(bio);

  var candidate = document.createElement('div');
  candidate.className = 'row thumbnail text-center';
  candidate.id = bio['shortName'];
  candidate.appendChild(Title);
  candidate.appendChild(Image);
  //candidate.appendChild(Caption)


  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-lg-6 col-md-4 col-sm-6 col-xs-12 candidate';
  fullCandidate.appendChild(candidate);

  return fullCandidate;
};


(function() {

  candidateKeys = shuffle(Object.keys(biographies));

  var mainCol = document.createElement('div');
  mainCol.className = 'col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12';

  for(var i = 0; i < candidateKeys.length; ++i) {
    var fullCandidate = writeBiographe(biographies[candidateKeys[i]]);
    mainCol.appendChild(fullCandidate);
  }

  var mainRow = document.createElement('div');
  mainRow.className = "row";
  mainRow.appendChild(mainCol);

  var container = document.getElementById('mainContainer');
  container.appendChild(mainRow);

}
)();


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

$(".thumbnail").click(function(e){

  var bio;
  for(var key in biographies)
  {
    if(!biographies.hasOwnProperty(key)) continue;
    if(biographies[key]['shortName'] == $(this).attr("id"))
    {
      bio = biographies[key];
      break;
    }
  }
  changeBiography(bio);
  $("#singleBio").modal('show');
});
