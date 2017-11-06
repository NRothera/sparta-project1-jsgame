window.onload=function(){
  $('#bomberman2').addClass('down');
}

var currentKey;
var timerWalk;
var charSpeed = 300;
var bomberman = $('#bomberman2');

function processWalk(dir){
  charStep ++;
  if (charStep === 5) charStep = 1;

  //removes class
  $('#bomberman2').removeAttr('class');

  //add class for direction moving
  switch(charStep){
    case 1: $('#bomberman2').addClass(dir); break;
    case 2: $('#bomberman2').addClass(dir + '-one'); break;
    case 3: $('#bomberman2').addClass(dir); break;
    case 4: $('#bomberman2').addClass(dir + '-two'); break;
  }

  //move bomberman length and height of image
  switch(dir){
    case 'front':
    if ($('#bomberman2').position().top < 370){
      $('#bomberman2').animate({top: '+=10'}, charSpeed);
      fromTop ++
      //If the player steps down into a new row, add 8 to the index
      if (fromTop % 5 === 0){
        index += 8;
      }
      console.log(index)
      isIndexBlock()
    }
    break;
    case 'back':
    if ($('#bomberman2').position().top > 0 && mapArray[index]===0){
      $('#bomberman2').animate({top: '-=10'}, charSpeed);
      fromTop --
      //if the player steps up into a new row, take 8 off the index
      if (fromTop %5 === 4){
        index -=8
      }
      isIndexBlock()
      console.log(index)
      }
      break;
    case 'left':
    if ($('#bomberman2').position().left >0 && mapArray[index]===0){
      $('#bomberman2').animate({left:'-=10'}, charSpeed);
      fromLeft --
      //if the player steps left into a column, take 1 off the index
      if (fromLeft %5 === 4){
        index --
      }
      console.log(index)
      isIndexBlock()
    }
    break;
    case 'right':
    if ($('#bomberman2').position().left <380 && mapArray[index]===0){
      $('#bomberman2').animate({left: '+=10'}, charSpeed);
      fromLeft ++
      //if player steps right into a column, add 1 to the index
      if (fromLeft % 5 ===0){
        index ++
      }
      console.log(index)
      isIndexBlock()
    }
    break;
  }
}

(document).keydown(function(e){
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
    $('#bomberman2').stop(true,true)
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
    player2Score += 100
    $('#player2').html(player1Score)
    $('#block' +allIndexes[index]).removeClass('breakable').addClass('grass')
    console.log(breakableIndex[index])
    if (player2Score >= 2000){
      $('#container').hide()
      $('h1').html('Well done!!')
    }
  }
}
