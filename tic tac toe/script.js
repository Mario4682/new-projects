let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
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

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("game-status");
const restartBtn = document.getElementById("restart-btn");

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      disableBoard();
      return true;
    }
  }

  if (!boardState.includes("")) {
    statusText.textContent = "It's a Tie!";
    return true;
  }

  return false;
}

function disableBoard() {
  cells.forEach((cell) => cell.classList.add("taken"));
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (!checkWinner()) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

// Initial game state
statusText.textContent = "Player X's Turn";
