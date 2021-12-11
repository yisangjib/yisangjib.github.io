function setup(){
  createCanvas(windowWidth, windowHeight);

}

var yPos = 50;
var g = 0.1;
var acceleration =0;

function draw(){
background(255);

makeball();
yPos += acceleration;
acceleration += g;

if(yPos>812){
  acceleration =-acceleration/1.15;
}
}

function makeball(){
ellipse(width/2, yPos, 50,50);
fill(0);
}