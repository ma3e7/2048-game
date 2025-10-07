const scoreElement = document.querySelector("#score-tracker");
const popup = document.getElementById("popup-window");
const popupMessage = document.getElementById("popup-message");
const popupScore = document.getElementById("popup-score");
const keepPlayingBtn = document.getElementById("keep-playing");
const resetGameBtn = document.getElementById("reset-game");
const resetGameBtnMainPage = document.getElementById("reset-button");

let gameOver = false;
let gameWon = false;
let score = 0;

scoreElement.innerHTML = `Score: ${score}`;

const boardMatrix = [
    [
        { id: 1, value: "1024" },
        { id: 2, value: "" },
        { id: 3, value: "1024" },
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
                spawnRandomTile();
                updateBoard();
                break;

            case "ArrowDown":
                var transposedMatrix = transpose(boardMatrix);
                transposedMatrix.forEach(row => {
                    row.reverse();
                    slideRowLeft(row);
                    row.reverse();
                })
                spawnRandomTile();
                updateBoard();
                break;
            case "ArrowLeft":
                boardMatrix.forEach(row => slideRowLeft(row));
                spawnRandomTile();
                updateBoard();
                break;
            case "ArrowRight":
                boardMatrix.forEach(row => {
                    row.reverse();
                    slideRowLeft(row);
                    row.reverse();
                });
                spawnRandomTile();
                updateBoard();
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
        htmlTile.style.color = tile.value <= 4 ? "#776e65" : "#f9f6f2";
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
}

function checkLoseCondition() {
    const emptyTiles = boardMatrix.flat().every(tile => tile.value !== "");
    if (!emptyTiles) return false;

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
    popupMessage.innerText = "You won!";
    popupScore.innerText = `Score: ${score}`;
    popup.style.visibility = "visible";
}

function gameIsLost() {
    gameOver = true;
    popupMessage.innerText = "Game Over!";
    popupScore.innerText = `Score: ${score}`;
    popup.style.visibility = "visible";
}

function keepPlaying() {
    if (score === 2048) {
        popup.style.visibility = "hidden";
        gameOver = false;
        gameWon = false;
    }

    keepPlayingBtn.disabled = true;
    keepPlayingBtn.style.cursor = "not-allowed";
    keepPlayingBtn.style.opacity = "0.6";
}


function resetGame() {
    boardMatrix.flat().forEach(tile => tile.value = "");
    score = 0;
    scoreElement.innerHTML = score;
    gameOver = false;
    gameWon = false;
    popup.style.visibility = "hidden"
    startGame()
}

function startGame() {
    spawnRandomTile();
    spawnRandomTile();
    updateBoard();
}

function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#cdc1b4";
    }
}

startGame();
