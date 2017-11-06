// Global Variables ---------------------------------------------------------

window.onload=function(){
  drawMap()
  $('#bomberman').addClass('down');
}

var currentKey;
var timerWalk;
var charStep = 2;
var charSpeed = 300;
var bomberman = $('#bomberman');
var container = $('#container');


//Map creation ---------------------------------------------------------
var mapArray = [
  [0,0,1,1,1,1,0,0],
  [0,2,1,2,2,1,2,0],
  [1,1,1,1,1,1,1,1],
  [2,1,2,0,0,2,1,2],
  [2,1,2,0,0,2,1,2],
  [1,1,1,1,1,1,1,1],
  [0,2,1,2,2,1,2,0],
  [0,0,1,1,1,1,0,0],
];

function drawMap(){
  for (var i = 0; i < mapArray.length; i++) {
    for (var j = 0; j < mapArray[i].length; j++) {
      if (parseInt(mapArray[i][j]) === 0){
        $('#container').append('<div class="grass"></div>');
      }else if (parseInt(mapArray[i][j])===1){
        $('#container').append('<div class="breakable"></div>')
      }else if (parseInt(mapArray[i][j]) ===2){
        $('#container').append('<div class="unbreakable"></div>')
      }
    }
  }
}

//Character movement and boundaries ------------------------------------------------
function processWalk(dir){
  charStep ++;
  if (charStep === 5) charStep = 1;

  //removes class
  $('#bomberman').removeAttr('class');

  //add class for direction moving
  switch(charStep){
    case 1: $('#bomberman').addClass(dir); break;
    case 2: $('#bomberman').addClass(dir + '-one'); break;
    case 3: $('#bomberman').addClass(dir); break;
    case 4: $('#bomberman').addClass(dir + '-two'); break;
  }

  //move bomberman length and height of image
  switch(dir){
    case 'front':
      if ($('#bomberman').position().top < 370){
        $('#bomberman').animate({top: '+=12'}, charSpeed);
      }
      break;
    case 'back':
      if ($('#bomberman').position().top > 0){
        $('#bomberman').animate({top: '-=12'}, charSpeed);
      }
      break;
    case 'left':
    if ($('#bomberman').position().left >0){
      $('#bomberman').animate({left:'-=12'}, charSpeed);
    }
    break;
    case 'right':
    if ($('#bomberman').position().left <380){
      $('#bomberman').animate({left: '+=12'}, charSpeed);
    }
    break;
  }
}

//Function that make movement possible -----------------------------------------------------------------

// If there isn't a key pressed at the moment, this happens
$(document).keydown(function(e){
  if (!currentKey){

    currentKey = e.keyCode;

    switch(e.keyCode){
      case 87: charWalk('up'); break;
      case 68: charWalk('right'); break;
      case 83: charWalk('down'); break;
      case 65: charWalk('left'); break;
    }
  }
})

$(document).keyup(function(e){

  //This make it so the bomberman keeps moving until the button down is released
  if (e.keyCode === currentKey){
    //This make it so a new key can be pressed after current key is released
    currentKey = false;

    clearInterval(timerWalk);

    $('#bomberman').stop(true,true)
  }
})

//This function will make the bomberman walk
function charWalk(dir){
  if (dir === 'up') dir = 'back';
  if (dir === 'down') dir = 'front';

  //Moves bomberman
  processWalk(dir);
  //Make him walk at a regular pace
  timerWalk = setInterval(function(){
    processWalk(dir);}, charSpeed);
}
