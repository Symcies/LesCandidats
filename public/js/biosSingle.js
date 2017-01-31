////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////

var listCurrentSituation = function(listPositions) {

  var list = document.createElement('ul');
  list.className = 'listPositions'

  for(var i = 0; i < listPositions.length; ++i) {
    var position = document.createElement('li');
    position.textContent = listPositions[i];
    list.appendChild(position);
  }

  return list;
};


////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyHeader = function(bio) {
  var name = bio['name'];

  var title = document.createElement('h4');
  title.className = 'modal-title';
  title.id=name;
  title.textContent=name;

  var header = document.createElement('div');
  header.className = 'modal-header';
  header.appendChild(title);

  return header;
};

////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyBody = function(bio) {
  var currentSituation = listCurrentSituation(bio["currentSituation"]);

  var bioText = document.createElement('p');
  bioText.textContent = bio['Bio'];

  var website = document.createElement('a');
  website.href = bio['website'];
  website.textContent = bio['partyName'];

  var body = document.createElement('div');
  body.className = 'modal-body';
  body.appendChild(currentSituation);
  body.appendChild(bioText);
  body.appendChild(website);


  return body;
};


////////////////////////////////////////////////////////////////////////////////
///
////////////////////////////////////////////////////////////////////////////////
var loadBiographyFooter = function(bio) {


  var footer = document.createElement('div');
  footer.className = 'modal-footer';
  footer.textContent = "This is the footer";
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

(function() {


})();
