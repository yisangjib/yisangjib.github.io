let mesPoints = [];

function setup() {
  	createCanvas(windowWidth, windowHeight);

  for (var x = 0; x < width; x += 100) {
    for (var y = 0; y < height; y += 100) {
      mesPoints = append(mesPoints, createVector(x, y)); // syntaxe P5js
    }
  }
}

function draw() {

  //for (PVector v : mesPoints) {
  for (var i = 0; i < mesPoints.length; i++) {
    let v = mesPoints[i];
    var distance = dist(mouseX, mouseY, v.x, v.y);
    if (distance < 100) {
      var newX = mouseX - ((mouseX - v.x) / 50.0) * distance;
      var newY = mouseY - ((mouseY - v.y) / 50.0) * distance;
      ellipse(newX, newY, 1, 1);
    }
  }
}