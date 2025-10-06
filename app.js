const tiles = document.querySelectorAll('.tile');

const boardMatrix = [[{id:1, value:''}, {id:2, value:''}, {id:3, value:''}, {id:4, value:''}], 
                    [{id:5, value:''}, {id:6, value:''}, {id:7, value:''}, {id:8, value:''}], 
                    [{id:9, value:''}, {id:10, value:''}, {id:11, value:''}, {id:12, value:''}],
                    [{id:13, value:''}, {id:14, value:''}, {id:15, value:''}, {id:16, value:''}]]

console.log(boardMatrix[0][2].value);


document.addEventListener('keydown', (e) => {
    if (e.key.startsWith('Arrow')) {
        switch(e.key) {
            case 'ArrowUp':
                console.log('Arrow UP')
                break
            case 'ArrowDown': 
                console.log('arrow down')
                break
            case 'ArrowLeft':
                console.log('arrow left');
                break
            case 'ArrowRight': 
                console.log('aroow right');
                break
        }
    }
})

const randomiseStartingNumbers = Math.random() < 0.9 ? 2 : 4

const flatMatrix = boardMatrix.flat();

const emptyTiles = flatMatrix.filter(tile => tile.value === '');

const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

randomTile.value = randomiseStartingNumbers

console.log('Random tile:', randomTile);
console.log(boardMatrix);
