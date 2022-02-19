var h = 127; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
}

function draw() {

  
  var b = 128 + (sin(frameCount/60)*h); 
  background(0, 255, b);


}