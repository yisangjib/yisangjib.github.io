const nbEllipses = 7;
const smallestDiameter = 70;
const diameterIncrement = 25;
const controlPointOffset = 10;

var x = 0,
    y = 0;
var positionHistory = [];
var angleMeter;

function setup() {
    createCanvas(displayWidth, displayHeight+400);


    noStroke();
    smooth();
    while (positionHistory.length < nbEllipses * 2) {
        positionHistory.push([0, 0, 0]);
    }
    angleMeter = new AngleMeter(smallestDiameter / 2.0);
    x = positionHistory[0][0];
    y = positionHistory[0][1];
}

function draw() {
    positionHistory.pop();
    x = 0.6 * x + 0.4 * mouseX;
    y = 0.6 * y + 0.4 * mouseY;
    angleMeter.drag(x, y);
    positionHistory.unshift([x, y, angleMeter.angle]);
    drawEllipses();
}

function drawEllipses() {
    background(255);
    for (var i = 0; i < nbEllipses; i++) {
        let positionIndex = 2 * (nbEllipses - 1 - i);
        let position = positionHistory[positionIndex];
        let majorAxis = smallestDiameter + diameterIncrement * (nbEllipses - 1 - i);
        drawEllipse(position, majorAxis, i % 2 == 0 ? 255 : 0);
    }
}

function drawEllipse(x_y_angle, majorAxis, fillColor) {
    fill(fillColor);
    push();
    translate(x_y_angle[0], x_y_angle[1]);
    rotate(x_y_angle[2]);
    ellipse(-controlPointOffset, 0, majorAxis, majorAxis * 0.75);
    pop();
}

class AngleMeter {
    constructor(distance) {
        this.angle = 0;
        this.draggedPoint = [0, 0];
        this.distance = distance;
    }
    drag(x, y) {
        const dx = x - this.draggedPoint[0];
        const dy = y - this.draggedPoint[1];
        this.angle = Math.atan2(dy, dx);
        this.draggedPoint[0] = x - (Math.cos(this.angle) * this.distance);
        this.draggedPoint[1] = y - (Math.sin(this.angle) * this.distance);
    }
}
