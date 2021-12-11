let MAX_INIT_SIZE, MAX_ANGLE_STEP, SIZE_MULT, MIN_SIZE;
let initSize, initAngle, initColIndex;
let url = "https://coolors.co/app/fff-C8C8C8";
let cols;
let lapse = 0; // mouse timer

function setup() {
  createCanvas(812, 812);
  rectMode(CENTER);
  noStroke();
  cols = createCols(url);
  //init param
  MAX_INIT_SIZE = max(width, height) * 1.5;
  MAX_ANGLE_STEP = PI / 20;
  SIZE_MULT = 0.95;
  MIN_SIZE = 2;
  initSize = MAX_INIT_SIZE;
  initAngle = 0;
  initColIndex = 0;
}

function draw() {
  let count = sin(frameCount / 150);
  let angleStep = MAX_ANGLE_STEP * count;
  let colIndex = initColIndex;
  let size = initSize;
  let angle = initAngle;

  while (size > MIN_SIZE) {
    push();
    translate(width / 2, height / 2);
    rotate(angle);
    fill(cols[colIndex % cols.length]);
    rect(0, 0, size, size, colIndex + size * 0.15);
    pop();
    angle += angleStep * map(size, MIN_SIZE, MAX_INIT_SIZE, 1, 0, false);
    size *= SIZE_MULT;
    colIndex++;
  }

  initSize -= MAX_INIT_SIZE * 0.002 * (1 + abs(count));
  initAngle += angleStep * 0.1;

  if (initSize < MAX_INIT_SIZE * SIZE_MULT) {
    initSize /= SIZE_MULT;
    initColIndex = (initColIndex + cols.length - 1) % cols.length;
  }
}

function createCols(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = "#" + arr[i];
  }
  return arr;
}