// TODO: Create Game, Board, and Player objects.

// Game:
    // Track the game's state - Who won/loss, Whose turn it is

    // We only need one gameboard. We'll use an IIFE.
    const GameController = (function (playerOne, playerTwo) {

        // Create Players


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

        // Function that initiates a turn.
        const playTurn = () => {
            console.log(`It's now ${activePlayer.player.name}'s turn.`);

            let row = prompt("Enter row");
            let column = prompt("Enter column");

        // Need to check if space is already occupied.
            while(GameBoard.getQuadrant(row, column) != null) {
                console.log("That spot is already taken.");
                row = prompt("Please enter a row.");
                column = prompt("Please enter a column.");
            }

            GameBoard.setQuadrant(row, column, activePlayer.marker);
            // Check for a winner here.
            checkWinTie();
            setActivePlayer();
            GameBoard.displayBoard();
        }

        // Check for a winner or a tie.
        const checkWinTie = () => {
            console.log(GameBoard.getBoard());

            // NOTE: The return keyword must be included with curly braces in an arrow function. Returns undefined if return keyword is not included with curly braces. Braces and return keyword not needed with one statement.
            // Iterates through each row, checking to see if all marks are either "O" or "X." Checks horizontally.
            GameBoard.getBoard().forEach((row) => {if(row.every(element => element == activePlayer.marker)) {
                console.log("Win");
                return;
                }
            });

            // Need to check if indices of each row contain the same marker: board[0][0] == board[1][0] == board[2][0]. Checks vertically.
            GameBoard.getBoard().keys().forEach((key) => {if(GameBoard.getBoard().map((row) => (row[key])).every((marker) => marker == activePlayer.marker)) {
                console.log("Win");
                return;
                }
            });

            // Need to check diagonally.
            if(GameBoard.getBoard().keys().map((key) => GameBoard.getBoard()[key][key]).every((marker) => marker == activePlayer.marker) || GameBoard.getBoard().keys().map((key) => GameBoard.getBoard().toReversed()[key][key]).every((marker) => marker == activePlayer.marker)) {
                console.log("Win");
                return;
            }

            // Need to check for a tie. If none of the spaces include null and all of the prior winning conditions were not met, then they must all be populated with a marker.
            if(GameBoard.getBoard().every((row) => row.includes(null) != true)) {
                console.log("Tie");
            };

        }

        return { playTurn };
    })(createPlayer(prompt("Please enter your name: ", "Player 1" )), createPlayer(prompt("Please enter your name: ", "Player 2" )));

// Gameboard:
    // Hold and keep record of spaces - If a space is occupied, then that space cannot be overidden. Responsible for drawing itself.

const GameBoard = (function () {
    // A tic tac toe board can be represented as three rows and three comlumns.
    // Create Board with arrays. Each array inside of the main array represents a row and each of the elements in those arrays are the columns.
    const board = [["O", "X", "O"], ["X", "X", "O"], ["O", "O", "X"]];

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

    // We need a way to display the board also.
    const displayBoard = () => {
        for (const row of getBoard()) {
            for (const marker of row) {
                console.log(`---${marker}---`);
            }
        }
    }

    // Board needs to have a way to reset itself for a new game.

    const clearBoard = () => {
        board.map((row) => {
            // Fill every space of the inner arrays with null.
            row.fill(null);
        });
    }

    return { setQuadrant, getQuadrant, getBoard, displayBoard, clearBoard };

})();

// Player:
    // Keeps details for each player - Each person has either an 'X' or 'O' marker. We can use Player 1 and Player 2 for the player names.

function createPlayer(name) {

    // let name = prompt("Please enter your name: ", "Player" )

    return { name };
}

function DOMController() {
    const board = document.getElementById("board");

    GameBoard.getBoard().forEach((row) => {
        const rowElement = document.createElement("div");
        rowElement.setAttribute("class","row");
        for(const marker of row){
            const markerElement = document.createElement("div");
            markerElement.setAttribute("class","rowText");
            markerElement.innerText = marker;
            rowElement.appendChild(markerElement);
        }
        // rowElement.innerText = row;
        board.appendChild(rowElement);
    });
}