const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let ballSpeed = 1.5;

// Paddle and ball objects
const paddle = { width: paddleWidth, height: paddleHeight, x: 10, y: canvas.height / 2 - paddleHeight / 2 };
const opponent = { width: paddleWidth, height: paddleHeight, x: canvas.width - paddleWidth - 10, y: canvas.height / 2 - paddleHeight / 2 };
const ball = { size: ballSize, x: canvas.width / 2, y: canvas.height / 2, dx: ballSpeed, dy: ballSpeed };

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Ball collision with top and bottom
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy = -ball.dy;
    }
    
    // Ball collision with paddles
    if (ball.x - ball.size < paddle.x + paddle.width && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
        ball.dx = -ball.dx;
    }
    
    if (ball.x + ball.size > opponent.x && ball.y > opponent.y && ball.y < opponent.y + opponent.height) {
        ball.dx = -ball.dx;
    }
    
    // Move opponent AI
    if (ball.y < opponent.y + opponent.height / 2) {
        opponent.y -= 2;
    } else {
        opponent.y += 2;
    }
    
    // Prevent paddles from moving out of canvas
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > canvas.height) paddle.y = canvas.height - paddle.height;
    if (opponent.y < 0) opponent.y = 0;
    if (opponent.y + opponent.height > canvas.height) opponent.y = canvas.height - opponent.height;
    
    requestAnimationFrame(draw);
}

// Control paddle with mouse
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const y = event.clientY - rect.top;
    paddle.y = y - paddle.height / 2;
});

draw();

