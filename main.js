// Select all cells of the game board

const cells = document.querySelectorAll(".cell");

// Select the status text element (e.g., "Player X's turn")

const statusText = document.querySelector("#statusText");

// Select the restart button element

const restartBtn = document.querySelector("#restartBtn");

// Define all possible winning conditions as arrays of cell indices

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Array representing the current state of the game board (empty initially)

let options = ["", "", "", "", "", "", "", "", ""];

// Set the starting player as "X"

let currentPlayer = "X";

// A flag to indicate whether the game is running

let running = false;

// Initialize the game when the script loads------------

initializeGame();

// Function to Adds event listeners to cells and restart button and sets the initial status message, and starts the game------------

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

//Function: cellClicked : Handles cell clicks. Updates the cell if it's empty and the game is running------------

function cellClicked() {
  // Get the index of the clicked cell
  const cellIndex = this.getAttribute("cellIndex");
  console.log(this);
  // If the cell is already filled or the game isn't running, do nothing
  if (options[cellIndex] != "" || !running) {
    return;
  }
  // Update the cell and check for a winner
  updateCell(this, cellIndex);
  checkWinner();
}

//Function: updateCell : Updates the clicked cell's content and the game state array------------

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

//Function: changePlayer : Switches the current player from "X" to "O" or vice versa, and updates the status text to reflect the change------------

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

//Function: checkWinner : Checks if there's a winning condition, a draw, or continues the game. Updates the status text and stops the game if a winner is found or it's a draw------------

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `!`;
    running = false;
  } else {
    changePlayer();
  }
}

//Function: restartGame : Function: restartGame Description: Resets the game state, clears the board, and starts a new game.------------

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
