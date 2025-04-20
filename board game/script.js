const board = [0, 100, -100, 200, -200, 300, -300, 100, -100, 500, 100];

let p1Name, p2Name;
let p1Pos = 0, p2Pos = 0;
let p1Score = 0, p2Score = 0;
let turn = 1;

function startGame() {
  p1Name = document.getElementById("player1Name").value || "Player 1";
  p2Name = document.getElementById("player2Name").value || "Player 2";

  p1Pos = 0;
  p2Pos = 0;
  p1Score = 0;
  p2Score = 0;
  turn = 1;

  document.getElementById("game").style.display = "block";
  document.getElementById("finalResult").textContent = "";
  document.getElementById("rollButton").disabled = false;
  updateDisplay();
}

function rollDice() {
  if (p1Pos >= board.length - 1 && p2Pos >= board.length - 1) return;

  const dice = Math.floor(Math.random() * 6) + 1;
  let currentPlayer;

  if (turn === 1 && p1Pos < board.length - 1) {
    currentPlayer = p1Name;
    p1Pos = Math.min(p1Pos + dice, board.length - 1);
    p1Score += board[p1Pos];
    turn = 2;
  } else if (turn === 2 && p2Pos < board.length - 1) {
    currentPlayer = p2Name;
    p2Pos = Math.min(p2Pos + dice, board.length - 1);
    p2Score += board[p2Pos];
    turn = 1;
  } else {
    return;
  }

  document.getElementById("diceResult").textContent = `${currentPlayer} rolled a ${dice}`;
  updateDisplay();

  if (p1Pos >= board.length - 1 && p2Pos >= board.length - 1) {
    showWinner();
    document.getElementById("rollButton").disabled = true;
  }
}

function updateDisplay() {
  document.getElementById("turnText").textContent =
    turn === 1 ? `${p1Name}'s turn` : `${p2Name}'s turn`;
  document.getElementById("score1").textContent = `${p1Name}'s Score: ${p1Score}`;
  document.getElementById("score2").textContent = `${p2Name}'s Score: ${p2Score}`;
}

function showWinner() {
  let result = "";
  if (p1Score > p2Score) {
    result = `${p1Name} wins! 🎉`;
  } else if (p2Score > p1Score) {
    result = `${p2Name} wins! 🎉`;
  } else {
    result = "It's a tie!";
  }

  document.getElementById("finalResult").textContent = result;
}
