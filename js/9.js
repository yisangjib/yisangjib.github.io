
function setup() {
  initializeFields();
  	createCanvas(windowWidth, windowHeight);
  stroke(1);
 
}

function draw() {
  background(200);
  make_triangle(millis() / 30);
}

function make_triangle(n) {
  var n1 = n / 2;
  var n2 = n - n1;
  split_triangle(n1, 1, 1, 1, height - 1, width - 1, height - 1);
  split_triangle(n2, 1, 1, width - 1, 1, width - 1, height - 1);
}

function split_triangle(n, x0, y0, x1, y1, x2, y2) {
  triangle(x0, y0, x1, y1, x2, y2);
  if (n <= 1)
      return;
  var d1 = dist(x0, y0, x1, y1);
  var d3 = dist(x2, y2, x0, y0);
  var k = (d1 / d3) * (d1 / d3);
  var x3 = k * (x2 - x0) + x0;
  var y3 = k * (y2 - y0) + y0;
  var n1 = n / 2;
  var n2 = n - n1;
  split_triangle(n1, x0, y0, x3, y3, x1, y1);
  split_triangle(n2, x2, y2, x3, y3, x1, y1);
}

function initializeFields() {
}

