function setup() {
	createCanvas(windowWidth, windowHeight);
background(0);

}

function draw() {

noFill();

var max_rad = 32;
var min_rad = 8;

from = color(0);
to = color(255);
c1 = lerpColor(from, to, 0.1);
c2 = lerpColor(from, to, 0.2);
c3 = lerpColor(from, to, 0.3);
c4 = lerpColor(from, to, 0.4);
c5 = lerpColor(from, to, 0.5);
c6 = lerpColor(from, to, 0.6);
c7 = lerpColor(from, to, 0.7);
c8 = lerpColor(from, to, 0.8);
c9 = lerpColor(from, to, 0.9);

for(let i = 0; i <= width; i += 50) {
	
	for(let j = 0; j <= height; j += 50) {
	
		
		if (rad < 1) {
			stroke(from);
		} else if (rad < 4) {
			stroke(c1);
		} else if (rad < 8) {
			stroke(c2);
		} else if (rad < 12) {
			stroke(c3);
		} else if (rad < 16) {
			stroke(c4);
		} else if (rad < 20) {
			stroke(c5);
		} else if (rad < 24) {
			stroke(c6);
		} else if (rad < 28) {
			stroke(c7);
		} else if (rad < 32) {
			stroke(c8);
		} else if (rad < 48) {
			stroke(c9);
		} else {
			stroke(to);
		}
		

		strokeWeight(rad / 50);
		
		var rad = max(min_rad, max_rad - dist(i, j, mouseX, mouseY)/16);
		
		rectMode(CENTER);
		
		circle(i, j, rad * sin(millis()/2000) * 8);
		circle(i, j, rad * sin(millis()/1750) * 4);
		circle(i, j, rad * sin(millis()/1750) * 2);
		circle(i, j, rad * sin(millis()/1750) * 20);
		circle(i+70, j+70, rad * sin(millis()/1750) * 20);
		circle(i-70, j-70, rad * sin(millis()/2000) * 4);
		
	}
}

}
