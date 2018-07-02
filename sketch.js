/*
Description: This program is a game that is a space shooter. Essentially you are a spaceShip that is in space being confronted by aliens.
The objective is for you to eliminate as many aliens as possible (granting you points), or stay alive for a minute. Going off the screen to "avoid" aliens will
end the game and subtract 10 points from your score (yes its possible to get negative points). There are 3 objects which are the stars, lasers and aliens.
the lasers and aliens dissapear when they interact in close proximity. The spaceShip has some "space physics" where the thrust still affects you if you
move in the opposite direction, meaning changing directions is harder due to there being velocity moving in a different vector direction.
You press the mouse to shoot and you use the WASD keys to move your spaceShip.
Author: Shyam Hari
Date of Last Edit: 2017: 01: 22
*/
var startGame;
var counter;
var startScreen;
var textX;
var textY;
var spaceShipPos;
var spaceShipVel;
var rocketShip;
var starInUniverse;
var instructionsMenu;
var endGameScreen;
var alien;
var alienLoop;
var alienPassed;
var mouseRelease;
var alienPoints;
var viewSpaceShip;
var startTime;
var widthStuff;
//makes it full screen
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	//basically what would've been in setup is in encapsuled in a different function to prevent bugs
	setupCommands();

}

function preload() {
	//loading images and text
	fontSpace = loadFont("BlackHoleBB.ttf");
	rocketShip = loadImage("spaceShip.png");
	alien = loadImage("alien.png");
}

function setupCommands() {
	//set starttime to frameCount for timer
	startTime = frameCount;
	//viewing spaceShip since I have the view set to false when they die
	viewSpaceShip = true;
	//points
	alienPoints = 0;
	//setting the image mode for distance function
	imageMode(CENTER);
	//lazer array
	lazer = [];
	alienPassed = 2;
	//booleans for game screens
	endGameScreen = false;
	instructionsMenu = false;
	//spaceShip initial pos
	spaceShipVel = createVector(0, 0);
	spaceShipPos = createVector(width / 4, height / 2);
	cursor(CROSS);
	//boolean for game screens
	startGame = false;
	//code for title on first screen
	counter = 0;
	textX = width / 2;
	textY = height + height / 5;
	//array for lasers
	laserPhoton = [];
	//array for alien spawn
	alienLoop = [];
	//creates 25 alien objects
	for (var g = 0; g < 25; g++) {
		alienLoop[g] = new AlienUFO();
	}
	//array for star object
	starInUniverse = [];
	//creates 200 stars
	for (var e = 0; e < 200; e++) {
		starInUniverse[e] = new Stars();
	}
	textFont(fontSpace);
}

function draw() {
	background(0);
	//if user clicks on screen in certain area game will start
	if (startGame === true) {
		//everything to do with playing the game
		playGame();
		//background
		starInSpace();
		//spawns spaceShip
		spaceShip();
		//timer function
		yourTimeIsUp();
	} else if (instructionsMenu === true) {
		//background
		starInSpace();
		//instructions screen
		instructions();
	} else if (endGameScreen === true) {
		//endGame screen displaying points and such
		endGame();
	} else {
		//if none of these are executed just stay on first screen
		startScreen();
		starInSpace();
	}
	//boolean for lasers since mouseClicked is spammed way to fast
	mouseRelease = false;
}

function spaceShip() {
	//PVECTORS FOR SPACESHIP so it functions like how thrust would in space... to an extent
	if (keyIsDown(65)) {
		spaceShipVel.x -= 0.5;
	}
	if (keyIsDown(68)) {
		spaceShipVel.x += 0.5;
	}
	if (keyIsDown(87)) {
		spaceShipVel.y -= 0.5;
	}
	if (keyIsDown(83)) {
		spaceShipVel.y += 0.5;
	}
	//adding velocity to spaceShip to make it move
	spaceShipPos.add(spaceShipVel);
	if (viewSpaceShip) { //if the view function for the spaceShip is true then display it, if not (only when endGameScreen is true) then dont display it
		image(rocketShip, spaceShipPos.x, spaceShipPos.y, 70, 70);
	}
	if (endGameScreen === true) {
		viewSpaceShip = false; //if endgame screen is true then dont display spaceShip and move it somewhere without velocity so it doesn't trigger something else
		spaceShipVel.y = 0;
		spaceShipVel.x = 0;
		spaceShipPos.x = width / 2;
		spaceShipPos.y = height / 1.2;
	}
}
//if the mouse is not pressed then this boolean is true
function mouseReleased() {
	mouseRelease = true;
}

