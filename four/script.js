//PVector[] mesPoints;  // syntaxe Pjs
let mesPoints = []; // Syntaxe P5js

//vo id setup() {
function setup() {
    //size(600, 600); // syntaxe Pjs
    createCanvas(windowWidth, windowHeight); // syntaxe P5js
    //mesPoints = new PVector[0]; // syntaxe Pjs inutile
    for (var x = 0; x < width; x += 30) {
        for (var y = 0; y < height; y += 30) {
            //mesPoints = (PVector[]) append(mesPoints, new PVector(x, y)); // syntaxe Pjs
            mesPoints = append(mesPoints, createVector(x, y)); // syntaxe P5js
        }
    }
}

//void draw() {
function draw() {
    background(0);
    //for (PVector v : mesPoints) {
    for (var i = 0; i < mesPoints.length; i++) {
        let v = mesPoints[i];
        var distance = dist(mouseX, mouseY, v.x, v.y);
        if (distance < 5000) {
            var newX = mouseX - (mouseX - v.x) / 200.0 * distance;
            var newY = mouseY - (mouseY - v.y) / 200.0 * distance;
            ellipse(newX, newY, 5, 5);
        }
    }
}
