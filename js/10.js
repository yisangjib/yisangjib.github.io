var opacity = 2; 
function setup(){
  createCanvas(windowWidth, windowHeight);
	background(200);
}
function draw() {
  rectangle();
}


function rectangle(){
	noStroke();
	fill(0,10);
  //fill(0,0,0,opacity);
  translate(frameCount % width,frameCount % height);
  rotate(radians(frameCount));
  rect(0, 0, 50, 50);
	rect(100, 100, 50, 50);
	rect(200, 200, 50, 50);
	
}