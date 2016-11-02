var colors = ['#f2f9fe', '#786756', '#983245'];

var leftButtons = document.getElementsByClassName('buttonLeft');
var rightButtons = document.getElementsByClassName('buttonRight');


for(var i = 0; i < rightButtons.length; ++i) {

  rightButtons[i].addEventListener('click', function(e) {
    var cloud = e.target.parentNode;
    cloud.style.background = '#09a3f5'
  });
}
