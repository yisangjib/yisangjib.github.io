var time;
var luv = Math.floor(Math.random() * (100 - 10) + 10);

function setup() {
  initializeFields();
  	createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  noFill();

}

function draw() {
  for (var i = 0; i < luv; i++) {
    rectoid(frameCount - time - 812, i);
  }
}

function rectoid(time, index) {
  stroke((time * noise(index)) % 100, 0, 0, 25);
  rect(width / 2, height / 2, sin(index) * time, cos(index) * time);
}

// function touchStarted() {
//   background(0);
//   time = frameCount;
// }

function initializeFields() {
  time = 0;
}
