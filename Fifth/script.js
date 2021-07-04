let sw, alpha;
let yStep = 10;
let arcSize = 400;

function setup() {
    createCanvas(windowWidth, windowHeight + 500);
    colorMode(HSB, 255);
    smooth(16);
    mouseX = width / 10;
    mouseY = height / 10;
}

function draw() {
    background("#000000");
    mouseX = constrain(mouseX, 10, width);
    mouseY = constrain(mouseY, 10, height);

    yStep = mouseY;
    arcSize = mouseX;

    noFill();
    stroke(20);
    strokeWeight(3);

    for (let y = 0; y < height; y += yStep / 2) {
        for (let x = 0; x < width + arcSize; x += arcSize) {
            stroke(y / 3 % 255, 255, 255);
            arc(x, y, arcSize, arcSize / 3, y, PI);
            arc(x + arcSize / 2, y, arcSize / 2, arcSize / 2, PI, TWO_PI);
        }
    }
}
