// Global Variables --------------------------------------------------------
$(function(){
  $(document).keydown(function(e){
    if (e.keyCode ===13){
      startGame()
      $('#instructions').hide()
      $('.scoreBoard').show()
      $('#block2').removeClass('breakable').addClass('grass')
    }
  })

  function startGame(){
    var startingTime = 30;
    var breakableIndexCurrent = 0;
    var player1Score = 0;
    var fromTop2 = 1;
    var fromLeft2 = 38;
    var index2 = 7;
    var fromLeft = 0;
    var fromTop = 1;
    var index = 0;
    var score = 0;
    var arrayIndex = 0;
    var currentKey;
    var timerWalk;
    var charStep = 2;
    var charSpeed = 200;
    var bomberman = $('#bomberman')
    var boxWidth = 40;
    var boxHeight = 40;
    var mapHeight = 8;
    var mapWidth = 8;
    var allIndexes = [0,1,2,3,4,5,6,
      7,8,9,10,11,12,13,14,15,16,17,
      18,19,20,21,22,23,24,25,26,27,
      28,29,30,31,32,33,34,35,36,37,
      38,39,40,41,42,43,44,45,46,47,
      48,49,50,51,52,53,54,55,56,57,
      58,59,60,61,62,63];
    var breakableIndex = [2,3,4,5,10,13,16,17,18,19,20,21,22,23,25,30,33,38,40,41,42,43,44,45,46,47,50,53,58,59,60,61]
    var grassIndex = [0,1,6,7,8,15,27,28,35,36,48,55,56,57,62,63]
    var unbreakableIndex = [9,11,12,14,24,26,29,31,32,34,37,39,49,51,52,54];

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

    // $('#bomberman').addClass('down');
    // $('#bomberman2').addClass('down');

    setInterval(function(){
      $('#timer').html("Time Left: " + startingTime)
      startingTime--;
      if (startingTime  === 0 && player1Score < 2000){
        $('#timer').attr('id', 'none');
        $('.lost-game').show();
        $(document).keydown(function(e){
          if (e.keyCode ===82){
            location.reload();
          }
        })
      }
    },1000)

    setTimeout(function(){
      $('#container').hide()
    },30*1000)

    function rowColToArrayIndex(col, row) {
    	return col + 8 * row;
    }

    function drawMap(){
      for (var eachRow = 0; eachRow < 8; eachRow++) {
        for (var eachCol = 0; eachCol < 8; eachCol++) {
          var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
          if (mapArray[arrayIndex] === 0) {
            $('#container').append('<div class="grass"></div>');
          }else if (mapArray[arrayIndex] === 1){
            $('#container').append('<div class="breakable" id= block'+breakableIndex[breakableIndexCurrent]+ '></div>');
            breakableIndexCurrent ++;
          }else if (mapArray[arrayIndex] === 2){
            $('#container').append('<div class="unbreakable" ></div>');
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
          fromTop ++;
          //If the player steps down into a new row, add 8 to the index
          if (fromTop % 5 === 0){
            index += 8;
          }
          console.log(index)
          isIndexBlock();
        }
        break;
        case 'back':
        if ($('#bomberman').position().top > 0){
          $('#bomberman').animate({top: '-=10'}, charSpeed);
          fromTop --
          //if the player steps up into a new row, take 8 off the index
          if (fromTop %5 === 4){
            index -=8
          }
          console.log(index)
          isIndexBlock();
          }
          break;
        case 'left':
        if ($('#bomberman').position().left >0){
          $('#bomberman').animate({left:'-=10'}, charSpeed);
          fromLeft --;
          //if the player steps left into a column, take 1 off the index
          if (fromLeft %5 === 4){
            index --;
          }
          console.log(index)
          isIndexBlock();
        }
        break;
        case 'right':
        if ($('#bomberman').position().left <380){
          $('#bomberman').animate({left: '+=10'}, charSpeed);
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

    //This function checks if the player has gone over a breakable block
    function isIndexBlock(){
      if (jQuery.inArray(index, breakableIndex)&& mapArray[index]===1){
        mapArray[index] = 0
        player1Score += 100
        $('#player1').html(player1Score)
        $('#block' +allIndexes[index]).removeClass('breakable').addClass('grass')
        $('#sound').show().hide()
        if (player1Score >= 2000){
          $('#container').hide()
          $('.won-game').show()
          $('#timer').attr('id', 'none')
          $(document).keydown(function(e){
            if (e.keyCode ===82){
              location.reload()
            }
          })
        }
      }
    }

    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
  drawMap();
  }
})
