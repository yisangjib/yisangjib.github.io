var mouseSize = 100;


function setup() {
  	createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(255);
  stroke(0);
  
  for (var y = 0; y < height; y += 40) {
    for (var x = 0; x < width; x += 40) {
      var pos = new p5.Vector(x, y);
      
      var d = dist(x, y, mouseX, mouseY);
      
      pos.sub(mouseX, mouseY);
      pos.normalize();
      pos.mult(mouseSize-d);
      
      if (d < mouseSize) {
      	pos.mult(0.25);
      } else {
        pos.mult(-d*0.001);
      }
      
      pos.add(x, y);
      
      strokeWeight(max((mouseSize-min(d, mouseSize))*0.05, 2));
      point(pos.x, pos.y);
    }
  }
}