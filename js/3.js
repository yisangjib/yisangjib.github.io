function setup() {
  createCanvas(windowWidth, windowHeight);

}
function draw() {
fill(100);
stroke( random( 250, 200) );

noFill();
// ellipse(mouseX, mouseY, 200, 200);

translate(mouseX, mouseY);
rotate( millis() /10);
rect( 10, 0, 200, 200);
}