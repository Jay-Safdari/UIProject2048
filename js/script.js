$(document).ready(function () {
    // Initialize the game grid
    initializeGrid();

    // Add initial numbers
    addInitialNumbers();

    // Handle keydown events
    $(document).keydown(function (event) {
        switch (event.key) {
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }

        addNewNumber();
    });
});

function initializeGrid() {
    const gridContainer = $('#grid-container');
    for (let i = 0; i < 9; i++) {
        const gridCell = $('<div/>').addClass('grid-cell').attr('id', 'cell-' + i);
        gridContainer.append(gridCell);
    }
}

function addInitialNumbers() {

    const randomCell = Math.floor(Math.random() * 9);

    $('#cell-' + randomCell).text(2);
}

function addNewNumber() {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if ($('#cell-' + i).text() === '') {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = Math.floor(Math.random() * emptyCells.length);
        $('#cell-' + emptyCells[randomCell]).text(2);
    }
}

// Movement function
function moveUp() {
    for (let col = 0; col < 3; col++) {
        let cells = [];
        for (let row = 0; row < 3; row++) {
            let cell = $('#cell-' + (row * 3 + col)).text();
            if (cell !== '') {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let row = 0; row < 3; row++) {
            $('#cell-' + (row * 3 + col)).text(cells[row] || "");
        }
    }


}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 3; col++) {
        let cells = [];
        for (let row = 2; row >= 0; row--) {
            let cell = $('#cell-' + (row * 3 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let row = 2; row >= 0; row--) {
            if ($('#cell-' + (row * 3 + col)).text() !== (cells[2 - row] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 3 + col)).text(cells[2 - row] || "");
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < 3; row++) {
        let cells = [];
        for (let col = 0; col < 3; col++) {
            let cell = $('#cell-' + (row * 3 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 0; col < 3; col++) {
            if ($('#cell-' + (row * 3 + col)).text() !== (cells[col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 3 + col)).text(cells[col] || "");
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < 3; row++) {
        let cells = [];
        for (let col = 2; col >= 0; col--) {
            let cell = $('#cell-' + (row * 3 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 2; col >= 0; col--) {
            if ($('#cell-' + (row * 3 + col)).text() !== (cells[2 - col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 3 + col)).text(cells[2 - col] || "");
        }
    }
    return moved;
}

function merge(cells) {
    if (cells.length === 0) {
        return cells;
    }
    let merged = [];
    while (cells.length > 0) {
        if (cells.length > 1 && cells[0] === cells[1]) {
            merged.push(cells.shift() * 2);
            cells.shift();
        } else {
            merged.push(cells.shift());
        }
    }
    while (merged.length < 3) {
        merged.push("");
    }
    return merged;
}