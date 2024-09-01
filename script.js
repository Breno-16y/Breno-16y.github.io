const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define o tamanho do canvas
canvas.width = 600;
canvas.height = 400;

// Configura as propriedades do jogo
const paddleWidth = 10, paddleHeight = 80, ballSize = 10;
const paddleSpeed = 4, ballSpeed = 1.0;

let playerPaddleY = canvas.height / 2 - paddleHeight / 2;
let aiPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVelX = ballSpeed;
let ballVelY = ballSpeed;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha o jogador
    ctx.fillStyle = '#fff';
    ctx.fillRect(10, playerPaddleY, paddleWidth, paddleHeight);
    
    // Desenha o adversário
    ctx.fillRect(canvas.width - paddleWidth - 10, aiPaddleY, paddleWidth, paddleHeight);
    
    // Desenha a bola
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Move a bola
    ballX += ballVelX;
    ballY += ballVelY;

    // Colisão com a parede superior e inferior
    if (ballY <= 0 || ballY >= canvas.height) ballVelY = -ballVelY;

    // Colisão com a raquete do jogador
    if (ballX <= 20 && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
        ballVelX = -ballVelX;
    }

    // Colisão com a raquete da IA
    if (ballX >= canvas.width - 20 && ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
        ballVelX = -ballVelX;
    }

    // Movimento da IA
    if (ballY > aiPaddleY + paddleHeight / 2) {
        aiPaddleY += paddleSpeed;
    } else {
        aiPaddleY -= paddleSpeed;
    }

    // Impede que a IA saia dos limites
    if (aiPaddleY < 0) aiPaddleY = 0;
    if (aiPaddleY > canvas.height - paddleHeight) aiPaddleY = canvas.height - paddleHeight;

    // Verifica se a bola saiu da tela
    if (ballX <= 0 || ballX >= canvas.width) {
        // Reinicia a bola
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballVelX = -ballVelX; // Altera a direção
    }
}

function update() {
    draw();
    requestAnimationFrame(update);
}

// Controla o movimento do jogador
canvas.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    playerPaddleY = touch.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    
    // Impede que o jogador saia dos limites
    if (playerPaddleY < 0) playerPaddleY = 0;
    if (playerPaddleY > canvas.height - paddleHeight) playerPaddleY = canvas.height - paddleHeight;
});

update();

