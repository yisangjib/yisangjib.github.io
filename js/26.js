var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var lapse = 0;
var randx, randy;
var partMax = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	colorMode(HSB, 255);
}

function draw() {
	background(255);
	if (frameCount - lapse > 2){
    lapse = frameCount;
	  randX = random(width);
	  randY = random(height);
	  if (mass.length < partMax) party();  // change partMax to maximum particles you want to allow.
	}
	for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				var force = (distance - 320) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
	}
	
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		fill(particle/mass.length * 255, 255, 255);
		ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
	}
}

function addNewParticle() {
	mass.push(random(0.003, 0.03));
  positionX.push(randX);
  positionY.push(randY);
	velocityX.push(0);
	velocityY.push(0);
}

function party() {
	addNewParticle();
}