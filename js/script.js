$(document).ready(function(){
    // Initialize the game grid
    initializeGrid();

    // Add initial numbers
    addInitialNumbers();
})

function initializeGrid(){
    const gridContainer = $('#grid-container');
    for (let i = 0; i < 9; i++) {
        const gridCell = $('<div/>').addClass('grid-cell').attr('id', 'cell-' + i);
        gridContainer.append(gridCell);    
    }
}

function addInitialNumbers(){
    
    const randomCell = Math.floor(Math.random() * 9);

    $('#cell-' + randomCell).text(2);
}