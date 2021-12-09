var x=0;
var y=0;
var vy=1;
var vx=3;
var p=0.8;
function setup() {
		createCanvas(windowWidth, windowHeight);

}

function draw() {
	ellipse(x,y,16);
	fill(0);
	noStroke();
	x+=1*vx;
	y+=0.21*vy;
	vy++;
	if(y>windowHeight){
		
		vy=-150*p;
		p*=0.9;
		vx*=0.9;
		
	}
	if(x>windowWidth){
		vx*=-1;
	}
	if(x<0){
		vx*=-1;
	}
	
	
	
}