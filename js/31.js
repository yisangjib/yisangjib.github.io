p5.disableFriendlyErrors = true;
let m = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB,360,255,255,255);
}

function draw() {
	translate(0,0,-160);
  background(255);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
	
	for (let i = 0; i < 70; i++) {
		let x = i * 4;

    ambientMaterial(50, 50, 50, 2);
		stroke((m + x * 1.5)%360, 100, 100);
		strokeWeight(1);
    box(x);
	}
	m++;
}

