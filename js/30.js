function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

}

function draw() {
	background(200);
	// ambientMaterial(250, 20, 20);
	rotateX(frameCount * 0.05);
	rotateY(frameCount * 0.05);

	fill(255);
	box(200, 200, 200);

}