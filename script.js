// TODO: Create Game, Board, and Player objects.

// Game:
    // Track the game's state - Who won/loss, Whose turn it is

    function createGameController(playerOne, playerTwo) {

        // We need access to the GameBoard object so we can retrieve its state. We only need a single game controller and game board (IIFE).
        const gameBoard = createGameBoard();


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

        const playTurn = () => {
            console.log(`It's now ${activePlayer.player.name}'s turn.`);

            let row = prompt("Enter row");
            let column = prompt("Enter column");

        // Need to check if space is already occupied.
            while(gameBoard.getQuadrant(row, column) != null) {
                console.log("That spot is already taken.");
                row = prompt("Please enter a row.");
                column = prompt("Please enter a column.");
            }

            gameBoard.setQuadrant(row, column, activePlayer.marker);
            setActivePlayer();
            gameBoard.displayBoard();
        }

        return { playTurn };
    }

// Gameboard:
    // Hold and keep record of spaces - If a space is occupied, then that space cannot be overidden. Responsible for drawing itself.

function createGameBoard() {
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

    // We need a way to display the board also.
    const displayBoard = () => {
        for (const row of getBoard()) {
            for (const marker of row) {
                console.log(`---${marker}---`);
            }
        }
    }

    return { setQuadrant, getQuadrant, getBoard, displayBoard };

}
// Player:
    // Keeps details for each player - Each person has either an 'X' or 'O' marker. We can use Player 1 and Player 2 for the player names.

function createPlayer(name) {

    return { name };
}

const game = createGameController(createPlayer("Rickey"), createPlayer("Jack"));