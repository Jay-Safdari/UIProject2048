$(document).ready(function(){

    // Initialize the score to 0
    let score = 0;
    
    // Start the the game by showing two cells
    showNewCell();
    showNewCell();

    // Re-start a new game when the button is clicked
    $("button").on("click", function(event){
        $(".cell").text("");
        score = 0;
        $("#score").text(score);
        showNewCell();
        showNewCell();
    })

    /* Listen to the key, and move right, left, up or down. 
    Then: display the score, check if 2048 is reached, and check if the game is over */
    $(document).on("keyup", function(event) {
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowDown":
                moveDown();
                break;
            default:
                break;
        }  

        // display the score
        $("#score").text(score); 

        // check if 2048 is reached
        if (score>=2048) alert ("Congratulations... You won!!!")

        // check if the game is over
        if (isGameOver()){
            alert("Game over!");
        } 
    });


    /**
     * Function allows to select randomly an empty cell, and displays "2" or "4" in it 
     */
        
    function showNewCell(){

        // initialize the array that will contain the IDs (#) of all the empty cells
        let emptyCells=[];

        // loop through the grid, and add the empty cells to the array
        for (let row=1;row<=4;row++){
            for (let col=1;col<=4;col++){
                let cellValue = $("#"+row+"-"+col).text();

                if (!cellValue){
                    emptyCells.push("#"+row+"-"+col);
                }
            }
        }

        // select an empty cell randomly in the array  
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomIndex];

        // assign a value to the selected cell (the value is "2" 90% of the time, and "4" 10% of the time)
        let newCellValue = randInteger(10) < 9 ? 2 : 4;
        $(randomCell).text(newCellValue);
    }


    /**
     * Function returns an integer between 0 and (upperBound-1) 
     * @param {integer} upperBound 
     * @returns {integer} integer between 0 and (upperBound-1)
     */
    function randInteger(upperBound) {
        return Math.floor(Math.random() * upperBound);
    }



    /**
     * Function that moves the cells to the left. 
     * While looping through the grid, there are two cases:
     * - case 1: the current cell is empty(it has no value) => do nothing
     * - case 2: the current cell has a value, and then we have 3 options:
     *    -- option 1: the closest cell on the left is empty => we simply move the current cell to take its place
     *    -- option 2: the closest cell on the left has the same value => we merge the two cells, and increment the result by (cellValue * 2)   
     *    -- option 3: the closest cell on the left has a different value => do nothing
     * After looping through the grid, if at least one move was made (options 1 and 2), 
     * it means that we can show a new cell by calling showNewCell() 
     */

    function moveLeft(){

        // count how many times a move occured
        let countMove =0;

        // loop through the whole grid except column 1 because its cells can't be moved to the left
        for (let row=1;row<=4;row++){
            for (let col=2;col<=4;col++){

                // determine the current cell's value
                let currCellValue = $("#"+row+"-"+col).text();

                // if the current cell has a value (case 2)
                if (currCellValue) {

                    // we loop through the cells on the left
                    for (let c=col-1; c>=1;c--){

                        // determine the left cell's value
                        let leftCellValue = $("#"+row+"-"+c).text();

                        if (!leftCellValue){
                        // if the left cell is empty (option 1), move the current cell to the left
                            $("#"+row+"-"+c).text(currCellValue); 
                            $("#"+row+"-"+(c+1)).text(""); 
                            countMove++;
                        } else if (leftCellValue==currCellValue){
                        // if the cell on the left has the same value (option 2), merge it with our cell, and increment the score
                            $("#"+row+"-"+c).text(currCellValue*2);
                            $("#"+row+"-"+(c+1)).text("");
                            score += currCellValue*2;   
                            countMove++;
                            break;
                        
                        } else {
                        // if the cell on the left has a different value (option 3), do nothing
                            break;
                        } 
                        
                    }
                }
            }
        }

        // if a move to the left is made, show a new cell
        if (countMove!=0) showNewCell();
    }



    /**
     * Function that moves the cells to the right. 
     * While looping through the grid, there are two cases:
     * - case 1: the current cell is empty(it has no value) => do nothing
     * - case 2: the current cell has a value, and then we have 3 options:
     *    -- option 1: the closest cell on the right is empty => we simply move the current cell to take its place
     *    -- option 2: the closest cell on the right has the same value => we merge the two cells, and increment the result by (cellValue * 2)   
     *    -- option 3: the closest cell on the right has a different value => do nothing
     * After looping through the grid, if at least one move was made (options 1 and 2), 
     * it means that we can show a new cell by calling showNewCell() 
     */

    function moveRight(){

        // count how many times a move occured
        let countMove =0;

        // loop through the whole grid except column 4 because its cells can't be moved to the right
        for (let row=1;row<=4;row++){
            for (let col=3;col>=1;col--){

                // determine the current cell's value
                let currCellValue = $("#"+row+"-"+col).text();

                // if the current cell has a value (case 2)
                if (currCellValue) {

                    // we loop through the cells on the right
                    for (let c=col+1; c<=4;c++){

                        // determine the right cell's value
                        let rightCellValue = $("#"+row+"-"+c).text();

                        if (!rightCellValue){
                        // if the right cell is empty (option 1), move the current cell to the right
                            $("#"+row+"-"+c).text(currCellValue); 
                            $("#"+row+"-"+(c-1)).text(""); 
                            countMove++;
                        } else if (rightCellValue==currCellValue){
                        // if the cell on the right has the same value (option 2), merge it with our cell, and increment the score
                            $("#"+row+"-"+c).text(currCellValue*2);
                            $("#"+row+"-"+(c-1)).text("");
                            score += currCellValue*2;   
                            countMove++;
                            break;
                        
                        } else {
                        // if the cell on the right has a different value (option 3), do nothing
                            break;
                        } 
                        
                    }
                }
            }
        }

        // if a move to the right is made, show a new cell
        if (countMove!=0) showNewCell();
    }



    /**
     * Function that moves the cells up. 
     * While looping through the grid, there are two cases:
     * - case 1: the current cell is empty(it has no value) => do nothing
     * - case 2: the current cell has a value, and then we have 3 options:
     *    -- option 1: the closest cell above is empty => we simply move the current cell to take its place
     *    -- option 2: the closest cell above has the same value => we merge the two cells, and increment the result by (cellValue * 2)   
     *    -- option 3: the closest cell above has a different value => do nothing
     * After looping through the grid, if at least one move was made (options 1 and 2), 
     * it means that we can show a new cell by calling showNewCell() 
     */

    function moveUp(){

        // count how many times a move occured
        let countMove =0;

        // loop through the whole grid except row 1 because its cells can't be moved up
        for (let col=1;col<=4;col++){
            for (let row=2;row<=4;row++){

                // determine the current cell's value
                let currCellValue = $("#"+row+"-"+col).text();

                // if the current cell has a value (case 2)
                if (currCellValue) {

                    // we loop through the cells above
                    for (let r=row-1; r>=1;r--){

                        // determine the above cell's value
                        let aboveCellValue = $("#"+r+"-"+col).text();

                        if (!aboveCellValue){
                        // if the above cell is empty (option 1), move the current cell up
                            $("#"+r+"-"+col).text(currCellValue); 
                            $("#"+(r+1)+"-"+col).text(""); 
                            countMove++;
                        } else if (aboveCellValue==currCellValue){
                        // if the cell on the above has the same value (option 2), merge it with our cell, and increment the score
                            $("#"+r+"-"+col).text(currCellValue*2);
                            $("#"+(r+1)+"-"+col).text("");
                            score += currCellValue*2;   
                            countMove++;
                            break;
                        
                        } else {
                        // if the cell above has a different value (option 3), do nothing
                            break;
                        } 
                    }
                }
            }
        }

        // if a move up is made, show a new cell
        if (countMove!=0) showNewCell();
    }



    /**
     * Function that moves the cells down. 
     * While looping through the grid, there are two cases:
     * - case 1: the current cell is empty(it has no value) => do nothing
     * - case 2: the current cell has a value, and then we have 3 options:
     *    -- option 1: the closest cell below is empty => we simply move the current cell to take its place
     *    -- option 2: the closest cell below has the same value => we merge the two cells, and increment the result by (cellValue * 2)   
     *    -- option 3: the closest cell below has a different value => do nothing
     * After looping through the grid, if at least one move was made (options 1 and 2), 
     * it means that we can show a new cell by calling showNewCell() 
     */
    function moveDown(){

        // count how many times a move occured
        let countMove =0;

        // loop through the whole grid except row 4 because its cells can't be moved down
        for (let col=1;col<=4;col++){
            for (let row=3;row>=1;row--){

                // determine the current cell's value
                let currCellValue = $("#"+row+"-"+col).text();

                // if the current cell has a value (case 2)
                if (currCellValue) {

                    // we loop through the cells below
                    for (let r=row+1; r<=4;r++){

                        // determine the value of the cell below
                        let downCellValue = $("#"+r+"-"+col).text();

                        if (!downCellValue){
                        // if the below cell is empty (option 1), move the current cell up
                            $("#"+r+"-"+col).text(currCellValue); 
                            $("#"+(r-1)+"-"+col).text(""); 
                            countMove++;
                        } else if (downCellValue==currCellValue){
                        // if the cell below has the same value (option 2), merge it with our cell, and increment the score
                            $("#"+r+"-"+col).text(currCellValue*2);
                            $("#"+(r-1)+"-"+col).text("");
                            score += currCellValue*2;   
                            countMove++;
                            break;
                        
                        } else {
                        // if the cell below has a different value (option 3), do nothing
                            break;
                        } 
                    }
                }
            }
        }

        // if a move up is made, show a new cell
        if (countMove!=0) showNewCell();
    }


    /**
     * Function checks if the game is over 
     * @returns {boolean} boolean indicating if the game is over
     */

    function isGameOver(){

        for (let row=1;row<=4;row++){
            for (let col=1;col<=4;col++){
                let cellValue = $("#"+row+"-"+col).text();

                // check if a cell is empty
                if (!cellValue) {
                    return false;
                } 

                // check if the cell on the right has the same value
                if (row < 4 && cellValue == $("#" + (row + 1) + "-" + col).text()) {
                    return false; 
                }

                // check if the cell below has the same value
                if (col < 4 && cellValue == $("#" + row + "-" + (col + 1)).text()) {
                    return false; 
                }

            }
        }

        return true;
    }


});

