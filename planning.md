# Game Project: 2048 

## Description 

The game is played on 4x4 board. At the start of the game, there should be 2 randomly generated boxes, with numbers between 2 or 4, at two random positions on the board. Using the arrow keys on the keyboard, the player moves all of the boxes to one side of the board. When the boxes with the same values colide, they merge into one box that has sum of their values before coliding. If boxes that are coliding are not the same value, they do not merge, but rather they stack one next to another. When player manages to merge 2 boxes, the score counter tracks the points (to the existing it adds the values of the merged box). The player looses when they cannot make any more moves with the boxes. At the end player can see their score.

## Pseudocode 

### Folder structure:
* app.js
* index.html
* style.css
* README.md
* planning.md

### HTML 
* Code for the playing board

* Button for the game reset

* Score tracker

* Welcome panel

* Score panel at the end of the game with the try again button

### CSS
* Making the display grid 4x4

* Styling the board

* Stylying the blocks

* Styling the popup windows at the start and the end of the game

* Making the background darker when the popup show

* Making animations for the blocks moving across board

* Changing style of the blocks depending on the value 

### JS
* eventListener for arrow keys 

* Logic for moving the blocks across the board

* Logic for colision between  blocks

* Logic for when coliding blocks have same values

* Logic for when coliding blocks have different values

* Logic for adding the values of blocks when merging

* Logic for random generating blocks at the start of the game and during the game (on board fields that are free)

* Logic for asigning numbers to blocks

* Logic for score tracking

* Logic for checking if there are any more viable moves