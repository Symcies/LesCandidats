var biographies = {
  'François Fillon' : {
    'resume': 'bla bla bla',
    'biographie' : 'long text',
    'website': 'www.fillon2017.fr',
    'linkToBiographie': 'fillon'
  },
  'Jean-Luc Mélenchon' : {
    'resume': 'bla bla bla',
    'biographie' : 'long text',
    'website': 'www.jlm2017.fr',
    'linkToBiographie': 'melenchon'
  },
  'Marine Le Pen' : {
    'resume': 'bla bla bla',
    'biographie' : 'long text',
    'website': 'wok',
    'linkToBiographie': 'lepen'
  },
  'Emmanuel Macron' : {
    'resume': 'bla bla bla',
    'biographie' : 'long text',
    'website': 'https://en-marche.fr/',
    'linkToBiographie': 'macron'
  },
  'Yannick Jadot' : {
    'resume': 'bla bla bla',
    'biographie' : 'long text',
    'website': 'www..fr',
    'linkToBiographie': 'jadot'
  }

};

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

  var content = biographies[name];
  console.dir(content);

  var newDiv = document.createElement('div');
  newDiv.className = 'col-lg-4';

  var title = document.createElement('h2');
  title.textContent = name;

  var resume = document.createElement('p');
  resume.textContent = content['resume'];

  var website = document.createElement('a');
  website.href = content['website'];
  website.textContent = content['website'];

  var websiteP = document.createElement('p');
  websiteP.appendChild(website);

  var linkToBiographie = document.createElement('a');
  linkToBiographie.href = 'biographies/' + content['linkToBiographie'];
  linkToBiographie.role = 'button';
  linkToBiographie.className = 'btn btn-default';
  linkToBiographie.textContent = 'Voir la biographie &raquo;';

  newDiv.appendChild(title);
  newDiv.appendChild(website);
  newDiv.appendChild(resume);
  newDiv.appendChild(linkToBiographie);

  var container = document.getElementById('mainContainer');
  container.appendChild(newDiv);
};

(function() {
  var listCandidates = [];

  for(var candidate in biographies) {
    listCandidates.push(candidate);
  }

  listCandidates = shuffle(listCandidates);

  for(var i = 0; i < listCandidates.length; ++i) {
    writeBiographe(listCandidates[i]);
  }

}
)();
