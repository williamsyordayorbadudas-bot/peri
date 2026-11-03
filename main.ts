<!DOCTYPE html >
    <html lang="es" >
        <head>
        <meta charset="UTF-8" >
            <title>Minijuego Escolar < /title>
                < style >
                body {
    margin: 0;
    background: #1a1a1a;
    display: flex;
    justify - content: center;
    align - items: center;
    height: 100vh;
    color: white;
    font - family: Arial, sans - serif;
}
canvas {
    background: #282c34;
    border: 4px solid #61dafb;
    box - shadow: 0 0 20px rgba(97, 218, 251, 0.5);
}
</style>
    < /head>
    < body >

    <canvas id="gameCanvas" width = "800" height = "400" > </canvas>

        < script >
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
let score = 0;
let lives = 3;
let timeLeft = 20;
let gameOver = false;
let gameWon = false;

// Personaje
const player = {
    x: 80,
    y: 310,
    width: 30,
    height: 40,
    dy: 0,
    jumpPower: -11,
    gravity: 0.6,
    grounded: true,
    color: "#61dafb"
};

// Objetos que caen
let fallingObjects = [];
let enemyTimer = 0;
let dropTimer = 0;

// Enemigos (vienen de la derecha)
let enemies = [];

// Control de teclado
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (gameOver || gameWon) {
            resetGame();
        } else if (player.grounded) {
            player.dy = player.jumpPower;
            player.grounded = false;
        }
    }
});

function resetGame() {
    score = 0;
    lives = 3;
    timeLeft = 20;
    gameOver = false;
    gameWon = false;
    fallingObjects = [];
    enemies = [];
    player.y = 310;
    player.dy = 0;
    player.grounded = true;
    startTimers();
}

// Temporizador de cuenta regresiva (20 segundos)
let gameInterval = setInterval(() => {
    if (!gameOver && !gameWon) {
        timeLeft--;
        if (timeLeft <= 0) {
            if (score >= 15) {
                gameWon = true;
            } else {
                gameOver = true;
            }
        }
    }
}, 1000);

// Spawns
function spawnObjects() {
    if (gameOver || gameWon) return;

    // Objeto que cae (positivo o negativo)
    let isGood = Math.random() > 0.4;
    fallingObjects.push({
        x: Math.random() * (canvas.width - 200) + 100,
        y: -20,
        radius: 12,
        speed: 3 + Math.random() * 2,
        type: isGood ? "good" : "bad"
    });
}

function spawnEnemy() {
    if (gameOver || gameWon) return;
    enemies.push({
        x: canvas.width,
        y: 320,
        width: 30,
        height: 30,
        speed: 5
    });
}

// Intervalos de generación
setInterval(spawnObjects, 1200);
setInterval(spawnEnemy, 2000); // Aparece un enemigo cada 2 segundos

// Bucle principal
function update() {
    if (!gameOver && !gameWon) {
        // Física del jugador (Salto y gravedad)
        player.dy += player.gravity;
        player.y += player.dy;

        if (let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
