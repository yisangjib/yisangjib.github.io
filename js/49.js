var angle=0;

 
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(200);
}
function draw() {
	background(200);
	var dx=mouseX-width/2;
	var dy=mouseY-height/2;
	pointLight(255,255,0,dx,dy,-20);
	angle+=.03
	noStroke();
	specularMaterial(255,255,255);
	
	for(var j=-height/2; j<height/2; j+=50){
		for(var i=-width/2; i<width/2; i+=50){
			push();
			translate(i,j);
			rotateX(angle);
			rotateY(angle*.3);
			box(75,75,75);
			pop();
		}
	}
}