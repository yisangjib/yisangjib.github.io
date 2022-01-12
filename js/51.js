function setup() {
	createCanvas(windowWidth+100, windowHeight+100);
	drawingContext.shadowOffsetX = 45;
  drawingContext.shadowOffsetY = 45;
  noStroke();
  fill(0);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0);
	blendMode(SCREEN);

	randomSeed(1);
	for(let i = 0; i < 10; i++){
		drawingContext.shadowBlur = random(1,600);
		drawingContext.shadowColor = color(random(44,155),random(44,155),random(44,155));
		ellipse((random(width)+frameCount*random(40,100))%width, (random(height)+sin(frameCount/random(20,50))*random(height/2)+height)%height, mouseX);

	}
}
