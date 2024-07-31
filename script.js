    // TODO:
        // Add a button that Starts/Restarts the game.
            // Disable button if round is in progress.
        // Add way for players to enter their names.

    // We only need one gameboard. We'll use an IIFE.
    const GameController = (function (playerOne, playerTwo) {

        // Store player obects within a dictionary.
        const players = [{player: playerOne,
                          marker: "O",
                         },
                         {player: playerTwo,
                          marker: "X",
                         }];

        // Need a way to set the active player as Player 1 or Player 2.
        let activePlayer = players[0];

        const setActivePlayer = () => {
            activePlayer = activePlayer == players[0] ? players[1] : players[0];
            return activePlayer;
        }

        const getActivePlayer = () => {
            return activePlayer;
        }

        // Function that initiates a turn.
        const playTurn = (row, column) => {
            console.log(`It's now ${activePlayer.player.name}'s turn.`);
            console.log(row, column);

        // Need to check if space is already occupied.
            if(GameBoard.getQuadrant(row, column) != null) {
                console.log("That spot is already taken.");
                return;
            }

            GameBoard.setQuadrant(row, column, activePlayer.marker);
            // Check for a winner here.
            checkWinTie();
            setActivePlayer();
        }

        // Check for a winner or a tie.
        const checkWinTie = () => {
            console.log(GameBoard.getBoard());

            // NOTE: The return keyword must be included with curly braces in an arrow function. Returns undefined if return keyword is not included with curly braces. Braces and return keyword not needed with one statement.
            // Iterates through each row, checking to see if all marks are either "O" or "X." Checks horizontally.
            GameBoard.getBoard().forEach((row) => {if(row.every(element => element == activePlayer.marker)) {
                console.log("Win");
                GameController.isGameFinished = true;
                return;
                }
            });

            // Need to check if indices of each row contain the same marker: board[0][0] == board[1][0] == board[2][0]. Checks vertically.
            GameBoard.getBoard().keys().forEach((key) => {if(GameBoard.getBoard().map((row) => (row[key])).every((marker) => marker == activePlayer.marker)) {
                console.log("Win");
                GameController.isGameFinished = true;
                return;
                }
            });

            // Need to check diagonally.
            if(GameBoard.getBoard().keys().map((key) => GameBoard.getBoard()[key][key]).every((marker) => marker == activePlayer.marker) || GameBoard.getBoard().keys().map((key) => GameBoard.getBoard().toReversed()[key][key]).every((marker) => marker == activePlayer.marker)) {
                console.log("Win");
                GameController.isGameFinished = true;
                return;
            };

            // Need to check for a tie. If none of the spaces include null and all of the prior winning conditions were not met, then they must all be populated with a marker.
            if(GameBoard.getBoard().every((row) => row.includes(null) != true)) {
                console.log("Tie");
                GameController.isGameFinished = true;
                return;
            };

        }

        // Boolean to track whether or not game is completed.
        const isGameFinished = false;

        return { playTurn, getActivePlayer, isGameFinished };
    })(createPlayer(prompt("Please enter your name: ", "Player 1" )), createPlayer(prompt("Please enter your name: ", "Player 2" )));

const GameBoard = (function () {
    // A tic tac toe board can be represented as three rows and three comlumns.
    // Create Board with arrays. Each array inside of the main array represents a row and each of the elements in those arrays are the columns.
    const board = [[null, null, null], [null, null, null], [null, null, null]];

    // Need a way to manipulate the data in each of the quadrants.
    const setQuadrant = (row, column, marker) => {
            return board[row][column] = marker;
        }

    const getQuadrant = (row, column) => {
        return board[row][column];
    }

    // Get current state of the board. Does not display it.
    const getBoard = () => {
        return board;
    }

    // Board needs to have a way to reset itself for a new game.

    const clearBoard = () => {
        board.map((row) => {
            // Fill every space of the inner arrays with null.
            row.fill(null);
        });
    }

    return { setQuadrant, getQuadrant, getBoard, clearBoard };

})();

function createPlayer(name) {

    // let name = prompt("Please enter your name: ", "Player" )

    return { name };
}

function DOMController() {
    const board = document.getElementById("board");

    const startResetButton = document.createElement("button");
    startResetButton.setAttribute("type", "button");
    startResetButton.setAttribute("id", "startResetButton");
    startResetButton.innerText = "Start Round";
    startResetButton.addEventListener("click", () => {
        if(GameController.isGameFinished){
            GameBoard.clearBoard();
            updateDOMDisplay(GameBoard.getBoard().entries());
            startResetButton.innerText = "Round in Progress.";
            GameController.isGameFinished = false;
        }
        else{

        }
    });

    board.after(startResetButton);

    // Use the Array's entries method, which returns an iterator object. This will allow us to retrieve each row along with its corresponding index number.
    for(const [rowIndex, row] of GameBoard.getBoard().entries()) {
        const rowElement = document.createElement("div");
        rowElement.setAttribute("class","row");
        // Use entries again on each of the arrays. This will return a space within each array that is mapped to its index number.
        for(const [columnIndex, space] of row.entries()){
            const spaceElement = document.createElement("div");
            spaceElement.setAttribute("class","space");
            // Use the index number obtained earlier to set the row number of each of the spaces in the first row. This is followed by setting the space's column as well.
            spaceElement.setAttribute("data-row-number", rowIndex);
            spaceElement.setAttribute("data-column-number", columnIndex);
            // Populate the each space with the initial value of the board, which should be empty.
            spaceElement.innerText = space;
            rowElement.appendChild(spaceElement);
        }
        board.appendChild(rowElement);
    };

    board.addEventListener("click", (ev) => {
        console.log(ev.target);

        // Handles cases where players click on the boarder of the Gameboard.
        if(ev.target.id == "board" || ev.target.className == "row"){
            return;
        }

        // Prevents any additional marks to the board if a player has won.
        if(GameController.isGameFinished){
            return;
        }

        GameController.playTurn(ev.target.dataset.rowNumber, ev.target.dataset.columnNumber);
        updateDOMDisplay(GameBoard.getBoard().entries());

        if(GameController.isGameFinished){
            startResetButton.innerText = "Play Again?";
        }
    });

    const updateDOMDisplay = (gameBoard) => {
        for(const [rowIndex, row] of gameBoard){
            for(const [columnIndex, space] of row.entries()){
                board.children.item(rowIndex).children.item(columnIndex).innerText = space;
            }
        }
    }
}

DOMController();