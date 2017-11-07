var currentKey2;
var Timerwalk2;
var charStep2 = 2;
var charSpeed2 = 300;
var player2Score = 0


$(document).keydown(function(m){
  if (!currentKey2){
    currentKey2 = m.keyCode;

    switch (m.keyCode){
      case 38: charWalk2('up'); break;
      case 39: charWalk2('right'); break;
      case 40: charWalk2('down');break;
      case 37: charWalk2('left'); break;
    }
  }
});

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
function processWalk2(dir){
  charStep2 ++;
  if (charStep2 === 5) charStep2=1;

  $('#bomberman2').removeAttr('class');

  switch (charStep2) {
      case 1: $('#bomberman2').addClass(dir+'2'); break;
      case 2: $('#bomberman2').addClass(dir+'-one2'); break;
      case 3: $('#bomberman2').addClass(dir+'2'); break;
      case 4: $('#bomberman2').addClass(dir+'-two2');  break;
    }
    switch(dir) {
    case 'front':
    if ($('#bomberman2').position().top <370){
        $('#bomberman2').animate({top: '+=10'}, charSpeed);
        fromTop2 ++
        if (fromTop2 % 5 ===0){
          index2 +=8
        }
        isIndexBlock2()
      }
      break;
    case 'back':
      //don't let the character move any further up if they are already at the top of the screen
      if ($('#bomberman2').position().top > 0) {
        $('#bombermn2').animate({top: '-=10'}, charSpeed2);
        fromTop2 --
        console.log(fromTop2)
        if (fromTop2 % 5 === 4){
          index2 -=8
        }
        isIndexBlock2();
        console.log(index2)
      }
      break;
    case 'left':
    //don't let the character move any further left if they are already at the left side of the screen
    if ($('#bomberman2').position().left > 0) {
        $('#bomberman2').animate({left: '-=10'}, charSpeed2);
        fromLeft2 --
        console.log(fromLeft2)
        if (fromLeft2 %5 ===4){
          index2 --
        }
        console.log(index2)
        isIndexBlock2()
      }
      break;
    case 'right':
    if ($('#bomberman2').position().left <380){
      $('#bomberman2').animate({left: '+=10'}, charSpeed2);
      fromLeft2 ++
      console.log(fromLeft2)
      if (fromLeft%5===0){
        index2++
      }
      console.log(index2)
      isIndexBlock2
    }
      break;
    }
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
