//Game Button Class
class GameButton {
  constructor(operator, visible) {
    this.x = 750;
    this.y = 125;
    this.width = 100;
    this.height = 50;
    this.buttonEnabled = visible;
    this.visible = visible;
    this.operator = operator;
  }
  display() {
    if (this.visible === true) {
      fill("darkblue");
      rect(this.x, this.y, this.width, this.height);
      fill("white");
      textSize(30);
      text(this.operator, (this.x + 10), (((this.y + this.height / 2) + 10)));
    }
  }
  clicked() {
    if (mouseX >= (this.x) && mouseX <= (this.x + this.width)
      && mouseY >= (this.y) && mouseY <= (this.y + this.height)) {
      return true;
    }
  }
}

//Wall Class
class Wall {
  constructor() {
    this.x = 1400;
    this.y = 0;
    this.width = random(22, 83);
    this.height = height;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.shouldWidthChange = true;
    this.fill = (80, 80, 80);
  }
  display() {
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
  }
  setCenterCoordinates() {
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
  }
}

//Bullet Class
class Bullet {
  constructor(y) {
    this.x = 50;
    this.y = y;
    this.weight = random(30, 52);
    this.speed = random(223, 321);
    this.deformation = 0;
    this.width = 40;
    this.height = 20;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.fill = "white";
    this.visibleFill = rgb(255, 215, 0);
    this.shouldMove = false;
    this.visible = true;
  }
  display() {
    if (this.visible) {
      fill(this.visibleFill);
      rect(this.x, this.y, this.width, this.height);
    }
  }
  setDeformationValue(targetWidth) {
    this.deformation = Math.round((0.5 * this.weight * this.speed * this.speed) / (targetWidth * targetWidth * targetWidth));
  }
  setCenterCoordinates() {
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
  }

  reset() {
    this.x = 50;
    this.speed = random(223, 321);
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.shouldMove = false;
  }
}

//Global Variables
var speed;
var bullet1, bullet2, bullet3, bullet4, start, reset, wall, bulletSoundShouldPlayBullet1, bulletSoundShouldPlayBullet2, bulletSoundShouldPlayBullet3, bulletSoundShouldPlayBullet4;

var bulletSound;

var gameState = "Ready";

var volume;

function preload() {
  bulletSound = loadSound("bulletShootSound.mp3");
}

//Setup function to define our declared varialbes and do the initial setup
function setup() {
  createCanvas(1600, 400);

  volume = createSlider(0, 1, 0.2, 0.0001);

  bulletSound.setVolume(volume.value());
  bulletSoundShouldPlayBullet1 = true;
  bulletSoundShouldPlayBullet2 = true;
  bulletSoundShouldPlayBullet3 = true;
  bulletSoundShouldPlayBullet4 = true;

  wall = new Wall();

  start = new GameButton("Start", true);
  reset = new GameButton("Reset", false);

  bullet1 = new Bullet(50);

  bullet2 = new Bullet(130);

  bullet3 = new Bullet(210);

  bullet4 = new Bullet(300);
}

