// selects all elements with the class 'grid-box' and converts them into an array
const gridBox = Array.from(document.getElementsByClassName("grid-box"));

// selects the status text element to display game messages (e.g. player turns/wins)
const statusTxt = document.getElementById("status");

// selects the reset button element to reset the game
const reset = document.getElementById("reset");

// winning conditions in a 3x3 grid, 
// where each array represents indexes forming a winning line
const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// holds the current state of each grid cell
// empty string by default
let gridHolders = ["", "", "", "", "", "", "", "", ""];

// the current player
// starting with "X"
let player = "X";

// game loop control
// set to true while game is ongoing
let gameLoop = false;

// initializes the game settings and event listeners for each grid box and reset button
initGame();

function initGame() {
    // adds click event listeners to each grid box and sets their index
    gridBox.forEach((box, index) => {
        box.addEventListener("click", gridBoxClicked);
        box.setAttribute("index", index);
    });

    // adds click event listener to reset button to trigger resetGame function
    reset.addEventListener("click", resetGame);

    // sets the initial game status message for the player's turn
    statusTxt.textContent = `${player}'s turn`;
    gameLoop = true;  // enables the game loop to start receiving player inputs
}

// handles the click event on a grid box
function gridBoxClicked() {
    const index = this.getAttribute("index");  // gets the clicked box index

    // no action if the cell is already filled or if the game has ended
    if (gridHolders[index] != "" || !gameLoop) {
        return;
    }

    // updates the clicked box and checks for a winner after each move
    updateGridBox(this, index);
    checkWinner();
}

// updates the selected grid box with the current player's symbol and updates the grid state
function updateGridBox(box, index) {
    gridHolders[index] = player;  // updates grid holder array with the player's mark
    box.textContent = player;     // displays the player's mark in the UI
}

// switches the current player from "X" to "O" or vice versa
function changePlayer() {
    player = player === "X" ? "O" : "X";  
    statusTxt.textContent = `${player}'s turn`;  
}

// checks if there is a winner or if the game is a draw
function checkWinner() {
    let roundWon = false;

    // loops through each winning condition to check if the current player meets any condition
    for (let i = 0; i < conditions.length; i++) {
        const [a, b, c] = conditions[i];

        // checks if the player controls all cells in a winning condition
        if (gridHolders[a] && gridHolders[a] === gridHolders[b] && gridHolders[a] === gridHolders[c]) {
            roundWon = true;  // sets roundWon to true if a winning condition is met
            highlightWinner([a, b, c]);  // highlights the winning cells
            break;
        }
    }

    if (roundWon) {
        statusTxt.textContent = `${player} wins!`;  // displays win message
        gameLoop = false;  // ends the game loop
    } else if (!gridHolders.includes("")) {  // checks for a draw if all cells are filled
        statusTxt.textContent = "It's a draw!";  // displays draw message
        gameLoop = false;  // ends the game loop
    } else {
        changePlayer();  // changes the player if no winner or draw
    }
}

// highlights the winning grid boxes
function highlightWinner(winningBoxes) {
    winningBoxes.forEach(index => {
        gridBox[index].classList.add("win");  // adds 'win' class to highlight the box
    });
}

// resets the game board and restores the initial settings
function resetGame() {
    gridHolders = ["", "", "", "", "", "", "", "", ""];  
    player = "X";  
    gameLoop = true;  
    statusTxt.textContent = `${player}'s turn`;  

    // clears the grid UI and removes the highlights from previous wins
    gridBox.forEach(box => {
        box.textContent = "";
        box.classList.remove("win");
    });
}

window.onload();
