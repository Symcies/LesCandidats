////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////

var listCurrentSituation = function(listPositions) {

  var name = document.createElement('h3');
  name.textContent = "Poste(s) actuel(s)";

  var list = document.createElement('ul');
  list.className = 'listPositions list-unstyled';

  for(var i = 0; i < listPositions.length; ++i) {
    var position = document.createElement('li');
    position.textContent = listPositions[i];
    list.appendChild(position);
  }

  var col = document.createElement('div');
  col.className = "col-lg-12 col-md-12 col-sm-12 col-xs-12 postes";
  col.style.marginLeft = "0px";
  col.appendChild(name);
  col.appendChild(list);

  return col;
};


var listBiography = function(listBio) {
  var bioContainer = document.createElement('div');

  for(var i = 0; i < listBio.length; ++i)
  {
      var paragraph = document.createElement('p');
      paragraph.className = "para";
      paragraph.textContent = listBio[i];
      bioContainer.appendChild(paragraph);
  }

  return bioContainer;
};

var loadImageRow = function(bio) {
  var image = document.createElement('img');
  image.height = 200;
  image.id = "image";
  image.className = "center-block";
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
  title.className = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
  titleCol.appendChild(title);

  var politicalParty = document.createElement("h3");
  politicalParty.textContent = bio['partyName'];

  var politicalPartyCol = document.createElement('div');
  politicalPartyCol.className = 'col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-12 col-xs-12';
  politicalPartyCol.appendChild(politicalParty);

  var logo = document.createElement('img');
  logo.style.maxHeight = '60px';
  logo.style.maxWidth = '140px';
  logo.src = '/img/political_party/' + bio["shortName"] + '.png'
  logo.alt = bio['name'];

  var logoCol = document.createElement('div');
  logoCol.className = 'col-lg-2 col-md-2 col-sm-0 col-xs-0 logo';
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
  bioText.className = 'col-lg-8 col-md-8 col-sm-12 col-xs-12';
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
  secondCol.className = 'col-lg-4 col-md-4 col-sm-12 col-xs-12';
  secondCol.appendChild(imageRow);
  secondCol.appendChild(ageRow);
  secondCol.appendChild(currentSituationRow);

  /// Concatenate the two columns
  var mainRow = document.createElement('div');
  mainRow.appendChild(secondCol);
  mainRow.appendChild(bioText);

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
      link.className = "sourceLink"
      link.href = bio['Sources'][key];

      var ul = document.createElement('ul');
      ul.appendChild(link);

      listSources.appendChild(ul);

    }
  }

  var sourcesCol = document.createElement('div');
  sourcesCol.className = "col-lg-10 col-lg-10 col-sm-10 col-xs-10 text-left";
  sourcesCol.appendChild(listSources);

  var sourceName = document.createElement('div');
  sourceName.className = "col-lg-2 col-lg-2 col-sm-2 col-xs-2 text-center";
  sourceName.style.fontSize = "20px";
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
   dialog.className = 'modal-dialog modal-lg modal-md';
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



////////////////////////////////////////////////////////////////////////////////
/// Initialize
////////////////////////////////////////////////////////////////////////////////
