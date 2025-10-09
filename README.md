# Game: 2048
## Description
**2048** is a game where the goal is to combine numbered tiles on a 4x4 grid to create a tile with the number 2048. Once the player creates a 2048 tile, they can choose to keep playing or reset the game and start over.

I chose this game as my project because it presented an exciting challenge and gave me the opportunity to deepen my understanding of JavaScript, DOM manipulation, and game logic while creating something interactive and fun.

## Deployment Link

## Technologies Used

***HTML*** - used for creating main board, welcome and game over messages

***CSS*** - used for styling the windows and playing board

***Javascript*** - used for background logic

## Resources Used

* [Font: Montserrat](https://fonts.google.com/specimen/Montserrat)
* [Icons](https://www.flaticon.com/free-icons/go-back)

## Game Flow

![Welcome window](./assets%20/welcome-window-ss.png)
When the page loads the player is met with the welcome window, which gives short instructions on how to play the game. After pressing the button "Play", board loads and player can play the game. 

![Playing board](./assets%20/game-board-ss.png)

The player moves the tiles by pressing the arrow keys:
* ↑ (Up Arrow): Moves all tiles upward

* ↓ (Down Arrow): Moves all tiles downward

* ← (Left Arrow): Moves all tiles to the left

* → (Right Arrow): Moves all tiles to the right

When two tiles with the same number collide, they merge into one and their values add up.

![Game over screen](./assets%20/game-end-ss.png)

When there are no more possible moves, the game is over and the final score is displayed. Player can play again.

## Game Logic

```
let gameOver = false;
let gameWon = false;
let score = 0;
let hasWonBefore = false;
```
These variables are used for tracking the state of the game. hasWonBefore is used to track if the player had already reached winning point once before (merged tiles into a 2048 one), so if they continue playing and manage to do it once more, the popup window for game winning wont show again.
```
document.addEventListener("keydown", (e) => {
    if (e.key.startsWith("Arrow")) {
        switch (e.key) {
            case "ArrowUp":
                var transposedMatrix = transpose(boardMatrix);
                transposedMatrix.forEach(row => slideRowLeft(row))
                updateState() 
                break;

            case "ArrowDown":
                var transposedMatrix = transpose(boardMatrix);
                transposedMatrix.forEach(row => {
                    row.reverse();
                    slideRowLeft(row);
                    row.reverse();
                })
                updateState() 
                break;
            case "ArrowLeft":
                boardMatrix.forEach(row => slideRowLeft(row));
                updateState() 
                break;
            case "ArrowRight":
                boardMatrix.forEach(row => {
                    row.reverse();
                    slideRowLeft(row);
                    row.reverse();
                });
                updateState()
                break;
        }
    }
});
```
This is the listener for the arrow key presses. The function checks which keys are being pressed and then calls the corresponding function for moving the tiles. When moving tiles to the right side of the board, the boardMatrix is reversed and then passed to the function for sliding tiles. In cases for moving tiles up and down, before passing the rows to the move function, the boardMatrix is transposed. After the tiles are moved the new tiles are generated. 

```
function spawnRandomTile() {
    const emptyTiles = boardMatrix.flat().filter((tile) => tile.value === '');
    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.value = Math.random() < 0.9 ? 2 : 4;
}
```
The spawnRandomTile function checks for empty tiles and stores them into a new array. From that array it takes one random tile and generates a random value, either 2 (90% chance) or 4 (10% chance), which it then stores in the selected tile. 

```
function updateBoard() {
    boardMatrix.flat().forEach((tile) => {
        const htmlTile = document.getElementById(tile.id);

        htmlTile.innerText = tile.value === "" ? "" : tile.value;
        htmlTile.style.backgroundColor = getTileColor(tile.value);
        htmlTile.style.color = tile.value <= 16 ? "#4B3F72" : "#2C2A4A";


    });

    if (!gameOver && !gameWon) {
        checkLoseCondition();
    }
}
```
The updateBoard function goes through the matrix and checks tile values. If the tile has a value, it displays it in the HTML; otherwise, it leaves it empty. At the end it checks if the game is over.

```
function slideRowLeft(row) {
    let values = row.map(tile => tile.value).filter(v => v !== '');
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] === values[i + 1]) {
            values[i] *= 2;
            if (values[i] === 2048) gameIsWon();
            calculateScore(values[i]);
            values[i + 1] = '';
        }
    }

    values = values.filter(v => v !== '');
    while (values.length < 4) values.push('');
    for (let i = 0; i < 4; i++) {
        row[i].value = values[i];
    }
}
```
The slideRowLeft function filters out all empty tiles, then checks if neighboring cells in the row have the same number. If they do, their values are added together. If the new tile has the value of 2048 it trigures function for winning the game. With each merged tile, the score is updated. At the end, the rest of the boardMatrix is filled with empty spaces.
```
function calculateScore(combinedTilesValue) {
    score += combinedTilesValue;
    scoreElement.innerHTML = `Score: ${score}`;

    if (score > highScore) {
        highScore = score;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
        localStorage.setItem('highScore', highScore);
    }
}
```
This function calculates the score and the highscore and sets those values in HTML elements.

```
function checkLoseCondition() {
    const allFilledTiles = boardMatrix.flat().every(tile => tile.value !== "");
    if (!allFilledTiles) return false;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const current = boardMatrix[i][j].value;
            if (
                (i < 3 && current === boardMatrix[i + 1][j].value) ||
                (j < 3 && current === boardMatrix[i][j + 1].value)
            ) {
                return false;
            }
        }
    }
    gameIsLost();
    return true;
}
```
First checks if the boardMatrix is all filled in, if it is then it goes through the matrix and check adjacent tiles: one on the right and one below it. If they can't merge the game is lost. 

```
function gameIsWon() {
    if (!hasWonBefore) {  
        gameWon = true;
        hasWonBefore = true;
        popupMessage.innerText = "You won!";
        popupScore.innerText = `Score: ${score}`;
        popup.style.visibility = "visible";

        keepPlayingBtn.disabled = false;
        keepPlayingBtn.style.cursor = "pointer";
        keepPlayingBtn.style.opacity = "1";
    }
}

function gameIsLost() {
    gameOver = true;
    popupMessage.innerText = "Game Over!";
    popupScore.innerText = `Score: ${score}`;
    popup.style.visibility = "visible";

    keepPlayingBtn.disabled = true;
    keepPlayingBtn.style.opacity = "0.7";
}
```
These functions show the popup window for winning or losing the game. Window shows the score and give choices to play again, if the player got 2048 tile, or play again. 

```
function keepPlaying() {
    popup.style.visibility = "hidden";
    gameOver = false;
    gameWon = false;

    keepPlayingBtn.disabled = true;
    keepPlayingBtn.style.opacity = "0.6";
}

function resetGame() {
    boardMatrix.flat().forEach(tile => tile.value = "");
    score = 0;
    scoreElement.innerHTML = `Score: ${score}`;
    gameOver = false;
    gameWon = false;
    hasWonBefore = false;  
    popup.style.visibility = "hidden";
    playGame();
}
```
These functions are called at the end of the game by pressing one of two buttons in the popup window. resetGame clears out all tiles and sets other values for new round of the game

## Next Steps 

* Adding animations for sliding tiles over the board and for when new tile is generated or merged.
* Adding a back button so players can undo a few moves while playing.
* Adding a swap option, where players can choose which two adjacent tiles to swap once per game.
* Adding game modifiers to make the game more interesting.