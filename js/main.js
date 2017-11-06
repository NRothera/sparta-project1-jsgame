// Global Variables ---------------------------------------------------------

window.onload=function(){
  drawMap()
  $('#bomberman').addClass('down');
}
var arrayIndex = 0
var currentKey;
var timerWalk;
var charStep = 2;
var charSpeed = 300;
var bomberman = $('#bomberman');
var currentPosition;
var positionLeft = $('#bomberman').position().left;
var positionTop = $('#bomberman').positionTop().top;
var boxWidth = 50;
var boxHeight = 50;
var mapHeight = 8;
var mapWidth = 8;







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
        $('#bomberman').animate({top: '+=12'}, charSpeed);
      }if (($('#bomberman').position().top < 100) && (!$(mapArray[0][2]).hasClass('grass'))){
        $('#bomberman').animate({top: '+=12'}, charSpeed)
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
      console.log(($('#bomberman').position().left))
    }
    break;
    case 'right':
    if ($('#bomberman').position().left <380){
      $('#bomberman').animate({left: '+=12'}, charSpeed);

      console.log(($('#bomberman').position().left))
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

function isBombermanAtColRow(col, row) {
	if(col >= 0 && col < boxWidth &&
		row >= 0 && row < boxHeight) {
		 var trackBombermanIndex = rowColToArrayIndex(col, row);
		 return mapArray[trackBombermanIndex];
	} else {
		return false;
	}
}

function bombermanTracker(){
  var bombermanTrackCol = Math.floor(positionLeft/mapWidth);
  var bombermanTrackRow = Math.floor(positionRight/mapHeight);
  var bombermanAtBox = rowColToArrayIndex(bombermanTrackCol, bombermanTrackRow)

  if (bombermanTrackCol >=0 && bombermanTrackCol < positionLeft && bombermanTrackRow >= 0 && bombermanTrackRow < positionTop){
    if (isBombermanAtColRow(bombermanTrackCol, bombermanTrackRow)) {
      mapArray(rowColToArrayIndex[bombermanTrackCol,bombermanTrackRow]) = 0;
    }
  }
}
