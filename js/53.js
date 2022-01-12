var h = 127; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(500);
}

function draw() {

  
  var b = 128 + (sin(frameCount/60)*h); 
  background(230, 100, b);
	
  if (b < 0) {
    fill(20,20,20);
    textSize(b * -28);
    text("beep boop", 200, 600);
  }

}