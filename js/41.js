let earthOrbit = 0;
let moonOrbit = 180;


function setup() {
		createCanvas(windowWidth, windowHeight);
}

let middleX = innerWidth / 2;
let middleY = innerHeight / 2;

function draw() {
	background(255);
	//Draw Sun
	fill(0);
	noStroke();
	ellipse(middleX, middleY, 150, 150);
	
	//Draw Earth
	push();
	translate(middleX,middleY);
	rotate(radians(earthOrbit));
	fill(150, 150, 150);
	ellipse(180,0, 50,50);
		push();
		translate(180,0);
		rotate(radians(moonOrbit));
		fill(220, 220, 220);
		ellipse(55,0, 25,25);
		pop();
	pop();
	
	earthOrbit = earthOrbit +1;
	moonOrbit = moonOrbit +3.75;
}