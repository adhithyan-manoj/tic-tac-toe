const gameBoard = document.getElementById('gameBoard');
const playWithFriend = document.getElementById('playWithFriend');
const playWithComputer = document.getElementById('playWithComputer');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const winnerText = document.getElementById('winnerText');
const restartButton = document.getElementById('restartButton');
const gameModeSelection = document.getElementById('gameModeSelection');
const gameBoardContainer = document.getElementById('gameBoardContainer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'friend';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    document.getElementById(index).innerText = currentPlayer;
    checkWinner();

    if (gameMode === 'computer' && gameActive) {
        currentPlayer = 'O';
        setTimeout(computerMove, 500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function computerMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    document.getElementById(randomIndex).innerText = 'O';
    checkWinner();
    currentPlayer = 'X';
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        displayWinner(`${currentPlayer} wins!`);
    } else if (!board.includes('')) {
        gameActive = false;
        displayWinner('It\'s a draw!');
    }
}

function displayWinner(message) {
    overlay.style.display = 'block';
    popup.style.display = 'block';
    winnerText.innerText = message;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameBoard.innerHTML = '';
    createBoard();
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

function createBoard() {
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('id', index);
        cellDiv.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellDiv);
    });
}

function startGame(mode) {
    gameMode = mode;
    gameModeSelection.classList.add('d-none');
    gameBoardContainer.classList.remove('d-none');
    restartGame();
}

playWithFriend.addEventListener('click', () => startGame('friend'));

playWithComputer.addEventListener('click', () => startGame('computer'));

restartButton.addEventListener('click', restartGame);

createBoard();
