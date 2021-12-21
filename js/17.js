var max;
var x;
var y;

var maxc;
var t;
var j;


function setup() {
  	createCanvas(windowWidth, windowHeight);
  fill(1);
  noStroke();
  blendMode(ADD);
  background(0);
  frameRate(30);
  
  randomSeed(9);
  max = 80;
  maxc = 800;
  t = new Array(maxc);
  j = new Array(maxc);
  
  for(var i = 0; i < maxc; i++) {
  	t[i] = random(1.0);
    j[i] = floor(random(max/4));
  }
  
  x = new Array(max);
  y = new Array(max);

  for(var i = 0; i < max; i++) {
    
    x[i] = random(width/2) + width/4;
    y[i] = random(height/2) + height/4;
  
  }
  for(var i = 4; i < max; i += 4) {
    x[i] = x[i-1];
    x[i+1] = 2*x[i] - x[i-2];
    y[i] = y[i-1];
    y[i+1] = 2*y[i] - y[i-2];
 
  }
  x[0] = x[max-1];
  x[1] = 2*x[0] - x[max-2];
  y[0] = y[max-1];
  y[1] = 2*y[0] - y[max-2];

}



function draw() {
  clear();
  background(230);
  for(var i = 0; i < maxc; i++) {
    var px = bezierPoint(x[j[i]],x[j[i]+1],x[j[i]+2],x[j[i]+3],t[i]);
    var py = bezierPoint(y[j[i]],y[j[i]+1],y[j[i]+2],y[j[i]+3],t[i]);
    rect(px-100,py-100,200,200);
    
  	t[i] += 1/30.0;
  	if(t[i] > 1) {
    	t[i] = 0;
    	j[i] += 4;
 	   	j[i] = j[i] % max;
    }
  }
}