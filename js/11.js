function setup() {
	createCanvas(windowWidth, windowHeight);

particles = [];
for(var i = 0; i < 5000; i++){
	particles.push({});
	particles[i].x = 0;
	particles[i].y = 0;
	particles[i].xs = 0;
	particles[i].ys = 0;
}
stroke(0);
strokeWeight(2);
noFill();
}

var particles;

function draw() {
clear();
beginShape();
for(var i = 0; i < particles.length; i++){
	const p = particles[i];
	const v = createVector(mouseX - p.x, mouseY - p.y);
	v.setMag(v.mag() - 50);
	p.xs += v.x / 4;
	p.ys += v.y / 4;
	p.xs /= 1 + ((i + 100) / 300);
	p.ys /= 1 + ((i + 100) / 300);
	p.x += p.xs;
	p.y += p.ys;
	vertex(p.x, p.y);
}
endShape();
}




