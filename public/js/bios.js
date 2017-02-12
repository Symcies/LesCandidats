
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

var writeBiographe = function(name) {

  var bio = biographies[name];

  /// First row with the name
  var nameRow = document.createElement('div');
  nameRow.className = 'row eyeRow';

  var thumbNail = document.createElement('div');
  thumbNail.className = 'thumbnail';

  var caption = document.createElement('div');
  caption.className = 'caption eyes';

  var portrait = document.createElement("img");
  portrait.src = '/img/eyes/' + bio["shortName"] + 'eyes.jpg'
  portrait.height = 160;
  portrait.alt = name;

  var title = document.createElement('h2');
  title.className = "title"
  title.textContent = bio["name"];

  caption.appendChild(portrait);
  thumbNail.appendChild(caption);
  thumbNail.appendChild(title);
  nameRow.appendChild(thumbNail);

  /// Fifth row with link to full biographie
  var bioRow = document.createElement('div');
  bioRow.className = "row bio";

  // TODO = remove link to have just a button --> See example here : http://v4-alpha.getbootstrap.com/components/modal/#modal-components
  var linkToBiographie = document.createElement('a');
  //linkToBiographie.href = 'biographies/' + bio['shortName'];
  //linkToBiographie.href = '#bio';
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie complète';
  linkToBiographie.id = bio['shortName'];

  bioRow.appendChild(linkToBiographie);


  /// Assemble the divs
  var fullCandidate = document.createElement('div');
  fullCandidate.className = 'col-lg-12 candidate';

  fullCandidate.appendChild(nameRow);
  fullCandidate.appendChild(linkToBiographie);

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
  var container = document.getElementById('mainContainer');

  for(var i = 0; i < listCandidates.length; ++i) {

    var fullCandidate = writeBiographe(listCandidates[i]);
    container.appendChild(fullCandidate);
  }

}
)();


$("[rel='tooltip']").tooltip();

$('.thumbnail').hover(
    function(){
        $(this).find('.caption').slideUp(250); //.fadeIn(250)
    },
    function(){
        $(this).find('.caption').slideDown(250); //.fadeOut(205)
    }
);
