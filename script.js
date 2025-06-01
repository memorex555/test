const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // Size of each grid cell
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 10, y: 10 }]; // Snake's initial position
let food = { x: 15, y: 15 }; // Food's initial position
let dx = 0; // Horizontal velocity
let dy = 0; // Vertical velocity
let score = 0;

// Game loop
function gameLoop() {
    setTimeout(() => {
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        checkCollision();
        updateScore();
        gameLoop();
    }, 100); // Adjust game speed here
}

function clearCanvas() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    context.fillStyle = 'green';
    snake.forEach(segment => {
        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop(); // Remove tail segment
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        resetGame();
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            break;
        }
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    placeFood();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Keyboard controls
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
    }
});

placeFood(); // Initial food placement
gameLoop(); // Start the game loop
