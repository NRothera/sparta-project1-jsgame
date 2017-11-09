$(function(){
  // Global Variables --------------------------------------------------------
  var gamesPlayed = 0;
  var startPage = new Audio('images/startPage.mp3');
  var wonGame = new Audio('images/won.mp3');
  var mainTheme = new Audio('images/background.mp3');
  var newPlayer = new Audio('images/ding.mp3');
  var startingTime = 70;
  var gameTime = 30;
  var breakableIndexCurrent = 0;
  var player1Score = 0;
  var finalScorePlayer1 = 0;
  var player2Score = 0;
  var fromLeft = 0;
  var fromTop = 1;
  var index = 0;
  var mapArrayIndex = 0;
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
  var breakableIndex = [2,3,4,5,10,13,16,17,18,19,20,21,22,23,25,30,33,38,40,41,42,43,44,45,46,47,50,53,58,59,60,61];
  var grassIndex = [0,1,6,7,8,15,27,28,35,36,48,55,56,57,62,63];
  var unbreakableIndex = [9,11,12,14,24,26,29,31,32,34,37,39,49,51,52,54];
  var mapArray = [
     0,0,1,1,1,1,0,0,
     0,2,1,2,2,1,2,0,
     1,1,1,1,1,1,1,1,
     2,1,2,0,0,2,1,2,
     2,1,2,0,0,2,1,2,
     1,1,1,1,1,1,1,1,
     0,2,1,2,2,1,2,0,
     0,0,1,1,1,1,0,0,
  ];
  var mapArray2 = [
     0,0,1,1,1,1,0,0,
     0,2,1,2,2,1,2,0,
     1,1,1,1,1,1,1,1,
     2,1,2,0,0,2,1,2,
     2,1,2,0,0,2,1,2,
     1,1,1,1,1,1,1,1,
     0,2,1,2,2,1,2,0,
     0,0,1,1,1,1,0,0,
  ];

  //Game running and map creation -------------------------------------------
  startPage.play()

  //Allows you to start the game by pressing the enter key
  function enterStart() {
    $(document).keydown(function(e) {
      if (e.keyCode ===13) {
        startPage.pause();
        mainTheme.play();
        startGame();
        $('#instructions').hide();
        $('.scoreBoard').show();
        drawMap();
        $('#block2').removeClass('breakable').addClass('grass');
      }
    });
  }

  //Where the game processes run
  function startGame() {
    //This sets the timer for each player. Once it reaches 0 it is the next players turn. After the next players turn it compares the score and tells you who won
    setInterval(function() {
      $('#timer').html("Time Left: " + gameTime);
      startingTime--;
      gameTime--;
      if (gameTime <3) {
        $('#bomberman').stop(true,true);
      }
      if (gameTime === 0 && gamesPlayed <2) {
        gameTwo();
      }
      if (gamesPlayed ===2) {
        hasWon();
      }
    }, 1000);
    //This make it so that the character can only walk in one direction at a time
    $(document).keyup(function(e) {
      //This make it so the bomberman keeps moving until the button down is released
      if (e.keyCode === currentKey) {
        //This make it so a new key can be pressed after current key is released
        currentKey = false;
        clearInterval(timerWalk);
        $('#bomberman').stop(true,true)
      }
    })
    // Character Movement. The charWalk function correlates to the processWalk function which uses the move functions to judge where the character is going, what's in his way and if he can destroy obstacles
    $(document).keydown(function(e) {
      if (!currentKey) {
        currentKey = e.keyCode;
        switch(e.keyCode) {
          case 87: charWalk('up'); break;
          case 68: charWalk('right'); break;
          case 83: charWalk('down'); break;
          case 65: charWalk('left'); break;
        }
      }
    });
  }

//Functions
// -----------------------------------------------------------------

  //returns index while map is being drawn
  function rowColToArrayIndex(col, row) {
    return col + 8 * row;
  };

  //Creates map by placing divs within the container
  function drawMap() {
    for (var eachRow = 0; eachRow < 8; eachRow++) {
      for (var eachCol = 0; eachCol < 8; eachCol++) {
        mapArrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (mapArray[mapArrayIndex] === 0) {
          $('#container').append('<div class="grass"></div>');
        } else if (mapArray[mapArrayIndex] === 1) {
          $('#container').append('<div class="breakable" id= block'+breakableIndex[breakableIndexCurrent]+ '></div>');
          breakableIndexCurrent ++;
        } else if (mapArray[mapArrayIndex] === 2) {
          $('#container').append('<div class="unbreakable" ></div>');
        }
      }
    }
  }

  //This make the sprite look like he's walking.
  //This is also where all walking functions occur such as direction, where the character is, where blocks can be broken
  function processWalk(dir) {
    charStep ++;
    if (charStep === 5) charStep = 1;
    //removes class
    $('#bomberman').removeAttr('class');
    //add class for direction moving
    switch(charStep) {
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
        leftMove();
      break;
      case 'right':
        rightMove();
      break;
    }
  }

  //This function sends direction inputs to processWalk
  function charWalk(dir) {
    if (dir === 'up') dir = 'back';
    if (dir === 'down') dir = 'front';
    //Moves bomberman
    processWalk(dir);
    //Make him walk at a regular pace
    timerWalk = setInterval(function() {
      processWalk(dir);
    }, charSpeed);
  }

  //Resets scores, variables and map for player 2 to take his turn
  function gameTwo() {
    gamesPlayed ++;
    gameTime += 10;
    if (gamesPlayed !=2) {
      newPlayer.play();
      $('#player2').html('0');
      $('#player2').show();
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
    mapArrayIndex = 0;
    breakableIndexCurrent = 0;
    drawMap();
    $('#block2').removeClass('breakable').addClass('grass');
    $('#bomberman').css('left', '0').css('top', '0');
  }

  //At the end, check which player has won, or if its a draw
  function hasWon() {
    mainTheme.pause();
    wonGame.play();
    $('#container').hide();
    $('#timer').hide();
    if (player2Score > finalScorePlayer1) {
      $('#player2Won').show();
      reloadPage();
    } else if (finalScorePlayer1> player2Score) {
      $('#player1Won').show();
      reloadPage();
    } else {
      $('#draw').show();
        reloadPage();
      }
    }

  //Adds to the player score if they destroy a block
  function winCheck(){
    $('#player1').html(player1Score);
    $('#player2').html(player2Score);
  }

  //Index update for moving right, block check for right
  function rightMove() {
    if ($('#bomberman').position().left <380) {
      $('#bomberman').animate({left: '+=10'}, charSpeed);
      fromLeft ++;
      if (fromLeft % 5 ===0) {
        stopMovementIfBlock(1, 'left','-=10');
      }
    }
  }

  //Index update for moving left, block check for left
  function leftMove() {
    if ($('#bomberman').position().left >0) {
      $('#bomberman').animate({left:'-=10'}, charSpeed);
      fromLeft --;
      if (fromLeft %5 === 4) {
        stopMovementIfBlock(-1, 'left','+=10')
      }
    }
  }

  //This function occurs for when the character moves down the screen
  function backMove() {
      if ($('#bomberman').position().top > 0) {
        $('#bomberman').animate({top: '-=10'}, charSpeed);
        fromTop --;
        //if the player steps up into a new row, take 8 off the index
        if (fromTop %5 === 4) {
          stopMovementIfBlock(-8, 'top','+=10');
        }
      }
    }

  //This function is for when the character moves up the screen
  function frontMove() {
    if ($('#bomberman').position().top < 370) {
      $('#bomberman').animate({top: '+=10'}, charSpeed);
      fromTop ++;
      if (fromTop % 5 === 0) {
        stopMovementIfBlock(8, 'top','-=10');
      }
    }
  }

  //If the character is moving into a non-grass block, stop him from moving
  function stopMovementIfBlock(indexNum, direction, movement) {
    if (jQuery.inArray(index + indexNum, breakableIndex) && mapArray[index+indexNum] === 1 || mapArray[index+indexNum] ===2) {
      $('#bomberman').stop(true,true);
      $('#bomberman').css(direction, movement);
      if (indexNum ===-1 ) {
        fromLeft ++;
      } else if (indexNum === -8) {
        fromTop ++;
      } else if (indexNum ===1) {
        fromLeft --;
      } else {
        fromTop --;
      }
      breakBox(indexNum);
    //If the player steps left into a new column, and there is no block in the way, take 1 from the index
    } else {
      index += indexNum;
    }
  }

  //This function occurs when the spacebar is pressed and one blocks on either side of the character can be broken
  function breakBox(indexAddition) {
    $(document).keydown(function(e) {
      if (e.keyCode ===32) {
        if (jQuery.inArray(index+indexAddition, breakableIndex) && mapArray[index+indexAddition] === 1) {
          $('#block'+allIndexes[index+indexAddition]).append("<span id=bomb><img src='images/bomb.png' alt=></span>");
          $('#bomb').show();
          setInterval(function() {
            $('#bomb').hide();
            $('#bomb').attr('id', 'none');
          }, 500);
          mapArray[index+indexAddition]=0;
          $('#block'+allIndexes[index+indexAddition]).removeClass('breakable').addClass('grass');
          player1Score += 100;
          player2Score += 100;
          var breakSound = new Audio('images/smash.mp3');
          breakSound.play();
          winCheck();
        }
      }
    });
  }

  //This stops the screen scrolling when using keyboard
  function stopScroll() {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  }

  //Once a game is over, allows you to refresh by pressing R
  function reloadPage() {
    $(document).keydown(function(e) {
      if (e.keyCode === 82) {
        location.reload();
      }
    });
  }

  enterStart()
  stopScroll()
})
