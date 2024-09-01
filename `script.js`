const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let ballSpeedX = 5;
let ballSpeedY = 3;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 4;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Ball collision with top and bottom
    if (ballY <= ballSize || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Ball collision with paddles
    if (ballX <= paddleWidth + ballSize && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    
    // Ball out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
    
    requestAnimationFrame(draw);
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    }
    if (e.key === 'w' && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (e.key === 's' && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
});

// Adicionar suporte a toque
let touchStartY = 0;
let touchEndY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
    let deltaY = touchEndY - touchStartY;
    touchStartY = touchEndY;

    // Controlar paddle1 com o toque
    if (paddle1Y + deltaY >= 0 && paddle1Y + deltaY <= canvas.height - paddleHeight) {
        paddle1Y += deltaY;
    }
});

canvas.addEventListener('touchend', () => {
    touchStartY = touchEndY = 0;
});

// Controles de botão na tela
const moveUpButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');

moveUpButton.addEventListener('click', () => {
    if (paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
});

moveDownButton.addEventListener('click', () => {
    if (paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
});

draw();