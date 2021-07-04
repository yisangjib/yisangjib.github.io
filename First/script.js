let img;
let gridSize = 50;
grids = [];

function preload() {
  img = loadImage('https://source.unsplash.com/'+ windowWidth + 'x' + windowHeight + '/?cloud');
}

function setup() {
    createCanvas(windowWidth, windowHeight+500);
  background(10);

    let numberX = round(windowWidth/gridSize);
    let numberY = round(windowHeight/gridSize);
    let gridSizeX = windowWidth/numberX;
    let gridSizeY = windowHeight/numberY;

    for (let i = 0; i<numberX; i++){
        for(let j=0; j<numberY; j++){
            let index = j*numberX + i;
            let xPos = i*gridSizeX;
            let yPos = j*gridSizeY;
            grids[index] = new Grid(xPos,yPos,gridSizeX, gridSizeY);

        }
    }
}

function draw() {
  let numberX = round(windowWidth/gridSize);
  let numberY = round(windowHeight/gridSize);
  let gridSizeX = windowWidth/numberX;
  let gridSizeY = windowHeight/numberY;
  let indexX = floor(mouseX/gridSizeX);
  let indexY = floor(mouseY/gridSizeY);
  let index = indexY * numberX + indexX
  grids[index].display();

  //fader
  fill(255, 3);
  noStroke();
  rect(0, 0, width, height);
}

class Grid{

    constructor(x,y,w,h){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    }
    display(){

      this.img = image(img,this.x,this.y,this.w,this.h,this.x,this.y,this.w,this.h);

    }
}
