var n = 0;
let xoff = 0.0;
let yoff = 1000;
let x = 0;
let graphics;
let speed = 1;

function preload() {
  // myFont = loadFont('ExperimentalKana-Regular.otf');
  //myFont = loadFont('FiraCode-Bold.ttf');
}

function setup() {
  	createCanvas(windowWidth, windowHeight);

  //pixelDensity(1);
}

function draw() {
  background(255, 1);
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = "white";
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = 'black';

  let n1 = noise(xoff) * width;
  let a1 = noise(yoff) * height;

  let wave1 = cos(frameCount * 0.009) * 500;
  if (wave1 < 0) {
    wave1 = -wave1;
  }

  // for (let i=100; i<width ; i=i+200) {
  // for (let ii=100; ii<height; ii=ii+200){
  // let fb=random(200);
  // line(mouseX,mouseY,0,0);

  translate(width / 2, height / 2);
  rotate(frameCount * 0.007);

  //textFont(myFont);
  //textSize(200);
  noStroke(0);
  //stroke(255);
  rectMode(CENTER);
  fill(0, 0, 0);
  rect(0, 0, wave1, wave1);
  // rect(noise(xoff) * width,noise(yoff) * height,10,10);

  // textAlign(CENTER,CENTER);
  // text('n',noise(xoff) * width,noise(yoff) * height);

  // }

  xoff += 0.005;
  yoff += 0.005;
  x = x + speed;

  if (a1 > height || a1 < 0) {
    speed = speed * -1;
  }

  // }
}
