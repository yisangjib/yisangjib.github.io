function setup(){
  createCanvas(windowWidth/2, windowHeight/2, WEBGL);
  stroke(0);
  angleMode(DEGREES);

  
}

function draw(){
  background(200);
  noStroke()
  t=frameCount/30;
  nj=int(width/(width/30))
  ni=int(height/(width/30));
  m=10*sin(t)
  ambientMaterial(250+m,80-m,0+m)
  pointLight(200,200,200,0,0,0)
  orbitControl();
  translate(-width/2,-height/2)
  for(let j=0;j<ni+1;j++){
    for(let i=0;i<nj+1;i++){
      push()
      translate(i*width/30,width/30*j,0);
      rotateY(i*t+t)
      rotateX(j*t+t)
      circle(width/20,10,24,16);
      pop()
    }
  }
}