$(document).ready(function(){
    // Initialize the game grid
    initializeGrid();

    // Add initial numbers
    addInitialNumbers();

    // Handle keydown events
    $(document).keydown(function(event){
        switch(event.key){
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

function addNewNumber(){
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if ($('#cell-' + i).text() === '') {
            emptyCells.push(i);
        }
    }
    if(emptyCells.length > 0){
        const randomCell = Math.floor(Math.random() * emptyCells.length);
        $('#cell-' + emptyCells[randomCell]).text(2);
    }
}

// Movement function
function moveUp(){
    console.log("Move Up");

}

function moveDown(){
    console.log("Move Down");

}

function moveLeft(){
    console.log("Move Left");

}

function moveRight(){
    console.log("Move Right");

}