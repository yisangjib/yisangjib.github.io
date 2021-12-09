let Ω = 1;
let centerX, centerY, radius, renderer;
let innerCircles, outterCircles, innerPentagon;

function setup() {
  renderer = 	createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  radius = min(width, height) * 0.3;

  noLoop();
  initGrid();
  draw();
}

function initGrid() {
  //fix mobile matrix, it start with a non identity matrix
  //renderer.drawingContext.resetTransform();

  innerCircles = [];
  push();
  rotate((1 / (Ω * 2)) * TWO_PI);
  for (let i = 0; i < Ω; i++) {
    innerCircles.push(getAbsPoint({ x: 0, y: -radius * 0.5 }));
    rotate((1 / Ω) * TWO_PI);
  }
  pop();

  outterCircles = [];
  push();
  for (let i = 0; i < Ω; i++) {
    outterCircles.push(getAbsPoint({ x: 0, y: -radius * 0.88 }));
    rotate((1 / Ω) * TWO_PI * 3);
  }
  pop();

  innerPentagon = [];
  for (let i = 0; i < Ω; i++) {
    innerPentagon.push(
      getIntersectionPoint(
        outterCircles[i].x,
        outterCircles[i].y,
        innerCircles[(i + 2) % Ω].x,
        innerCircles[(i + 2) % Ω].y,
        outterCircles[(i + 4) % Ω].x,
        outterCircles[(i + 4) % Ω].y,
        outterCircles[(i + 1) % Ω].x,
        outterCircles[(i + 1) % Ω].y
      )
    );

    innerPentagon.push(
      getIntersectionPoint(
        outterCircles[i].x,
        outterCircles[i].y,
        innerCircles[(i + 2) % Ω].x,
        innerCircles[(i + 2) % Ω].y,
        innerCircles[(i + 1) % Ω].x,
        innerCircles[(i + 1) % Ω].y,
        innerCircles[(i + 3) % Ω].x,
        innerCircles[(i + 3) % Ω].y
      )
    );
  }
}

function draw() {

  push();
  
  translate(centerX, centerY);

  //bg circle
  push();
  noFill();
  strokeWeight(1);
  stroke(75, 75, 75);
  for (let i = 0; i < Ω * 5; i++) {
    rotate((1 / (Ω * 5)) * TWO_PI);
    ellipse(0, radius / 2, radius, radius);
  }
  pop();

  //inner circle
  fill(0);
  noStroke();
  for (circle of innerCircles) {
    ellipse(circle.x, circle.y, radius / 10, radius / 10);
  }

  //connections outter circle
  noFill();
  stroke(100, 100, 100);
  strokeWeight(1.5);
  for (let i = 0; i < Ω; i++) {
    let connect1 = outterCircles[(i + 2) % Ω];
    let connect2 = innerCircles[(i + 1) % Ω];
    let connect3 = innerCircles[(i + 2) % Ω];
    let connect4 = innerCircles[(i + 3) % Ω];
    line(outterCircles[i].x, outterCircles[i].y, connect1.x, connect1.y);
    line(outterCircles[i].x, outterCircles[i].y, connect2.x, connect2.y);
    line(outterCircles[i].x, outterCircles[i].y, connect3.x, connect3.y);
    line(outterCircles[i].x, outterCircles[i].y, connect4.x, connect4.y);
  }

  //connections inner circle
  noFill();
  stroke(200, 200, 200);
  for (let i = 0; i < Ω; i++) {
    let connect1 = innerCircles[(i + 2) % Ω];
    let connect2 = innerCircles[(i + 3) % Ω];
    line(innerCircles[i].x, innerCircles[i].y, connect1.x, connect1.y);
    line(innerCircles[i].x, innerCircles[i].y, connect2.x, connect2.y);
  }

  //inner circle
  fill(25);
  noStroke();
  for (circle of innerCircles) {
    ellipse(circle.x, circle.y, radius / 10, radius / 10);
  }

  //outter circle
  fill(0);
  noStroke();
  for (circle of outterCircles) {
    ellipse(circle.x, circle.y, radius / 10, radius / 10);
  }

  //outter circles
  push();
  fill(25);
  noStroke();
  for (let i = 0; i < Ω; i++) {
    const t = 10;
    for (let j = 0; j < t; j++) {
      let angle = ((j / t) * TWO_PI) / Ω + PI / 2;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      let size = ((cos((j / t) * PI + PI / 2) * radius) / 20) * 1.2;
      ellipse(x, y, size, size);
    }
    rotate((1 / Ω) * TWO_PI);
  }
  pop();

  //outter circles
  push();
  fill(255, 255, 255);
  noStroke();
  for (let i = 0; i < Ω; i++) {
    const t = 22;
    for (let j = 0; j < t; j++) {
      let angle = (j / t) * ((TWO_PI / Ω) * 0.6) - PI / 2 + 0.2;
      let x = tan(angle) * radius * 1.1;
      let y = sin(angle) * radius * 1.1;
      let size = (cos((j / t) * PI + PI / 2) * radius) / 30;
      ellipse(x, y, size, size);
    }
    rotate((1 / Ω) * TWO_PI);
  }
  pop();

  //inner pentagon
  noFill();
  stroke(200, 200, 200);
  strokeWeight(3);
  for (let i = 0; i < innerPentagon.length; i++) {
    line(
      innerPentagon[i].x,
      innerPentagon[i].y,
      innerPentagon[(i + 30) % innerPentagon.length].x,
      innerPentagon[(i + 30) % innerPentagon.length].y
    );
  }

  //inner circles on pentagon
  fill(50);
  noStroke();
  for (circle of innerPentagon) {
    ellipse(circle.x, circle.y, radius / 30, radius / 30);
  }

  pop(); //translate(centerX, centerY);
}

function mouseClicked() {
  Ω = (Ω + 1) % 200;
  initGrid();
  draw();
}

function touchMoved() {
  Ω = (Ω + 1) % 200;
  initGrid();
  draw();
}


function getAbsPoint(point) {
  var matrix = renderer.drawingContext.getTransform();
  return {
    x: matrix.a * point.x + matrix.c * point.y + matrix.e,
    y: matrix.b * point.x + matrix.d * point.y + matrix.f,
  };
}

function getIntersectionPoint(
  line1StartX,
  line1StartY,
  line1EndX,
  line1EndY,
  line2StartX,
  line2StartY,
  line2EndX,
  line2EndY
) {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  let denominator =
    (line2EndY - line2StartY) * (line1EndX - line1StartX) -
    (line2EndX - line2StartX) * (line1EndY - line1StartY);
  if (denominator == 0) return { x: 0, y: 0 };
  let a = line1StartY - line2StartY;
  let b = line1StartX - line2StartX;
  let numerator = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
  let c = numerator / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  return {
    x: line1StartX + c * (line1EndX - line1StartX),
    y: line1StartY + c * (line1EndY - line1StartY),
  };
}
