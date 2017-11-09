## Bomberman vs Crates

Bomberman vs Crates is a competitive two player game. The aim is to break more crates than your opponent in the time slot given. Whoever breaks more crates wins! You will need all your wits about you if you want to be the very best Bomberman you can be...

## Instructions

Use WASD to move around the board. You can only move on green tiles. Metal blocks will block your path and cannot be destroyed. Brown crates will stop you, use spacebar to blow those pesky blocks up!

## My Task

I wanted to try and recreate Bomberman as accurately as possible. At a minimum I wanted blocks to break on contact, and have points display for that. At maximum I wanted to be able to drop bombs that blew up the blocks after a time delay, blocks would stop you from moving through them and you would have powerups to increase your explosion and speed. I also wanted to have two players going against each other

## What I delivered

I managed to implement all User Stories, although not all sub requirements within them.
1. As a User I should be able to move around the screen
  * Move around the screen both with tapping keys and holding keys down
  * Blocks stop you and the map has borders you cannot walk through
2. As User I should be able to keep track of my score/tell when someone has won
  * On the right side of the screen scores are kept up to date for player 1 and player 2
  * At the end of the game the scores are kept on the right and a congratulations screen tell you who has won
3. As a User I should be able to knock down obstacles
  * Obstacles block your path and you have to press spacebar to knock them down. A small animation appears on the blocks you knock down, as well as an explosion sound
  * There is no delay on the explosion and it doesn't kill you, the player
4. As a User I should be able to play other people
 * The game is now a contest to see who can knock down the most blocks. Player two has a go after Player 1
 * The players cannot play at the same time. As issue occurred where only one key press is registered at a time so two players couldn't play.
 5. As a user I should be able to decide when the game starts/should see instructions
 * There is an instructions screen at the start of the game. You press enter to start the game when you are ready

## What I am most pleased about vs What was most Challenging

Collision. I am super happy and proud that I managed to work out collision between my character and the surrounding blocks. It's collision in a funny way, instead of the Bomberman Sprite sending me information about where he is, I instead created two variables, fromTop and fromLeft. It takes five steps to either move across or up and down a block. If you move up or down, the index changes by 8, if you move left or right the index changes by 1. By using this knowledge I could keep an accurate track of the characters movement, and therefore create a fake collision. This then also allowed me to create functions that would stop the character into moving through blocks I didn't want him moving through

I'm also pleased with how I have condensed my code into useable functions. I always understood functions but I was never very good at passing information across them. After this week I'm now much better at using them to pass information and therefore condense large sections of code which would otherwise be repeated.
