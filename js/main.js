// Global Variables ---------------------------------------------------------
window.onload=function(){
  $('#bomberman').addClass('down');
  drawMap()
}
var player1Score = 0
var fromLeft = 0;
var fromTop = 0;
var index = 0
var score = 0
var arrayIndex = 0
var currentKey;
var timerWalk;
var charStep = 2;
var charSpeed = 300;
var bomberman = $('#bomberman');
var currentPosition;
var positionLeft = 0;
var positionTop = 0;
var boxWidth = 40;
var boxHeight = 40;
var mapHeight = 8;
var mapWidth = 8;
var breakableIndex = [2,3,4,5,10,13,16,17,18,19,20,21,22,23,25,30,33,38,40,41,42,43,44,45,46,47,50,53,58,59,60,61]
var grassIndex = [0,1,6,7,8,15,27,28,35,36,48,55,56,57,62,63]
var unbreakableIndex = [9,11,12,14,24,26,29,31,32,34,37,39,49,51,52,54]


//Map creation ---------------------------------------------------------
var mapArray = [
   0,0,1,1,1,1,0,0,
   0,2,1,2,2,1,2,0,
   1,1,1,1,1,1,1,1,
   2,1,2,0,0,2,1,2,
   2,1,2,0,0,2,1,2,
   1,1,1,1,1,1,1,1,
   0,2,1,2,2,1,2,0,
   0,0,1,1,1,1,0,0,
]

function rowColToArrayIndex(col, row) {
	return col + 8 * row;
}

function drawMap(){
  for (var eachRow = 0; eachRow < 8; eachRow++) {
    for (var eachCol = 0; eachCol < 8; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow)
      if (mapArray[arrayIndex] === 0) {
        $('#container').append('<div class="grass"></div>');
      }else if (mapArray[arrayIndex] === 1){
        $('#container').append('<div class="breakable"></div>')
      }else if (mapArray[arrayIndex] === 2){
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
      $('#bomberman').animate({top: '+=10'}, charSpeed);
      fromTop ++
      if (fromTop % 5 === 0){
        index += 8;
      }
      console.log(index)
      isIndexBlock()
    }
    break;
    case 'back':
    if ($('#bomberman').position().top > 0){
      $('#bomberman').animate({top: '-=10'}, charSpeed);
      fromTop --
      if (fromTop %5 === 4){
        index -=8
      }
      isIndexBlock()
      console.log(index)
      }
      break;
    case 'left':
    if ($('#bomberman').position().left >0){
      $('#bomberman').animate({left:'-=10'}, charSpeed);
      positionLeft = $('#bomberman').position().left
      fromLeft --
      if (fromLeft %5 === 4){
        index --
      }
      console.log(index)
      isIndexBlock()
    }
    break;
    case 'right':
    if ($('#bomberman').position().left <380){
      $('#bomberman').animate({left: '+=10'}, charSpeed);
      positionLeft = $('#bomberman').position().left
      fromLeft ++
      if (fromLeft % 5 ===0){
        index ++
      }
      console.log(index)
      isIndexBlock()
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

function isIndexBlock(){
  if (jQuery.inArray(index, breakableIndex)&& mapArray[index]===1){
    mapArray[index] = 0
    player1Score += 100
    $('#player1').html(player1Score)
  }
  drawMap()
}
