
	
	var theta = 0.0;
	var rotSpeed = 0.00015;
	var rectWidthMult = 20;
	var rectHeightMult = 20;

function setup() {
		createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
}

function draw() {
	//set stroke/no fill
	strokeWeight(0.1);
	noFill();

	
	push(); //reset
	//set middle of canvas for rotation
	translate(width / 2, height / 2);
	//for loop to draw squares
	for (x = 0; x < 250; x++){
		//rotate command
		rotate(theta);
		//draw squares
		rect(50, 50, x*rectWidthMult, x*rectHeightMult);
	}
	pop(); //reset
	theta += rotSpeed; //update rotation angle to rotation speed
}
