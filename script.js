const board = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");
const quoteText = document.getElementById("quoteText");
const closePopup = document.getElementById("closePopup");
const moveSound = document.getElementById("moveSound");
const winSound = document.getElementById("winSound");
const popupSound = document.getElementById("popupSound");

let currentPlayer = "💊";
let cells = Array(9).fill(null);

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const tabletQuotes = [
  "To skip tablets, let vegetables be your best friends! 🥦",
  "No need for pills if your plate is full of colors! 🍇🥕",
  "If you hate tablets, love your salads! 🥗",
  "Avoid medicine, but not your morning walk! 🚶‍♀",
  "Say bye to tablets, and hi to healthy habits! 😎"
];

const syringeQuotes = [
  "To avoid meeting the doctor, give a kiss to your immunity! 😜",
  "If you want to skip injections, make friendship with fruits! 🍎",
  "To keep the doctor away, stay close to your work! 💪",
  "If you don’t want injections, don’t fight with your sleep! 😴",
  "Be healthy at home, not taking selfies in hospitals! 😂"
];

const tieQuotes = [
  "If you don’t want doctors or tablets — make health your best friend! 😎",
  "No doctor, no tablets — only fruits, water, and a little bit of drama! 🍎💧😂",
  "Stay fit, so you can skip both needles and pills! 💪",
  "Avoid tablets and doctors — but don’t avoid your mom’s food! 🍛",
  "Health first, hospitals last — that’s the deal! 😜"
];

function createBoard() {
  board.innerHTML = "";
  cells.fill(null);
  currentPlayer = "💊";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i, cell), { once: true });
    board.appendChild(cell);
  }
}

function makeMove(index, cell) {
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  moveSound.currentTime = 0;
  moveSound.play();

  if (checkWinner()) return;
  if (cells.every(c => c)) return showResult("tie");
  currentPlayer = currentPlayer === "💊" ? "💉" : "💊";
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      document.querySelectorAll(".cell")[a].classList.add("winner");
      document.querySelectorAll(".cell")[b].classList.add("winner");
      document.querySelectorAll(".cell")[c].classList.add("winner");
      showResult(cells[a]);
      return true;
    }
  }
  return false;
}

function showResult(winner) {
  winSound.play();
  popupSound.play();
  popup.classList.remove("hidden");

  let quote = "";
  if (winner === "💊") {
    winnerText.textContent = "💊 Tablet Wins the Battle 💪💊";
    quote = randomQuote(tabletQuotes);
  } else if (winner === "💉") {
    winnerText.textContent = "💉 Syringe Takes the Victory! 💥";
    quote = randomQuote(syringeQuotes);
  } else {
    winnerText.textContent = "⚖️ It’s a Tie!";
    quote = randomQuote(tieQuotes);
  }

  quoteText.textContent = quote;
  speakQuote(quote);
}

function randomQuote(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function speakQuote(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = "en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
  createBoard();
});
restartBtn.addEventListener("click", createBoard);
createBoard();
