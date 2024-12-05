const container = document.getElementById("game-container");
const shuffleButton = document.getElementById("shuffle-button");

const size = 4; // Размер игрового поля (4x4)
let tiles = [];

// Создать игровое поле
function createTiles() {
  tiles = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(null);
  renderTiles();
}

// Отобразить плитки
function renderTiles() {
  container.innerHTML = "";
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === null) {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
      tileElement.addEventListener("click", () => moveTile(index));
    }
    container.appendChild(tileElement);
  });
}

// Проверить возможность хода
function isMoveValid(index) {
  const emptyIndex = tiles.indexOf(null);
  const row = Math.floor(index / size);
  const col = index % size;
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;

  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  );
}

// Сделать ход
function moveTile(index) {
  if (isMoveValid(index)) {
    const emptyIndex = tiles.indexOf(null);
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    renderTiles();
    checkWin();
  }
}

// Перемешать плитки
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  renderTiles();
}

// Проверить победу
function checkWin() {
  const isSolved = tiles.slice(0, -1).every((tile, i) => tile === i + 1);
  if (isSolved) {
    setTimeout(() => alert("Поздравляем, вы победили!"), 100);
  }
}

// Начальная инициализация
shuffleButton.addEventListener("click", shuffleTiles);
createTiles();


const circle = document.getElementById('circle');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Функция для размещения круга в случайной позиции
function moveCircle() {
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;

  const circleSize = circle.offsetWidth;

  // Вычисляем случайную позицию, чтобы круг не выходил за пределы контейнера
  const randomX = Math.random() * (containerWidth - circleSize);
  const randomY = Math.random() * (containerHeight - circleSize);

  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;
}

// Обработчик клика на круг
circle.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  moveCircle();
});

moveCircle();
