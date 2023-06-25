document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreBoard = document.createElement('div');
    scoreBoard.className = 'scoreBoard';
    scoreBoard.textContent = 'Score: 0';
    gameContainer.appendChild(scoreBoard);

    const pixels = {};
    let snake = [{ row: 20, col: 1 }];
    let direction = 'right';
    let food = null;
    let score = 0;

    function createPixel(id, className) {
        const pixel = document.createElement('div');
        pixel.id = `pixel${id}`;
        pixel.className = className;
        return pixel;
    }

    function createFood() {
        const pixelIds = Object.keys(pixels);
        const randomId = pixelIds[Math.floor(Math.random() * pixelIds.length)];
        food = pixels[randomId];
        food.classList.add('food');
    }

    function updateScore() {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case 'up':
                head.row--;
                break;
            case 'down':
                head.row++;
                break;
            case 'left':
                head.col--;
                break;
            case 'right':
                head.col++;
                break;
        }

        if (head.row < 1 || head.row > 20 || head.col < 1 || head.col > 20 || checkCollision(head)) {
            clearInterval(gameInterval);
            alert('Game Over!');
            return;
        }

        snake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
            food.classList.remove('food');
            updateScore();
            createFood();
        } else {
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail.row}-${tail.col}`);
            tailPixel.classList.remove('snakeBodyPixel');
        }

        const headPixel = document.getElementById(`pixel${head.row}-${head.col}`);
        headPixel.classList.add('snakeBodyPixel');
    }

    function checkCollision(head) {
        return snake.some(body => body.row === head.row && body.col === head.col);
    }

    for (let row = 1; row <= 20; row++) {
        for (let col = 1; col <= 20; col++) {
            const pixel = createPixel(`${row}-${col}`, 'pixel');
            pixel.style.top = `${(row - 1) * 40}px`;
            pixel.style.left = `${(col - 1) * 40}px`;
            gameContainer.appendChild(pixel);
            pixels[`${row}-${col}`] = pixel;
        }
    }

    createFood();
    const gameInterval = setInterval(moveSnake, 100);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down')
                    direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up')
                    direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right')
                    direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left')
                    direction = 'right';
                break;
        }
    });
});