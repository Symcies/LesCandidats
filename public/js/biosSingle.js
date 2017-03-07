////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////

var listCurrentSituation = function(listPositions) {

  var list = document.createElement('ul');
  list.className = 'listPositions list-unstyled';

  for(var i = 0; i < listPositions.length; ++i) {
    var position = document.createElement('li');
    position.textContent = listPositions[i];
    list.appendChild(position);
  }

  return list;
};


var listBiography = function(listBio) {
  var bioContainer = document.createElement('div');

  for(var i = 0; i < listBio.length; ++i)
  {
      var paragraph = document.createElement('p');
      paragraph.textContent = listBio[i];
      bioContainer.appendChild(paragraph);
  }

  return bioContainer;
};

var loadImageRow = function(bio) {
  var image = document.createElement('img');
  image.height = 200;
  image.id = "image";
  image.src = '/img/profiles/' + bio["shortName"] + '.jpg'
  image.alt = bio['name'];

  var imageRow = document.createElement('div');
  imageRow.className = 'row';
  imageRow.id = 'imageContainer';
  imageRow.appendChild(image);

  return imageRow;
}


////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyHeader = function(bio) {

  var title = document.createElement('h3');
  title.className = "title-modal"
  title.textContent = bio['name'];

  var titleCol = document.createElement('div');
  title.className = "col-md-4";
  titleCol.appendChild(title);

  var politicalParty = document.createElement("h3");
  politicalParty.textContent = bio['partyName'];

  var politicalPartyCol = document.createElement('div');
  politicalPartyCol.className = 'col-md-4 col-md-offset-2';
  politicalPartyCol.appendChild(politicalParty);

  var logo = document.createElement('img');
  logo.height = 60;
  logo.src = '/img/political_party/' + bio["shortName"] + '.png'
  logo.alt = bio['name'];

  var logoCol = document.createElement('div');
  logoCol.className = 'col-md-2';
  logoCol.appendChild(logo);

  var headerRow = document.createElement('div');
  headerRow.className = 'row';
  headerRow.appendChild(titleCol);
  headerRow.appendChild(politicalPartyCol);
  headerRow.appendChild(logoCol);

  var headerContainer = document.createElement('div');
  headerContainer.className = 'container-fluid';
  headerContainer.appendChild(headerRow);

  var header = document.createElement('div');
  header.className = 'modal-header';
  header.appendChild(headerContainer);

  return header;
};

////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyBody = function(bio) {


  /// First column
  var fullBiography = listBiography(bio['Bio']);

  var link = document.createElement('a');
  link.href = bio['website'];
  link.textContent = "site officiel";

  var linkParagraph = document.createElement('p');
  linkParagraph.textContent = "Pour décrouvrir tout le programme de " + bio['name'] + ", rendez-vous sur son ";
  linkParagraph.appendChild(link);

  var bioText = document.createElement('div');
  bioText.className = 'col-md-8';
  bioText.appendChild(fullBiography);
  bioText.appendChild(linkParagraph);

  /// Second column
  var imageRow = loadImageRow(bio);

  var age = document.createElement('h3');
  age.textContent = bio['age'] + ' ans';
  var ageRow = document.createElement('div');
  ageRow.className = 'row text-center';
  ageRow.appendChild(age);

  var currentSituation = listCurrentSituation(bio["currentSituation"]);
  var currentSituationRow = document.createElement('div');
  currentSituationRow.className = 'row';
  currentSituationRow.appendChild(currentSituation);

  var secondCol = document.createElement('div');
  secondCol.className = 'col-md-4';
  secondCol.appendChild(imageRow);
  secondCol.appendChild(ageRow);
  secondCol.appendChild(currentSituationRow);

  /// Concatenate the two columns
  var mainRow = document.createElement('div');
  mainRow.appendChild(bioText);
  mainRow.appendChild(secondCol);

  var container = document.createElement('div');
  container.className = 'row';
  container.appendChild(mainRow);

  var body = document.createElement('div');
  body.className = 'modal-body';
  body.appendChild(container);

  return body;
};


////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyFooter = function(bio) {

  var listSources = document.createElement('ul');
  listSources.className = "list-unstyled";

  for(var key in bio['Sources'])
  {
    if(bio['Sources'].hasOwnProperty(key)) {
      var link = document.createElement('a');
      link.textContent = key;
      link.href = bio['Sources'][key];

      var ul = document.createElement('ul');
      ul.appendChild(link);

      listSources.appendChild(ul);

    }
  }

  var sourcesCol = document.createElement('div');
  sourcesCol.className = "col-md-5";
  sourcesCol.appendChild(listSources);

  var sourceName = document.createElement('div');
  sourceName.className = "col-md-2 col-md-offset-2 text-center";
  sourceName.textContent = "Sources";

  var sourcesRow = document.createElement('div');
  sourcesRow.className = "row";
  sourcesRow.appendChild(sourceName);
  sourcesRow.appendChild(sourcesCol);

  var footer = document.createElement('div');
  footer.className = 'modal-footer';
  footer.appendChild(sourcesRow);

  return footer;
};


////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
 var loadBoostrapStructure = function(bio) {

   var header = loadBiographyHeader(bio)
   var body = loadBiographyBody(bio);
   var footer = loadBiographyFooter(bio);

   var content = document.createElement('div');
   content.className = "modal-content";
   content.appendChild(header);
   content.appendChild(body);
   content.appendChild(footer);

   var dialog = document.createElement('div');
   dialog.className = 'modal-dialog modal-lg';
   dialog.role = 'document';
   dialog.appendChild(content);

   var modal = document.createElement('div');
   modal.className = 'modal fade';
   modal.id = 'singleBio';
   modal.tabindex = "-1";
   modal.role = "dialog";
   modal.setAttribute('aria-labelledby', 'exampleModalLabel');
   modal.setAttribute('aria-hidden', 'true');
   modal.appendChild(dialog);

   return modal;

 };

 ////////////////////////////////////////////////////////////////////////////////
 /// Change the single biography
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


////////////////////////////////////////////////////////////////////////////////
/// Launch the modal
////////////////////////////////////////////////////////////////////////////////


$(".btn-default").click(function(e){
  var bio = biographies[e.target.id];
  changeBiography(bio);
  $("#singleBio").modal('show');
});

////////////////////////////////////////////////////////////////////////////////
/// Initialize
////////////////////////////////////////////////////////////////////////////////
