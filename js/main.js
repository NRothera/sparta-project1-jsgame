// Global Variables --------------------------------------------------------
$(function(){
  var mainTheme = new Audio('images/background.mp3')
  mainTheme.loop = true;
  $(document).keydown(function(e){
    if (e.keyCode ===13){
      startGame()
      $('#instructions').hide()
      $('.scoreBoard').show()
      $('#block2').removeClass('breakable').addClass('grass')
    }
  })

  function startGame(){
    mainTheme.play()
    var gamesPlayed = 0;
    var breakSound = new Audio('images/smash.mov')
    var wonGame = new Audio('images/won.mp3')
    var startingTime = 30;
    var gameTime = 15;
    var breakableIndexCurrent = 0;
    var player1Score = 0;
    var finalScorePlayer1 = 0;
    var player2Score = 0;
    var finalScorePlayer2 = 0;
    var fromLeft = 0;
    var fromTop = 1;
    var index = 0;
    var score = 0;
    var arrayIndex = 0;
    var currentKey;
    var timerWalk;
    var charStep = 2;
    var charSpeed = 400;
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

    var mapArray2 = [
       0,0,1,1,1,1,0,0,
       0,2,1,2,2,1,2,0,
       1,1,1,1,1,1,1,1,
       2,1,2,0,0,2,1,2,
       2,1,2,0,0,2,1,2,
       1,1,1,1,1,1,1,1,
       0,2,1,2,2,1,2,0,
       0,0,1,1,1,1,0,0,
    ]

    //This sets the timer for each player. Once it reaches 0 it is the next players turn. After the next players turn it compares the score and tells you who won
    setInterval(function(){
      $('#timer').html("Time Left: " + gameTime)
      startingTime--;
      gameTime--
      if (gameTime === 0 && gamesPlayed <2){
        gameTwo()
      }
      if (gamesPlayed ===2){
        hasWon()
      }
    },1000);


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

      //move bomberman length and height of image, movement checks and block checks
      switch(dir){
        case 'front':
          frontMove();
        break;
        case 'back':
          backMove();
        break;
        case 'left':
          leftMove()
        break;
        case 'right':
          rightMove()
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

    //
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



    window.addEventListener("keydown", function(e) {
          // space and arrow keys
          if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
              e.preventDefault();
          }
      }, false);

    function gameTwo(){
      $('#bomberman').css('left', '0px').css('top', '0px')
      gamesPlayed ++
      gameTime += 15;
      $('#player2').show()
      if (gamesPlayed !=2){
        player2Score = 0;
        finalScorePlayer1 = player1Score;
        $('finalScore').html(finalScorePlayer1);
      }
      $('#player1').attr('id', 'finalScore');
      $('#container div').remove();
      mapArray = mapArray2;
      index=0;
      fromTop = 1;
      fromLeft = 0;
      arrayIndex = 0;
      breakableIndexCurrent = 0;
      drawMap()
      $('#block2').removeClass('breakable').addClass('grass')
    }

    //At the end, check which player has won, or if its a draw
    function hasWon(){
      $('#container').hide()
      $('#timer').hide()
      if (player2Score > finalScorePlayer1){
        $('#player2Won').show()
        $(document).keydown(function(e){
          if (e.keyCode === 82){
            location.reload()
          }
        })
      }else if (finalScorePlayer1> player2Score){
        $('#player1Won').show()
        $(document).keydown(function(e){
          if (e.keyCode === 82){
            location.reload()
          }
        })
      }else{
        $('#draw').show()
        $(document).keydown(function(e){
          if (e.keyCode === 82){
            location.reload()
          }
        })
      }
    }

    //Adds to the player score if they destroy a block
    function winCheck(){
          $('#player1').html(player1Score)
          $('#player2').html(player2Score)
        }

    //Index update for moving right, block check for right
    function rightMove(){
        if ($('#bomberman').position().left <380){
          $('#bomberman').animate({left: '+=10'}, charSpeed);
          fromLeft ++
          console.log(fromLeft)
          if (fromLeft % 5 ===0){
            //This stops the character from moving if he runs into a breakable block
            if (jQuery.inArray(index+1, breakableIndex)&&mapArray[index+1]===1 || mapArray[index+1] ===2){
              $('#bomberman').stop(true,true)
              $('#bomberman').css('left', '-=10')
              fromLeft --
              console.log(fromLeft)
              breakBox(1)
            //If the player steps right into a new column, and there is no block in the way, add 1 to index
            }else{
              index ++
            }
          }
        }
      }

    //Index update for moving left, block check for left
    function leftMove(){
        if ($('#bomberman').position().left >0){
          $('#bomberman').animate({left:'-=10'}, charSpeed);
          fromLeft --;
          console.log(fromLeft)
          if (fromLeft %5 === 4){
            //This stops the character from moving if he runs into a breakable block
            if (jQuery.inArray(index-1, breakableIndex)&&mapArray[index-1]===1 || mapArray[index-1] ===2){
              $('#bomberman').stop(true,true)
              $('#bomberman').css('left', '+=10')
              fromLeft ++

              breakBox(-1)
            //If the player steps left into a new column, and there is no block in the way, take 1 from the index
            }else{
              index --
            }
          }
        }
      }



    //Index update for moving
    function backMove(){
        if ($('#bomberman').position().top > 0){
          $('#bomberman').animate({top: '-=10'}, charSpeed);
          fromTop --
          console.log(fromTop)
          //if the player steps up into a new row, take 8 off the index
          if (fromTop %5 === 4){
            //This stops the character from moving if he runs into a breakable block
            if (jQuery.inArray(index-8, breakableIndex)&&mapArray[index-8]===1 || mapArray[index-8] ===2){
              $('#bomberman').stop(true,true)
              $('#bomberman').css('top', '+=10')
              fromTop ++
              console.log(fromTop)
              breakBox(-8)
            //If the player steps up into a new row, and there is no block in the way, take away 8 to index
            }else{
              index -=8
            }
          }
        }
      }

    function frontMove(){
      if ($('#bomberman').position().top < 370){
        $('#bomberman').animate({top: '+=10'}, charSpeed);
        fromTop ++;
        console.log(fromTop)

        if (fromTop % 5 === 0){
          //This stops the character from moving if he runs into a breakable block
          if(jQuery.inArray(index+8, breakableIndex)&& mapArray[index+8]===1 || mapArray[index+8] ===2){
            $('#bomberman').stop(true,true)
            $('#bomberman').css('top', '-=10')
            fromTop --
            console.log(fromTop)
            breakBox(8)
          //If the player steps down into a new row, and there is no block in the way, add 8 to index
          }else{
            index+=8

          }
        }

      }
    }

    function breakBox(indexAddition){
      $(document).keydown(function(e){
        if (e.keyCode ===32){
          if (jQuery.inArray(index+ indexAddition, breakableIndex)&&mapArray[index+indexAddition]===1){
            mapArray[index+indexAddition]=0;
            $('#block'+allIndexes[index+indexAddition]).removeClass('breakable').addClass('grass')
            player1Score += 100
            player2Score += 100
            breakSound.play()
            winCheck()
          }
        }
      })
    }
    drawMap();
  }
})
