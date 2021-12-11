
function setup() {
  initializeFields();
	createCanvas(windowWidth, windowHeight);

  stroke(0, 0, 0);
}

function draw() {
  line(mouseX, mouseX, pmouseX, pmouseX);

}

// the background is updated 60 times per second so when ellipse drawn
// around the baackground it is deleted almost right away
function initializeFields() {
}