function playGame() {
	//setting up where the lives of the player is
	text(alienPassed + " Lives left", width / 5, height / 10);
	//summoning object so that if the viewAlien becomes false then you add 2 points
	for (var t = 0; t < alienLoop.length; t++) {
		if (alienLoop[t].viewAlien === false) {
			alienPoints += 1;
		}
	}
	//shows how many points you have
	text(alienPoints + " Points", width / 2, height / 1.1);
	//if the lives go to 0 then show endGameScreen with stars falling displaying score etc.
	if (alienPassed === 0) {
		endGameScreen = true;
	}
	//if the spaceShip leaves the screen then end the game and subtract 10 from points
	if (spaceShipPos.x < 0 || spaceShipPos.x > width || spaceShipPos.y > height || spaceShipPos.y < 0) {
		alienPoints -= 10;
		endGameScreen = true;
	} else {
		//if none of these happen then spawn alien
		alienSpawning();

	}
	//if these conditions are fulfilled then  endGame Screen is true then end the game
	if (endGameScreen === true) {
		endGame();

	}
	//lazer array initialization
	if (mouseRelease) {
		//creates a new laser every time you click and release and then making it false again
		lazer[lazer.length] = new Laser();
		mouseRelease = false;

	}
	//initializing laser object with for loops
	for (var u = 0; u < lazer.length; u++) {
		lazer[u].Lasermove();
		lazer[u].showLaser();
	}
}

function endGame() {
	//endGameScreen
	background(0);
	push();
	colorMode(HSB, 255, 255, 255);
	fill(110, 255, 255);
	//shows points
	text("You Scored " + alienPoints + " points", width / 2, height / 2);
	//press backSpace to restart the game
	text("Press BackSpace to restart!", width / 2, height / 1.5);
	pop();
}

function yourTimeIsUp() {
	//timer code starting from 60 seconds
	if (endGameScreen === false) {
		var timer = int((60 - (frameCount - startTime) / 60));
		text(timer, width / 2, height / 10);
	}
	//when it reaches 0 end the game
	if (timer === 0) {
		endGameScreen = true;
	}
}

function instructions() { //instructions menu, pretty self explanatory, no variables here
	push();
	colorMode(HSB, 360, 255, 255);
	textSize(30);
	fill(150, 255, 255);
	text("The objective of this game is to get rid of the aliens attacking your ship from the right", width / 2, height / 6);
	text("All aliens require one photon laser to kill but will be moving towards you.", width / 2, height / 4);
	text("To obtain points, you must kill the aliens approaching your ship", width / 2, height / 3);
	text("Each alien is worth 2 points, if you die, then your score will be subtracted by 10", width / 2, height / 2.4);
	text("If you live, and kill aliens when the time runs out, your score will remain the same", width / 2, height / 2);
	text("Use the WASD keys to move and use left mouse to shoot. Happy Hunting!!!", width / 2, height / 1.5);
	text("Control your spaceship because if you exit the game page, you lose", width / 2, height / 1.7);
	textSize(30);
	fill(0, 255, 255);
	text("Hit the backspace key to go back to the homepage", width / 2, height / 1.2);
	pop();
}

function keyPressed() {
	// if the backspace key is pressed and you're reading the instructions then it redirects you back to the home page
	if (keyCode === BACKSPACE && instructionsMenu === true) {
		setupCommands();
		//if backspace key is pressed on endGame() then resets whole game starting from setup
	} else if (keyCode === BACKSPACE && endGameScreen === true) {
		setupCommands();
	}
}

function mouseClicked() {
	//starts game
	if (mouseX >= width / 2.5 && mouseX <= width / 2.5 + width / 5 && mouseY >= height / 2.2 && mouseY <= height / 2.2 + height / 13.5 && startGame === false) {
		startGame = true;
		startTime = frameCount;

	}
	//instructions for game
	if (mouseX >= width / 2.5 && mouseX <= width / 2.5 + width / 5 && mouseY >= height / 1.6 && mouseY <= height / 1.6 + height / 13) {
		instructionsMenu = true;
	}
}

function startScreen() {
	//text for name of game
	fill(255, 0, 0);
	stroke(255);
	textSize(70);
	textAlign(CENTER);
	push();
	textSize(30);
	stroke(140, 0, 0);
	text("Made by: Shyam Hari", width / 10, height / 1.1);
	pop();
	counter++;
	text("GALACTIC BOUNTY HUNTING", textX, textY);
	//counts up in counter till it stops subtracting from itself and the text stays at one spot
	if (counter > 0 && counter < 100) {
		textY -= width / 200;
	} else {}

	textSize(40);
	//highlights text if user scrolls over
	if (mouseX >= width / 2.5 && mouseX <= width / 2.5 + width / 5 && mouseY >= height / 2.2 && mouseY <= height / 2.2 + height / 13.5) {
		fill(0, 0, 255);

	}
	//button to play game
	text("Play Game", width / 2, height / 2);
	fill(255, 0, 0);
	//highlights text if user scrolls over
	if (mouseX >= width / 2.5 && mouseX <= width / 2.5 + width / 5 && mouseY >= height / 1.6 && mouseY <= height / 1.6 + height / 13) {
		fill(0, 0, 255);
	}
	//button for instructions
	text("Instructions", width / 2, height / 1.5);
}

function alienSpawning() { //alien spawning encapsulation found in playGame();
	for (var y = 0; y < alienLoop.length; y++) {
		alienLoop[y].moveAlien();
		alienLoop[y].showAlien();
	}
}

function starInSpace() { //displays stars in encapsulation, displayed in playGame();, startscreen, and instructions. Does not display when endGame is true
	//for loop that creates stars based on e for loop creating array size
	for (var i = 0; i < starInUniverse.length-1; i++) {
		starInUniverse[i].move();
		starInUniverse[i].show();
	}
}
