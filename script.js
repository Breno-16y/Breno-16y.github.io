const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext('2d');

// Dimensões e propriedades dos paddles e da bola
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

// Inicialização dos paddles e da bola
let playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
let aiPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
let ball = { x: canvas.width / 2, y: canvas.height / 2, size: ballSize, dx: 2, dy: 1.5 }; // Bola mais lenta

function drawPaddle(paddle) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com as bordas superior e inferior
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy = -ball.dy;
    }

    // Colisão com o paddle do jogador
    if (ball.x - ball.size < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) {
        ball.dx = -ball.dx;
    }

    // Colisão com o paddle do robô
    if (ball.x + ball.size > aiPaddle.x &&
        ball.y > aiPaddle.y && ball.y < aiPaddle.y + aiPaddle.height) {
        ball.dx = -ball.dx;
    }

    // Se a bola sair dos limites, reposicionar no centro
    if (ball.x + ball.size < 0 || ball.x - ball.size > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 2; // Reiniciar a velocidade da bola
        ball.dy = 1.5; // Reiniciar a velocidade da bola
    }

    // Movimento simples do robô (IA)
    if (ball.y > aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.y += 2; // Ajustado para um movimento mais lento
    } else {
        aiPaddle.y -= 2; // Ajustado para um movimento mais lento
    }

    // Manter o paddle do robô dentro dos limites
    aiPaddle.y = Math.max(0, Math.min(canvas.height - aiPaddle.height, aiPaddle.y));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(playerPaddle);
    drawPaddle(aiPaddle);
    drawBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Manipulador de movimento do mouse
function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    playerPaddle.y = event.clientY - rect.top - playerPaddle.height / 2;
    playerPaddle.y = Math.max(0, Math.min(canvas.height - playerPaddle.height, playerPaddle.y));
}

// Manipulador de movimento do toque
function handleTouchMove(event) {
    const rect = canvas.getBoundingClientRect();
    const touchY = event.touches[0].clientY;
    playerPaddle.y = touchY - rect.top - playerPaddle.height / 2;
    playerPaddle.y = Math.max(0, Math.min(canvas.height - playerPaddle.height, playerPaddle.y));
}

// Adicionar event listeners para mouse e toque
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchmove', handleTouchMove);

// Ajustar o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    playerPaddle.height = paddleHeight * (canvas.height / 600);
    aiPaddle.height = paddleHeight * (canvas.height / 600);
    ball.size = ballSize * (canvas.height / 600);
    playerPaddle.y = Math.max(0, Math.min(canvas.height - playerPaddle.height, playerPaddle.y));
    aiPaddle.y = Math.max(0, Math.min(canvas.height - aiPaddle.height, aiPaddle.y));
});

window.dispatchEvent(new Event('resize')); // Disparar evento de redimensionamento inicial

gameLoop();
