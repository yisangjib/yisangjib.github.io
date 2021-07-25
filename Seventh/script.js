var t;

function setup() {
    createCanvas(windowWidth, windowHeight+50);
    background(255);
    t = 0;
}

function draw() {
    // fade the background by giving it a low opacity
    background(5, 5);

    var x = width * noise(t);
    var y = height * noise(t + 5);
    var r = 255 * noise(t + 50);
    var g = 255 * noise(t + 25);
    var b = 255 * noise(t + 20);

    noStroke();
    fill(r+50, g+50, b+50);
    ellipse(x, y, 150, 150);

    t = t + 0.01;
}
