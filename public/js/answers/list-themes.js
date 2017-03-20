var themeRow = function(theme, params) {
  
};

(function() {
  var container = document.getElementById('favoriteCandidate');
  container.appendChild(percentage);

  for(var key in rawResults) {
    console.log(key, rawResults[key])
    var themeResults = themeRow(key, rawResults[key]);
    container.appendChild(themeResults);
  }

})();
