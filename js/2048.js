$(document).ready(function() {
    startNewGame();
    $("#rButton").on("click", startNewGame);
    $(document).on("keydown", function(event){
        checkKeyPress(event.which);
    });
});

function resetBoard() {
    $("#gameBoard td").text("");
}

function randInteger(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

function getEmptyTileCoords() {
    let emptyTileArray = [];
    for (row = 0; row < 4; row++) {
        for (col = 0; col < 4; col++) {
            if ($(`#${row}${col}`).text() == "") {

                // pushing the indexes, not values
                emptyTileArray.push([row, col]);
            }
        }
    }
    return emptyTileArray;
}

function getTileArray() {
    let tileArray = [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
    ];
    for (row = 0; row < 4; row++) {
        for (col = 0; col < 4; col++) {
            let tileValue = $(`#${row}${col}`).text();
            tileArray[row][col] = tileValue;
        }
    }
    return tileArray;
}

function startNewGame() {
    resetBoard();
    spawnNewTile();
    spawnNewTile();
}

function spawnNewTile() {
    let emptyTileArray = getEmptyTileCoords();
    // if (emptyTileArray == []) {
    //     console.log("gameeee ovvverrrrr");
    //     gameOver();
    // }
    let randomTileCoords = emptyTileArray[randInteger(emptyTileArray.length)];

    // tile value is 2 90% of the time, or 4 10% of the time
    let newTileValue = randInteger(10) < 9 ? 2 : 4;
    $(`#${randomTileCoords[0]}${randomTileCoords[1]}`).text(newTileValue);
}

// function tileColorUpdate() {
//     let allTiles = $("#gameBoard td");
//     console.log(allTiles);
//     for (tile of allTiles) {
//         tileValue = tile.textContent;
//         tile.className = "blank";
//         console.log(tile);
//         if (tileValue != "") {
//             tile.classList.add(`tile-${tileValue}`);
//         }
//     }
//   //  return allTiles;
// }

// function gameOver() {
//     alert("No more legal moves! Please start a new game.");
// }

function checkKeyPress(keydown) {
    // KEYCODE DEPRECATED, FIX
    if (keydown == 37) {
        moveLeft();
    } else if (keydown == 38) {
        moveUp();
    } else if (keydown == 39) {
        moveRight();
    } else if (keydown == 40) {
        moveDown();
    }
}

function moveLeft() {
    console.log("to the left");
    let boardArray = getTileArray();
    // make this true if anything moves, avoid spawning pointless tiles
    let anythingMoved = false;

    for (row = 0; row < 4; row++) {
        for (col = 1; col < 4; col++) {
            if (boardArray[row][col] != "") {
                let collisionCoords = [row, col-1];
                while (boardArray[collisionCoords[0]][collisionCoords[1]] == "" && collisionCoords[1] != 0) {
                    collisionCoords[1]--;
                }
                if (boardArray[collisionCoords[0]][collisionCoords[1]] == "") {
                    boardArray[collisionCoords[0]][collisionCoords[1]] = boardArray[row][col];
                    boardArray[row][col] = "";
                    anythingMoved = true;
                } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != "") {
                    if (boardArray[collisionCoords[0]][collisionCoords[1]] == boardArray[row][col]) {
                        boardArray[collisionCoords[0]][collisionCoords[1]] *= 2;
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != boardArray[row][col]
                        && collisionCoords[1] != col-1
                    ) {
                        // evaluating left to right, so no need to check further left
                        boardArray[collisionCoords[0]][collisionCoords[1]+1] = boardArray[row][col];
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    }
                }
            }
        }
    }
    if (anythingMoved) {
        console.log("something moved!");
        updateHTMLBoard(boardArray);
        spawnNewTile();
    }
}

function updateHTMLBoard(board) {
    for (row = 0; row < 4; row++) {
        for (col = 0; col < 4; col++) {
            $(`#${row}${col}`).text(board[row][col]);
        }
    }
}

