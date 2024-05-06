let currentPlayer = 'X'; // Player X always starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board
let gameActive = true;
//Эти строки кода задают основные переменные. CurrentPlayer будет чередовать 'X' и 'O', gameBoard - это массив, представляющий нашу сетку 3x3, а gameActive указывает, продолжается ли игра.


function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
//Эта функция проверяет, пуста ли выбранная ячейка и активна ли игра. Если это так, она устанавливает в ячейку символ текущего игрока и переключает игроков.


function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}
//В этой функции мы:
// Получаем выбранную ячейку и ее индекс.
// Проверьте, занята ли уже ячейка или игра неактивна.
// Если нет, мы вызываем handlePlayerTurn для обновления состояния игры и updateUI, чтобы отразить эти изменения на игровом поле.


const cells = document.querySelectorAll('.cell');
//выделить все элементы ячейки

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});
//прослушиватель событий в каждую ячейку, будет вызывать функцию при нажатии на ячейку


function updateUI() {
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
  }
}
//Эта функция обновляет каждую ячейку соответствующим значением в массиве gameBoard, эффективно отображая Xs и Os на доске.


function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Player ${player} Wins!`;
}
function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Game Draw!';
}
//Эти функции обновят пользовательский интерфейс, чтобы информировать игроков об исходе игры.


const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left-to-right diagonal
  [2, 4, 6]  // Right-to-left diagonal
];// проверка выйгрышных комбинаций

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      announceWinner(currentPlayer);
      gameActive = false;
      return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      announceDraw();
      gameActive = false;
      return;
  }
}
//В этой функции мы:
// Проверяем каждое условие выигрыша, чтобы увидеть, есть ли у текущего игрока выигрышная комбинация.
// Объявление победителя, если будет найдена выигрышная комбинация.
// Проверяем на ничью, если не осталось пробелов и победитель не объявлен.


function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
      cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}
//Эта функция возвращает массив gameBoard в исходное состояние, присваивает gameActive значение true и CurrentPlayer возвращает значение 'X'.
// Она также очищает текстовое содержимое каждой ячейки пользовательского интерфейса, эффективно визуально очищая игровое поле.


const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);
//Этот код выбирает кнопку сброса и подключает к ней прослушиватель событий. При нажатии на кнопку вызывается функция resetGame.