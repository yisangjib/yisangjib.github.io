function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  normalMaterial();
}
function draw() {
  ;
  orbitControl(100);
	rotateZ(millis() / 1000);
  rotateY(0.5);
  box(mouseX/2, mouseX/2,200, mouseY);
}