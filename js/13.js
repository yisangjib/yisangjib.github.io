// Tweak of Bezier Ellipse (Ch7. Curves)
var px, py, cx, cy, cx2, cy2;

var n1, n2, incr1, incr2;

var pts;

function setup() {
  initializeFields();
  createCanvas(windowWidth, windowHeight);
  frameRate(16);
  n1 = 0;
  // control
  n2 = 0;
  incr1 = 1;
  incr2 = 0.5;
  pts = 2;
}

function draw() {

  n1 += incr1;
  n2 += incr2;
  if (n1 > 500 || n1 < -500) incr1 *= -1;
  if (n2 > 500 || n2 < -500) incr2 *= -1;
  setEllipse(pts, n1, n2);
  drawEllipse();
}

function setEllipse(points, radius, controlRadius) {
  pts = points;
  px = new Array(points);
  py = new Array(points);
  cx = new Array(points);
  cy = new Array(points);
  cx2 = new Array(points);
  cy2 = new Array(points);
  var angle = 360.0 / points;
  var controlAngle1 = angle / 3.0;
  var controlAngle2 = controlAngle1 * 2.0;
  for (var i = 0; i < points; i++) {
    px[i] = width / 2 + cos(radians(angle)) * radius;
    py[i] = height / 2 + sin(radians(angle)) * radius;
    cx[i] =
      width / 2 +
      (cos(radians(angle + controlAngle1)) * controlRadius) /
        cos(radians(controlAngle1));
    cy[i] =
      height / 2 +
      (sin(radians(angle + controlAngle1)) * controlRadius) /
        cos(radians(controlAngle1));
    cx2[i] =
      width / 2 +
      (cos(radians(angle + controlAngle2)) * controlRadius) /
        cos(radians(controlAngle1));
    cy2[i] =
      height / 2 +
      (sin(radians(angle + controlAngle2)) * controlRadius) /
        cos(radians(controlAngle1));
    angle += 360.0 / points;
  }
}

function drawEllipse() {
  strokeWeight(3);
  stroke(color(200));
  fill(color(255));
  for (var i = 0; i < pts; i++) {
    if (i == pts - 1)
      bezier(px[i], py[i], cx[i], cy[i], cx2[i], cy2[i], px[0], py[0]);
    else
      bezier(
        px[i],
        py[i],
        cx[i],
        cy[i],
        cx2[i],
        cy2[i],
        px[i + 1],
        py[i + 1]
      );
  }
  for (var i = 0; i < pts; i++) {
    if (i == pts - 1) line(px[0], py[0], cx2[i], cy2[i]);
    if (i > 0) line(px[i], py[i], cx2[i - 1], cy2[i - 1]);
    line(px[i], py[i], cx[i], cy[i]);
  }
}

function touchEnded() {
  pts += 1;
}

function initializeFields() {
  px = null;
  py = null;
  cx = null;
  cy = null;
  cx2 = null;
  cy2 = null;
  n1 = 0;
  n2 = 0;
  incr1 = 0;
  incr2 = 0;
  pts = 0;
}
