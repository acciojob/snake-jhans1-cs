//your code here
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const scoreBoard = document.createElement('div');
  scoreBoard.classList.add('scoreBoard');
  scoreBoard.innerText = 'Score: 0';
  gameContainer.appendChild(scoreBoard);

  const gridSize = 10; // Number of pixels in each row and column
  const totalPixels = gridSize * gridSize;
  const pixels = [];

  // Create the grid of pixels
  for (let i = 0; i < totalPixels; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.setAttribute('id', 'pixel' + (i + 1));
    gameContainer.appendChild(pixel);
    pixels.push(pixel);
  }

  // Snake starting position
  let snake = [61, 60, 59]; // Snake body pixels
  let direction = 1; // 1: right, -1: left, gridSize: down, -gridSize: up

  // Place the snake on the grid
  snake.forEach(pixelIndex => {
    pixels[pixelIndex].classList.add('snakeBodyPixel');
  });

  // Game loop
  setInterval(() => {
    moveSnake();
  }, 100);

  // Move the snake
  function moveSnake() {
    const head = snake[0];
    const nextHead = head + direction;

    // Check collision with walls or self
    if (
      nextHead < 0 ||
      nextHead >= totalPixels ||
      (direction === 1 && nextHead % gridSize === 0) || // Right wall
      (direction === -1 && (head + 1) % gridSize === 0) || // Left wall
      snake.includes(nextHead)
    ) {
      // Game over logic
      return;
    }

    // Check collision with food
    if (pixels[nextHead].classList.contains('food')) {
      // Food eaten logic
      pixels[nextHead].classList.remove('food');
      snake.unshift(nextHead);
      // Increase score
      scoreBoard.innerText = 'Score: ' + snake.length;
      // Generate new food
      generateFood();
    } else {
      // Normal movement
      const tail = snake.pop();
      pixels[tail].classList.remove('snakeBodyPixel');
      snake.unshift(nextHead);
    }

    // Update snake body on the grid
    snake.forEach((pixelIndex, index) => {
      pixels[pixelIndex].classList.add('snakeBodyPixel');
      if (index === 0) {
        pixels[pixelIndex].classList.remove('snakeBodyPixel');
      }
    });
  }

  // Generate random food
  function generateFood() {
    const availablePixels = pixels.filter(pixel => !pixel.classList.contains('snakeBodyPixel'));
    const randomIndex = Math.floor(Math.random() * availablePixels.length);
    availablePixels[randomIndex].classList.add('food');
  }

  // Initial food generation
  generateFood();
});