// evaluate top to bottom
function moveUp() {
    console.log("to the up");
    let boardArray = getTileArray();
    let anythingMoved = false;

    for (row = 1; row < 4; row++) {
        for (col = 0; col < 4; col++) {
            if (boardArray[row][col] != "") {
                let collisionCoords = [row-1, col];
                while (boardArray[collisionCoords[0]][collisionCoords[1]] == "" && collisionCoords[0] != 0) {
                    collisionCoords[0]--;
                }
                if (boardArray[collisionCoords[0]][collisionCoords[1]] == "") {
                    boardArray[collisionCoords[0]][collisionCoords[1]] = boardArray[row][col];
                    boardArray[row][col] = "";
                    anythingMoved = true;
                } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != "") {
                    if (boardArray[collisionCoords[0]][collisionCoords[1]] == boardArray[row][col]) {
                        boardArray[collisionCoords[0]][collisionCoords[1]] *= 2;
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != boardArray[row][col]
                        && collisionCoords[0] != row-1
                    ) {
                        // evaluating top to bottom, so no need to check further up
                        boardArray[collisionCoords[0]+1][collisionCoords[1]] = boardArray[row][col];
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    }
                }
            }
        }
    }
    if (anythingMoved) {
        console.log("something moved!");
        updateHTMLBoard(boardArray);
        spawnNewTile();
    }
}

// evaluate right to left
function moveRight() {
    console.log("to the right");
    let boardArray = getTileArray();
    let anythingMoved = false;

    for (row = 0; row < 4; row++) {
        for (col = 2; col >= 0; col--) {
            if (boardArray[row][col] != "") {
                let collisionCoords = [row, col+1];
                while (boardArray[collisionCoords[0]][collisionCoords[1]] == "" && collisionCoords[1] != 3) {
                    collisionCoords[1]++;
                }
                if (boardArray[collisionCoords[0]][collisionCoords[1]] == "") {
                    boardArray[collisionCoords[0]][collisionCoords[1]] = boardArray[row][col];
                    boardArray[row][col] = "";
                    anythingMoved = true;
                } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != "") {
                    if (boardArray[collisionCoords[0]][collisionCoords[1]] == boardArray[row][col]) {
                        boardArray[collisionCoords[0]][collisionCoords[1]] *= 2;
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != boardArray[row][col]
                        && collisionCoords[1] != col+1
                    ) {
                        // evaluating right to left, so no need to check further right
                        boardArray[collisionCoords[0]][collisionCoords[1]-1] = boardArray[row][col];
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    }
                }
            }
        }
    }
    if (anythingMoved) {
        console.log("something moved!");
        updateHTMLBoard(boardArray);
        spawnNewTile();
    }
}

// evaluate bottom to top
function moveDown() {
    console.log("to the down");
    let boardArray = getTileArray();
    let anythingMoved = false;

    for (row = 2; row >= 0; row--) {
        for (col = 0; col < 4; col++) {
            if (boardArray[row][col] != "") {
                let collisionCoords = [row+1, col];
                while (boardArray[collisionCoords[0]][collisionCoords[1]] == "" && collisionCoords[0] != 3) {
                    collisionCoords[0]++;
                }
                if (boardArray[collisionCoords[0]][collisionCoords[1]] == "") {
                    boardArray[collisionCoords[0]][collisionCoords[1]] = boardArray[row][col];
                    boardArray[row][col] = "";
                    anythingMoved = true;
                } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != "") {
                    if (boardArray[collisionCoords[0]][collisionCoords[1]] == boardArray[row][col]) {
                        boardArray[collisionCoords[0]][collisionCoords[1]] *= 2;
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    } else if (boardArray[collisionCoords[0]][collisionCoords[1]] != boardArray[row][col]
                        && collisionCoords[0] != row+1
                    ) {
                        // evaluating bottom to top, so no need to check further below
                        boardArray[collisionCoords[0]-1][collisionCoords[1]] = boardArray[row][col];
                        boardArray[row][col] = "";
                        anythingMoved = true;
                    }
                }
            }
        }
    }
    if (anythingMoved) {
        console.log("something moved!");
        updateHTMLBoard(boardArray);
        spawnNewTile();
    }
}

