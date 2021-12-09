let n = 16;
let s = 5;
let a;

function setup() {
  createCanvas(375, 812);
  noStroke();
  colorMode(RGB);
  randomize();
}

function draw() {
  let b = [];

  for (let x = 0; x < width / s; x++) {
    b[x] = [];
    for (let y = 0; y < height / s; y++) {
      let newNum = a[x][y];
      if (x != 0) {
        if (a[x - 1][y] == (a[x][y] + 1) % n) {
          newNum = a[x - 1][y];
        }
      }
      if (x != 0 && y != 0) {
        if (a[x - 1][y - 1] == (a[x][y] + 1) % n) {
          newNum = a[x - 1][y - 1];
        }
      }
      if (x != 0 && y != floor(height / s) - 1) {
        if (a[x - 1][y + 1] == (a[x][y] + 1) % n) {
          newNum = a[x - 1][y + 1];
        }
      }
      if (x != floor(width / s) - 1) {
        if (a[x + 1][y] == (a[x][y] + 1) % n) {
          newNum = a[x + 1][y];
        }
      }
      if (x != floor(width / s) - 1 && y != 0) {
        if (a[x + 1][y - 1] == (a[x][y] + 1) % n) {
          newNum = a[x + 1][y - 1];
        }
      }
      if (x != floor(width / s) - 1 && y != floor(height / s) - 1) {
        if (a[x + 1][y + 1] == (a[x][y] + 1) % n) {
          newNum = a[x + 1][y + 1];
        }
      }
      if (y != floor(height / s) - 1) {
        if (a[x][y + 1] == (a[x][y] + 1) % n) {
          newNum = a[x][y + 1];
        }
      }
      if (y != 0) {
        if (a[x][y - 1] == (a[x][y] + 1) % n) {
          newNum = a[x][y - 1];
        }
      }
      b[x][y] = newNum;
      fill(map(a[x][y], 0, n - 1, 0, 255), 255, 0);
      rect(x * s, y * s, s, s);
    }
  }
  a = b;
}

function randomize() {
  a = [];
  for (let x = 0; x < width / s; x++) {
    a[x] = [];
    for (let y = 0; y < height / s; y++) {
      a[x][y] = floor(random(n));
    }
  }
}
