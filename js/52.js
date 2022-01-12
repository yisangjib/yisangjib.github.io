


function setup() {
  createCanvas(windowWidth, 300);
  frameRate(60);
}


function draw() {

	background(255);

	drawSky();


}  // close the draw function




function drawSky() {
  color1 = color(0, 0, 153); //blue
  color2 = color(204, 51, 0); //maroon
  background(220);
  setGradient(0, 0, width, height, color1, color2, "Y");
	
  var x = random(width);
  var y = random(height - 250);
  noStroke();
  fill(255, 255, 0);
  ellipse(x, y, 2, 2);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (var i = y; i <= y + h; i++) {
      inter = map(i, y, y + h, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (var j = x; j <= x + w; j++) {
      inter2 = map(j, x, x + w, 0, 1);
      d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}

