function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	
	x=mouseX
	y=mouseY
}

function draw() {
	background(255,0.9)
	var ang = map(mouseX,0,width,0,-PI*2,true)
	var ang2 = map(mouseY,0,height,0,-PI*2,true)
	x=lerp(x,mouseX,0.01)
	y=lerp(y,mouseY,0.2)
	
	fill(255,5)
	arc(width/2,height/2,x,x,ang,ang2,PIE)
}