// Draw function to call functions ans set properties continuously
function draw() {
  background("lightgreen");

  //Set Bullet's properties
  bullet1.setDeformationValue(wall.width);
  bullet2.setDeformationValue(wall.width);
  bullet3.setDeformationValue(wall.width);
  bullet4.setDeformationValue(wall.width);

  bulletSound.setVolume(volume.value());

  //Display the objects
  wall.display();
  bullet1.display();
  bullet2.display();
  bullet3.display();
  bullet4.display();

  //When the Bullets are ready to move
  if (gameState === 'Ready') {
    textSize(25);
    fill("black");
    text("Before starting, please make sure to keep your speaker volume low.." + " Bullets are getting fired!!!!", 275, 325);
    text("You can even change the volume of the sounds in the slider below", 275, 390);
    start.visible = true;
    start.buttonEnabled = true;
    start.display();

    if (wall.shouldWidthChange) {
      wall.width = random(22, 43);
      wall.setCenterCoordinates();
    }
    wall.shouldWidthChange = false;

    bullet1.reset();
    bullet2.reset();
    bullet3.reset();
    bullet4.reset();
  }

  //When a bullet is running
  if (gameState === 'Running') {
    //When the moving property of the bullet is true
    if (bullet1.shouldMove) {
      setVelocity(bullet1, bullet1.speed, 0, wall.centerX);
      if (bulletSoundShouldPlayBullet1) {
        bulletSound.play();
      }
      bulletSoundShouldPlayBullet1 = false;
      if (bullet1.x < 1600) {
        console.log("Bullet 1 - x - " + bullet1.x);
      }
    }

    if (bullet2.shouldMove) {
      setVelocity(bullet2, bullet2.speed, 0, wall.centerX);
      if (bulletSoundShouldPlayBullet2) {
        bulletSound.play();
      }
      bulletSoundShouldPlayBullet2 = false;
      if (bullet2.x < 1600) {
        console.log("Bullet 2 - x - " + bullet2.x);
      }
    }

    if (bullet3.shouldMove) {
      setVelocity(bullet3, bullet3.speed, 0, wall.centerX);
      if (bulletSoundShouldPlayBullet3) {
        bulletSound.play();
      }
      bulletSoundShouldPlayBullet3 = false;
      if (bullet3.x < 1600) {
        console.log("Bullet 3 - x - " + bullet3.x);
      }
    }

    if (bullet4.shouldMove) {
      setVelocity(bullet4, bullet4.speed, 0, wall.centerX);
      if (bulletSoundShouldPlayBullet4) {
        bulletSound.play();
      }
      bulletSoundShouldPlayBullet4 = false;
      if (bullet4.x < 1600) {
        console.log("Bullet 4 - x - " + bullet4.x);
      }
    }

    //Run Bullets
    shootBullet(bullet1, bullet3);
    shootBullet(bullet3, bullet2);
    shootBullet(bullet2, bullet4);
    shootBullet(bullet4);
  }

  //When the Bullets are stopped when they have crashed
  if (gameState === "Stopped") {
    showDeformationText(bullet1, 950, bullet1.y + 20, 30);
    showDeformationText(bullet2, 950, bullet2.y + 20, 30);
    showDeformationText(bullet3, 950, bullet3.y + 20, 30);
    showDeformationText(bullet4, 950, bullet4.y + 20, 30);

    showDeformationColor(1160, bullet1.y - 10, bullet1.fill, true);
    showDeformationColor(1160, bullet2.y - 10, bullet2.fill, true);
    showDeformationColor(1160, bullet3.y - 10, bullet3.fill, true);
    showDeformationColor(1160, bullet4.y - 10, bullet4.fill, true);

    bulletSoundShouldPlayBullet1 = true;
    bulletSoundShouldPlayBullet2 = true;
    bulletSoundShouldPlayBullet3 = true;
    bulletSoundShouldPlayBullet4 = true;

    wall.shouldWidthChange = true;

    reset.visible = true;
    reset.buttonEnabled = true;
    reset.display();
  }

  //When the restarting of the game conditions of the last moving bullet, i.e enze become true
  if (restartGameConditions(bullet4)) {
    gameState = "Stopped";
  }

  //Print line borders
  fill("red");
  textSize(25);

  line(220, 0, 220, 400);
  line(0, 20, 1600, 20);
  line(0, 110, 1600, 110);
  line(0, 190, 1600, 190);
  line(0, 270, 1600, 270);
  line(0, 360, 1600, 360);
}

//Show the text deformation of the Bullet
function showDeformationText(bullet, x, y, size) {
  fill(rgb(200, 0, 150));
  textSize(size);
  // text("Damage: " + Math.round(bullet.deformation), 950, bullet.y + 10);
  text("Damage: " + bullet.deformation, x, y);
}

//Show the color deformation of the Bullet
function showDeformationColor(x, y, damageZone, create) {
  if (create === true) {
    fill(damageZone);
    rect(x, y);
  }
}

//When the mouse is clicked. This is an internal p5 function that get called internally.
function mouseClicked() {
  if (start.buttonEnabled) {
    if (start.clicked()) {
      console.log("Start Clicked");
      bullet1.shouldMove = true;
      start.visible = false;
      start.buttonEnabled = false;
      gameState = "Running";
    }
  }

  if (reset.buttonEnabled) {
    if (reset.clicked()) {
      console.log("Reset Clicked");
      gameState = "Ready";
      reset.visible = false;
      reset.buttonEnabled = false;
    }
  }
}

//The restarting game conditions are true or false
function restartGameConditions(lastBullet) {
  if (isTouching(lastBullet, wall)) {
    return true;
  }
}

//Control center for all the bullets, controls each of their movement.
function shootBullet(movingBullet, startingBullet) {
  if (isTouching(movingBullet, wall)) {
    movingBullet.shouldMove = false;
    movingBullet.x = 1370;
    if (startingBullet) {
      startingBullet.shouldMove = true;
    }
    if (movingBullet.deformation < 30) {
      movingBullet.fill = "green";
    } else {
      movingBullet.fill = "red";
    }

    showDeformationText(movingBullet, 950, movingBullet.y + 20, 30);
    showDeformationColor(1160, movingBullet.y - 10, movingBullet.fill, true);
  }
}

//To check if a object is touching another object
function isTouching(target1, target2) {
  if ((target2.centerX - target1.centerX) <= (target2.width + target1.width) / 2
    && (target1.centerX - (target2.centerX) <= (target2.width + target1.width) / 2)
    && ((target2.centerY - target1.centerY) <= (target2.height + target1.height) / 2)
    && ((target1.centerY - target2.centerY) <= (target2.height + target1.height) / 2)) {
    return true;
  }
}

//Function to set velocity. It is an externally defined function.
function setVelocity(bullet, velocityX, velocityY, maxX) {
  bullet.x += velocityX;
  if (bullet.x > maxX) {
    bullet.x = maxX;
  }
  bullet.y += velocityY;
  bullet.setCenterCoordinates();
}