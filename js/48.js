let angle = 0;
let atarget = 0;
let atargetoff = -360;
let g = 0;
let gtarget = 0;
let gtl = 0;
let gth = 255;
let size;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	size = height / 5;
}

function draw() {
	background(255);
	translate((width / 2) - (height / 2), 0);

	let xpos = constrain(mouseX, 0, width);
	atarget = map(xpos, 0, width, -360, 360);
	atarget = (45) * round(atarget / 45);
	angle = lerp(angle, atarget + atargetoff, 0.05);
	gtarget = map(mouseY, 10, height - 10, gtl, gth);
	g = lerp(g, gtarget, 0.02);
	fill(g);

	for (let y = height / 4; y < height; y += height / 4) {
		for (let x = height / 4; x < height; x += height / 4) {
			noStroke();
			ellipse(x, y, size, size);
		}
	}

	fill(255 - g);
	arc(height / 4, height / 4, size, size, angle + 0, angle + 90);
	arc(height / 2, height / 4, size, size, angle + 0, angle + 180);
	arc(3 * height / 4, height / 4, size, size, angle + 90, angle + 180);
	arc(height / 4, 2 * height / 4, size, size, angle + 270, angle + 450);
	arc(height / 2, 2 * height / 4, size, size, angle + 0, angle + 360);
	arc(3 * height / 4, 2 * height / 4, size, size, angle + 90, angle + 270);
	arc(height / 4, 3 * height / 4, size, size, angle + 270, angle + 360);
	arc(height / 2, 3 * height / 4, size, size, angle + 180, angle + 360);
	arc(3 * height / 4, 3 * height / 4, size, size, angle + 180, angle + 270);
}
