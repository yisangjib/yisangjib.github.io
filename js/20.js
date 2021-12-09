var xoff=0.400;
var yoff=0.300;

function setup() {
  	createCanvas(windowWidth, windowHeight);
  smooth();
  //smooth();
  // frameRate(30);
  // noiseSeed(random(1,600));

}

function draw() {
  
  noiseDetail(1,0.9);
  fill(150);
  rect(0,0,width,height);
  noFill();
  //CODE FOR PLAYING RANDOM
 // background(250,200,0);
  
// for (var i=1; i<640; i+=10){
//   xoff+=0.05;
//   arc(width/2,height/2,i,i, PI*(random(0,1)*2),PI*(random(0,1)*2));
//   println(PI*(noise(xoff)*i/1000));

    
    //RECOMMENDED xoff+=0.05 and yoff=0.03
 xoff += 0.09;
  yoff += 0.03;
     for (var i=1; i<500; i+=10){
 //USE stroke RANDOM for vibrating sort of effect while noise on strokeWEight will give more rhythm to change of stroke
       //strokeWeight(random(1,4);
  strokeWeight(noise(xoff,i)*4);
       
  arc(width/2,height/2,i,i, PI*(noise(xoff*i/640)*4),PI*(noise(yoff*i/450)*3));
  // println(PI*(noise(xoff)*2));
    }
}