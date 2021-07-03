var t;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    t = 0;
}

function draw() {
    // fade the background by giving it a low opacity
    background(0, 0);

    var x = width * noise(t);
    var y = height * noise(t + 5);
    var r = 255 * noise(t + 50);
    var g = 255 * noise(t + 25);
    var b = 255 * noise(t + 20);

    noStroke();
    fill(r, g, b);
    ellipse(x, y, 100, 100);

    t = t + 0.01;
}
