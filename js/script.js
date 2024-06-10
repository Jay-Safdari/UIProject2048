$(document).ready(function() {
    // Initialize the game grid
    initializeGrid();

    // Add initial numbers
    addInitialNumber();

    // Handle keydown events
    $(document).keydown(function(event) {
        let moved = false;
        switch(event.key) {
            case "ArrowUp":
                moved = moveUp();
                break;
            case "ArrowDown":
                moved = moveDown();
                break;
            case "ArrowLeft":
                moved = moveLeft();
                break;
            case "ArrowRight":
                moved = moveRight();
                break;
        }
        if (moved) {
            addNewNumber();
            if (checkGameOver()) {
                setTimeout(() => {
                    alert("Game Over!");
                }, 1000);
            }
        }
    });
});

/**
 * Initializes the game grid by creating a 4x4 grid with unique IDs for each cell.
 */
function initializeGrid() {
    const gridContainer = $('#grid-container');
    for (let index = 0; index < 16; index++) {
        const gridCell = $('<div/>').addClass('grid-cell').attr('id', 'cell-' + index);
        gridContainer.append(gridCell);
    }
}

/**
 * Adds an initial number (2 or 4) to a random cell in the grid.
 */
function addInitialNumber() {
    const randomCell = Math.floor(Math.random() * 16);
    const initialValue = Math.random() < 0.80 ? 2 : 4;
    $('#cell-' + randomCell).text(initialValue).attr('class', 'grid-cell number-' + initialValue);
}

/**
 * Adds a new number (2 or 4) to a random empty cell in the grid.
 */
function addNewNumber() {
    let emptyCells = [];
    for (let i = 0; i < 16; i++) {
        if ($('#cell-' + i).text() === "") {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < 0.80 ? 2 : 4;
        $('#cell-' + randomIndex).text(newValue).attr('class', 'grid-cell number-' + newValue);
    }
}

/**
 * Moves the numbers in the grid upwards and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 0; row < 4; row++) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let row = 0; row < 4; row++) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[row] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[row] || "")
                .attr('class', 'grid-cell ' + (cells[row] ? 'number-' + cells[row] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid downwards and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 3; row >= 0; row--) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let row = 3; row >= 0; row--) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[3 - row] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[3 - row] || "")
                .attr('class', 'grid-cell ' + (cells[3 - row] ? 'number-' + cells[3 - row] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid to the left and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 0; col < 4; col++) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 0; col < 4; col++) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[col] || "")
                .attr('class', 'grid-cell ' + (cells[col] ? 'number-' + cells[col] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid to the right and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 3; col >= 0; col--) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 3; col >= 0; col--) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[3 - col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[3 - col] || "")
                .attr('class', 'grid-cell ' + (cells[3 - col] ? 'number-' + cells[3 - col] : ''));
        }
    }
    return moved;
}

/**
 * Merges adjacent cells with the same value in a single direction.
 * @param {Array} cells - Array of cell values to be merged.
 * @returns {Array} - Merged array with combined values and empty spaces.
 */
function merge(cells) {
    if (cells.length === 0) return cells;
    let merged = [];
    while (cells.length > 0) {
        if (cells.length > 1 && cells[0] === cells[1]) {
            let newValue = cells.shift() * 2;
            merged.push(newValue);
            cells.shift();
            if (newValue === 2048) { 
                setTimeout(() => { alert("Congratulations! You win!"); }, 100);
            }
        } else {
            merged.push(cells.shift());
        }
    }
    while (merged.length < 4) {
        merged.push("");
    }
    return merged;
}

/**
 * Checks if the game is over by determining if there are no empty cells and no possible merges.
 * @returns {boolean} - Returns true if the game is over, otherwise false.
 */
function checkGameOver() {
    // Check for any empty cells
    for (let i = 0; i < 16; i++) {
        if ($('#cell-' + i).text() === "") {
            return false;
        }
    }

    // Check for any possible merges
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let current = $('#cell-' + (row * 4 + col)).text();
            if (row > 0 && current === $('#cell-' + ((row - 1) * 4 + col)).text()) {
                return false;
            }
            if (row < 3 && current === $('#cell-' + ((row + 1) * 4 + col)).text()) {
                return false;
            }
            if (col > 0 && current === $('#cell-' + (row * 4 + col - 1)).text()) {
                return false;
            }
            if (col < 3 && current === $('#cell-' + (row * 4 + col + 1)).text()) {
                return false;
            }
        }
    }

    // No empty cells and no possible merges
    return true;
}
