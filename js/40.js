//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

var angle;

function setup() {
  	createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  angle = cos(frameCount * 0.009);
  strokeWeight(3);
  stroke(0);
  fill(255);
  translate(width / 2, height / 2);
  for (var i = 0; i < 200; i++) {
    rotate(angle);
    scale(.825);
    circle(0 + i * 200, 0, windowWidth / 20.25, windowWidth / 20.25);
  }
}