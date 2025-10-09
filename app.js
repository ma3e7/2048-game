const scoreElement = document.querySelector("#score-tracker");
const popup = document.getElementById("popup-window");
const popupMessage = document.getElementById("popup-message");
const popupScore = document.getElementById("popup-score");
const keepPlayingBtn = document.getElementById("keep-playing");
const resetGameBtn = document.getElementById("reset-game");
const welcomePopup = document.getElementById("welcome-popup-window")
const resetGameBtnMainPage = document.getElementById("reset-button");
const playGameBtn = document.getElementById("play-button");
const playingBoard = document.querySelector(".board-container");
const highScoreElement = document.getElementById("highscore-tracker");


let gameOver = false;
let gameWon = false;
let score = 0;
let hasWonBefore = false;

let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

scoreElement.innerHTML = `Score: ${score}`;

const boardMatrix = [
    [
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
    ],
    [
        { id: 5, value: "" },
        { id: 6, value: "" },
        { id: 7, value: "" },
        { id: 8, value: "" },
    ],
    [
        { id: 9, value: "" },
        { id: 10, value: "" },
        { id: 11, value: "" },
        { id: 12, value: "" },
    ],
    [
        { id: 13, value: "" },
        { id: 14, value: "" },
        { id: 15, value: "" },
        { id: 16, value: "" },
    ],
];

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

keepPlayingBtn.addEventListener("click", () => {
    keepPlaying();
})

resetGameBtn.addEventListener("click", () => {
    resetGame();
});

resetGameBtnMainPage.addEventListener("click", () => {
    resetGame();
})

playGameBtn.addEventListener("click", () => {
    playGame()
})

function spawnRandomTile() {
    const emptyTiles = boardMatrix.flat().filter((tile) => tile.value === '');
    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.value = Math.random() < 0.9 ? 2 : 4;
}

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

function transpose(boardMatrixatrix) {
    const size = boardMatrixatrix.length;
    const newMatrix = Array.from({ length: size }, () => Array(size).fill(null));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newMatrix[i][j] = boardMatrixatrix[j][i];
        }
    }
    return newMatrix;
}

function calculateScore(combinedTilesValue) {
    score += combinedTilesValue;
    scoreElement.innerHTML = `Score: ${score}`;

    if (score > highScore) {
        highScore = score;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
        localStorage.setItem('highScore', highScore);
    }
}


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
    keepPlayingBtn.style.opacity = "0.6";
}

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

function playGame() {
    welcomePopup.style.visibility = "hidden";
    playingBoard.classList.add("visible");

    spawnRandomTile();
    spawnRandomTile();
    updateBoard();
}

function updateState() {
    spawnRandomTile();
    updateBoard();
}

function getTileColor(value) {
    switch (value) {
        case 2: return "#F7E8C4";    
        case 4: return "#D8B4A6";    
        case 8: return "#A5A58D";   
        case 16: return "#E3C9A8";  
        case 32: return "#BFA5A0";  
        case 64: return "#8CA6A3";   
        case 128: return "#F2D4C8"; 
        case 256: return "#D1B6E1"; 
        case 512: return "#C4DFAA";  
        case 1024: return "#F7BFA0"; 
        case 2048: return "#FFE156"; 
        default: return "#F0EAD6";  
    }
}