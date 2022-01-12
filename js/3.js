// By Roni Kaufman

let kMax;
let step;
let n = 100; // number of blobs
let radius = 0; // diameter of the circle
let inter = 0.25; // difference between the sizes of two blobs
let maxNoise = 500;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  //colorMode(HSB, 255);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = 1000;
	step = 0.01;
	noStroke();
	//strokeWeight(1);
}

function draw() {
  background(255);
	let t = frameCount/100;
	kMax = noise(t/1.5);
  
  for (let i = n; i >= 0; i--) {
		let alpha = 1 - noiseProg(i / n);
		if (i % 2 === 0) {
			fill(0);
		} else {
			fill(255,155,64);
		}
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k, t + i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 10;
  for (let theta = 0; theta <= 360 + angleStep * 20; theta += angleStep) {
    let r1, r2;
		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}