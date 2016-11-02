var colors = ['rgb(247, 220, 168)',
              'rgb(247, 205, 168)',
              'rgb(247, 190, 168)',
              'rgb(247, 175, 168)',
              'rgb(247, 160, 168)',
              'rgb(247, 145, 168)',
              'rgb(247, 130, 168)'];

var leftButtons = document.getElementsByClassName('buttonLeft');
var rightButtons = document.getElementsByClassName('buttonRight');


for(var i = 0; i < rightButtons.length; ++i) {

  rightButtons[i].addEventListener('click', function(e) {
    var cloud = e.target.parentNode;
    var cloudColor = getComputedStyle(cloud).backgroundColor;

    for(var j = 0; j < colors.length - 1; ++j) {

      if(cloudColor == colors[j]) {
        cloud.style.backgroundColor = colors[j+1];
      }
    }
  });
}

for(var i = 0; i < leftButtons.length; ++i) {

  leftButtons[i].addEventListener('click', function(e) {
    var cloud = e.target.parentNode;
    var cloudColor = getComputedStyle(cloud).backgroundColor;

    for(var j = 1; j < colors.length; ++j) {

      if(cloudColor == colors[j]) {
        cloud.style.backgroundColor = colors[j-1];
      }
    }
  });
}
