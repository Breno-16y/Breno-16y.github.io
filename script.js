const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Paddle dimensions
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

// Player paddle
const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    dy: 0
};

// AI paddle
const ai = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    speed: 2, // AI speed
    difficulty: 0.1 // 0: easy, 1: hard (1 means AI follows the ball perfectly)
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballSize / 2,
    speed: 1.5,
    dx: 1.5,
    dy: 1.5,
    color: '#FFF'
};

// Draw rectangle (paddle)
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Draw circle (ball)
function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Update game elements
function update() {
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < player.x + player.width && 
        ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > ai.x && 
        ball.y > ai.y && ball.y < ai.y + ai.height) {
        ball.dx *= -1;
    }

    // Move AI paddle
    if (ball.dx > 0) {
        if (ball.y > ai.y + ai.height / 2) {
            ai.y += ai.speed * (1 - ai.difficulty);
        } else {
            ai.y -= ai.speed * (1 - ai.difficulty);
        }

        // AI paddle boundary
        if (ai.y < 0) ai.y = 0;
        if (ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
    }

    // Ball out of bounds
    if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
        // Reset ball position
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = ball.speed * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
        ball.dy = ball.speed * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
    }

    // Move player paddle
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Main game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Handle keyboard input
function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        player.dy = -5;
    } else if (event.key === 'ArrowDown') {
        player.dy = 5;
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player.dy = 0;
    }
}

// Handle touch controls for mobile
function handleTouchMove(event) {
    const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
    player.y = touchY - player.height / 2;

    // Keep the player paddle within the canvas
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
canvas.addEventListener('touchmove', handleTouchMove);

// Start the game loop
gameLoop();

