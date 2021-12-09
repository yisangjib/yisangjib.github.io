cubeDepth = 8;
cubeSize = 30;

sphereSize = 10;
sAmp = 300;

var v1 = 0;
var v2 = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	// background(150);
}

function draw() {
	
	background(200);
	
	rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);
	
	drawSpheres();
	drawCubes();
}

function drawSpheres() {
	var t = frameCount * 0.03;
	v1 = sAmp * sin(t);
	v2 = v1 * cos(t);
	
	push();
	translate(v1, v2, 0);
	sphere(sphereSize);
	pop();
	
	push();
	translate(0, v1, v2);
	sphere(sphereSize);
	pop();
}

function drawCubes() {
	var offset = (cubeDepth/2) * cubeSize;
	for(let i = 0; i < cubeDepth; i ++) {
		for(let j = 0; j < cubeDepth; j ++) {
			for(let k = 0; k < cubeDepth; k ++) {
				push();
				translate(i * cubeSize - offset, j * cubeSize - offset, k * cubeSize - offset)
				var d1 = dist3D(v1, v2, 0, i * cubeSize - offset, j * cubeSize - offset, k * cubeSize - offset);
				var d2 = dist3D(0, v1, v2, i * cubeSize - offset, j * cubeSize - offset, k * cubeSize - offset);
				var d = min(d1, d2);
				box(constrain(map(d, sphereSize * 10, sphereSize * 16, 0, cubeSize), 0, cubeSize));
				pop();
			}
		}
	}
}

function dist3D(x, y, z, i, j, k) {
	return sqrt(sq(x-i) + sq(y-j) + sq(z-k));
}