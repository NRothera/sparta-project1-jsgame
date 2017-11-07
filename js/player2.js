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

  Timerwalk2 = setInterval(function(){processWalk2(dir);}, charSpeed);
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
