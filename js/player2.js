var currentKey2;
var Timerwalk2;
var charStep2 = 2;
var charSpeed2 = 300;
var player2Score = 0



$(document).keyup(function(m){

  if (m.keyCode == currentKey2){
    currentKey2 = false;
    clearInterval(Timerwalk2);
    $('#bomberman2').stop(true,true);
  }
});

function charWalk2(dir){
  if (dir == 'up') dir = 'back';
  if (dir == 'down') dir = 'front';

  processWalk(dir);

  Timerwalk2 = setInterval(function(){processWalk2(dir);}, charSpeed);
}


function isIndexBlock2(){
  if (jQuery.inArray(index2, breakableIndex)&& mapArray[index2]===1){
    mapArray[index2] = 0
    player2Score += 100
    $('#player2').html(player2Score)
    $('#block' +allIndexes[index2]).removeClass('breakable').addClass('grass')
    console.log(breakableIndex[index2])
    if (player2Score >= 2000){
      $('#container').hide()
      $('h1').html('Well done!!')
    }
  }
}
