// Game variables
let highScore = 0;
let playerYPos = 334; // Changes when player jumps
let obstacleXPos = 400; // Changes when obstacles move across the screen
const playerXPos = 65;
const obstacleYPos = 344;
let playerImage;
let enemyImage;

// Collision variables
let obstacleSize = 30;
let playerRight, playerTop, playerBottom, playerLeft;
let obstacleLeft, obstacleTop, obstacleBottom, obstacleRight;

// Jumping variables
let verticalSpeed;
let isJumping = false;
const gravity = 0.6;

// Score tracking
let score = 0;
let scoreMessage = "Score: ";

// Game state variables
let isGameStarted = false;
let isGameOver = false;

// Initializes the game
function startGame() {
  obstacleXPos = 525;
  score = 0;
  verticalSpeed = 0;
  isJumping = false;
  isGameOver = false;
  highScore = localStorage.getItem("highScore") || 0;
  loop();
}

function preload() {
    playerImage = loadImage('penguin.png');
    enemyImage = loadImage('icicle.png');
  }

function setup() {
  createCanvas(500, 500);
  background(222, 222, 222);

  rectMode(CENTER);
}
  function draw() {
  background(0, 157, 197);

  line(0, 360, 500, 360); // Ground line

  if (!isGameStarted) {
    
   
displayStartMessage();
  } else if (!isGameOver) {
    image(playerImage, playerXPos, playerYPos, 50, 50); // Draw player image
    image(enemyImage, obstacleXPos, obstacleYPos, obstacleSize, obstacleSize); // Draw obstacle

    // Player jumps
    if ((keyIsDown(UP_ARROW) || keyIsDown(32)) && !isJumping) {
      verticalSpeed = -15; // Jumping height
      isJumping = true;
    }

    // Apply gravity
    playerYPos += verticalSpeed; // Update player's Y position
    verticalSpeed += gravity; // Increase vertical speed until landing

    // Check if player touches the ground
    if (playerYPos > 334) {
      playerYPos = 334;
      isJumping = false;
    }

    // Collision detection
    playerLeft = playerXPos - 25;
    playerRight = playerXPos + 25;
    playerTop = playerYPos - 25;
    playerBottom = playerYPos + 25;

    obstacleLeft = obstacleXPos - 15;
    obstacleRight = obstacleXPos + 15;
    obstacleTop = obstacleYPos - 15;
    obstacleBottom = obstacleYPos + 15;

    // Move obstacle across the screen
    obstacleXPos -= 5;

    // Reset obstacle position when it goes off the screen
    if (obstacleLeft < 10) {
      obstacleXPos = 525;
    }

    // Non-collision
    if (
      playerRight < obstacleLeft ||
      playerTop > obstacleBottom ||
      playerBottom < obstacleTop
    ) {
      // Update score when player passes obstacle without colliding
      if (playerLeft > obstacleRight) {
        score += 1;
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
        }
      }
    } else {
      // Collision occurred, game ends
      isGameOver = true;
      noLoop();
      displayGameOverMessage();
    }

    // Display score message
    fill(255, 255, 255);
    textSize(30);
    textAlign(RIGHT);
    text(scoreMessage + score, 485, 60);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (!isGameStarted) {
      // Start the game when space bar is pressed
      isGameStarted = true;
      startGame();
    } else if (isGameOver) {
      // Restart the game when space bar is pressed after a game over
      isGameOver = false;
      startGame();
    }
  }
}

function displayStartMessage() {
  fill(0, 0, 255);
  textSize(30);
  textAlign(CENTER);
  text("Press Space to Start", 250, 250);
}

