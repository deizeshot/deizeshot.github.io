// Создание холста и контекста
const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');

// Определение размеров и параметров игрового поля
const row = 20;
const col = 10;
const blockSize = 24;

// Определение цветов для различных элементов игры
const colors = {
  0: '#000000',  // Черный цвет для пустых ячеек
  1: '#FF0000',  // Красный цвет для фигур
  // Остальные цвета для других фигур
  // ...
};

// Инициализация игрового поля
let board = createBoard();

// Функция для создания пустого игрового поля
function createBoard() {
  return Array.from({ length: row }, () => Array(col).fill(0));
}

// Функция для отрисовки игрового поля
function drawBoard() {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      drawCell(colIndex, rowIndex, colors[cell]);
    });
  });
}

// Функция для отрисовки отдельной ячейки
function drawCell(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  context.strokeStyle = '#000000';
  context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Функция для запуска игры
function startGame() {
  // ...
  // Здесь вы можете добавить логику игры Тетрис
  // ...
}

// Запуск игры
startGame();
// Инициализация текущей фигуры
let currentPiece = {
    shape: [],
    x: 0,
    y: 0,
  };
  
  // Генерация новой фигуры
  function generatePiece() {
    const pieces = [
      [[1]],
      [[1, 1], [1, 1]],
      // Другие фигуры
      // ...
    ];
  
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  
    currentPiece.shape = randomPiece;
    currentPiece.x = Math.floor((col - randomPiece[0].length) / 2);
    currentPiece.y = 0;
  }
  
  // Отрисовка текущей фигуры
  function drawCurrentPiece() {
    currentPiece.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          drawCell(currentPiece.x + colIndex, currentPiece.y + rowIndex, colors[cell]);
        }
      });
    });
  }
  
  // Проверка возможности перемещения фигуры вниз
  function canMoveDown() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          if (currentPiece.y + row >= row - 1 || board[currentPiece.y + row + 1][currentPiece.x + col]) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  // Функция для обновления игрового поля и проверки заполненных рядов
  function updateBoard() {
    for (let row = 0; row < row; row++) {
      if (board[row].every(cell => cell !== 0)) {
        // Удаление заполненного ряда
        board.splice(row, 1);
        // Добавление нового пустого ряда в начало поля
        board.unshift(Array(col).fill(0));
      }
    }
  }
  
  // Функция для перемещения текущей фигуры вниз
  function moveDown() {
    if (canMoveDown()) {
      currentPiece.y++;
    } else {
      // Фиксация фигуры на игровом поле
      currentPiece.shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            board[currentPiece.y + rowIndex][currentPiece.x + colIndex] = cell;
          }
        });
      });
  
      // Генерация новой фигуры
      generatePiece();
  
      // Проверка заполненных рядов и обновление игрового поля
      updateBoard();
    }
  }
  
  // Функция для обработки нажатий клавиш
  function handleKeyPress(event) {
    // Обработка нажатия клавиши влево
    if (event.key === 'ArrowLeft') {
      if (canMoveLeft()) {
        currentPiece.x--;
      }
    }
    // Обработка нажатия клавиши вправо
    else if (event.key === 'ArrowRight') {
      if (canMoveRight()) {
        currentPiece.x++;
      }
    }
    // Обработка нажатия клавиши вниз
    else if (event.key === 'ArrowDown') {
      moveDown();
    }
    // Обработка нажатия клавиши вверх (поворот фигуры)
    else if (event.key === 'ArrowUp') {
      rotatePiece();
    }
  
    // Перерисовка игрового поля и текущей фигуры
    drawBoard();
    drawCurrentPiece();
  }
  
  // Запуск игры
  function startGame() {
    generatePiece();
    setInterval(moveDown, 1000); // Перемещение фигуры вниз каждую секунду
    document.addEventListener('keydown', handleKeyPress);
  }
  
  // Запуск игры
  startGame();
  