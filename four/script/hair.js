var position = [];
var hair = Math.floor((Math.random() * (30 - 1) + 1));


function getRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (var i = 0; i < 150; i = i + 100) {
        position.push({ x: Math.random() * width, y: Math.random() * height });
    }


}

function draw() {
    background(255);

    for (var i = 0; i < position.length; i = i + 150) {
        position[i].x = position[i].x + Math.random() * 8 - 4;
        position[i].y = position[i].y + Math.random() * 8 - 4;

        noFill();
        strokeCap(ROUND);
        smooth()

        bezier(windowWidth / 1.93, windowHeight / 1.8, hair * 8, hair * 35, hair + 5, hair + 100, hair * 100, hair + 1000);
        // line(hair * 30, hair * 50, position[i].x, position[i].y);

    }
}
