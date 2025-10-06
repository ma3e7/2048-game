const tiles = document.querySelectorAll(".tile");

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
                console.log("Arrow UP");
                spawnRandomTile();
                updateBoard();
                break;

            case "ArrowDown":
                console.log("arrow down");
                break;
            case "ArrowLeft":
                console.log("arrow left");
                boardMatrix.forEach(row => slideRowLeft(row));
                spawnRandomTile();
                updateBoard();
                break;
            case "ArrowRight":
                console.log("arrow right");
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

function spawnRandomTile() {
    const emptyTiles = boardMatrix.flat().filter((tile) => tile.value === '');
    
    console.log('EMPTY tiles: ', emptyTiles);
    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.value = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
    boardMatrix.flat().forEach((tile) => {
        const htmlTile = document.getElementById(tile.id);
        htmlTile.innerText = tile.value === "" ? "" : tile.value;
    });
}

function slideRowLeft(row) {
    let values = row.map(tile => tile.value).filter(v => v !== '');
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] === values[i + 1]) {
            values[i] *= 2;
            values[i + 1] = '';
        }
    }

    values = values.filter(v => v !== '');

    while (values.length < 4) values.push('');

    for (let i = 0; i < 4; i++) {
        row[i].value = values[i];
    }
}


spawnRandomTile();
spawnRandomTile();
updateBoard();

console.log(boardMatrix);
