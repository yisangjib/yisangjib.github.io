var colors   =  ["#000","#fff","#808080", "#c0c0c0"];

// set weights for each color..you can set  your own weights 

var weights = [2, 2, 2, 2, 2,2];
var nAgents = 1000;
let agent = [];

var direction = -1;

var border =  -200;


function setup() {
  	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100,100);
	rectMode(CENTER);
  strokeCap(SQUARE);

  background(0,0,100);

  for(let i=0;i < nAgents;i++)
  {
    agent.push(new Agent());
  }
	
	smooth(4);
	//pixelDensity(2);
}

function draw() {
	
	
	if (frameCount > 1000)
	{
		noLoop();
	}
	
	// push();
	
	// translate(width/2,height/2 - 1000);
	
	// rotate(PI/4.0);
	
	// scale(1.9);
	
  for(let i=0;i < agent.length;i++)
  {
    agent[i].update();
	}
	
	// pop();
	
	noFill();
	stroke(100);
	strokeWeight(3);
	rect(width/2,height/2,width,height);
	

}

// select random colors with weights from palette 

function myRandom(colors,weights)
{ 
    let tt = 0;
    let sum = 0;
 
    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }
 
    let rr = random(0,sum);
 
    for(let j=0;j < weights.length;j++)
    {
 
      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }
 
    return tt;
 }

// paintining agent 


class Agent {
  constructor()
  {this.p     = createVector(random(border,width - border),random(border,height-border));
  
    this.pOld  = createVector(this.p.x,this.p.y);
    
    this.step  = 1;
	 
		if(random(0,1) > 0.2)
		{
			this.direction = -1;
			this.scale = 10;
		}else
		{
			this.direction = 1;
		  this.scale = 40;
		}

	  //this.scale = floor(random(10,60));
	 
	  this.color = generateColor();
	 
	  if (random(0,1) > 0.50)
	  {
		  this.myFill = true;
	  }else
	  {
		  this.myFill = false;
	  }
	 
			
		this.strokeWidth = 1;
	 
    this.isOutside = false; 
  }
  
	setDirection(myDirection){
		this.direction *= -1;
	}
	
	setScale(myScale) {
		this.scale = myScale;
	}
	
	setColor(myColor) {
	  this.color = generateColor();
	}
	
	
  update() {
		
		//this.scaleX = floor(map(this.p.x,0,height,3,13));
		//this.scaleY = floor(map(this.p.y,0,height,33,43));
		
    this.p.x += this.direction*vector_field(this.p.x,this.p.y,this.scale).x*this.step;
    this.p.y += this.direction*vector_field(this.p.x,this.p.y,this.scale).y*this.step;
    
    strokeWeight(this.strokeWidth);
    stroke(this.color);
		
		let x = (this.pOld.x + this.p.x)/2.0;
		let y = (this.pOld.y + this.p.y)/2.0;
		
		line(this.pOld.x,this.pOld.y,this.p.x,this.p.y);
    
    this.pOld.set(this.p);
		
		curve(this.pOld.x,this.pOld.y,this.pOld.x +  randomGaussian()*10,this.pOld.y + randomGaussian()*10,this.p.x,this.p.y);
		
		line(this.pOld.x,this.pOld.y,this.p.x,this.p.y);
    
		if (this.myFill)
		{
		  this.pOld.set(this.p);
		}
		
		//line(this.pOld.x,this.pOld.y,this.p.x,this.p.y);
		
	  //this.p.set(this.pOld);
		
		//point(this.p.x,this.p.y);

    
  }
    
}

// vector field function 
// the painting agents follow the flow defined 
// by this function 


function vector_field(x,y,myScale) {
  
	let u, v;
	
	
	x = map(x,border,width-border,0,myScale);
  y = map(y,border,height-border,0,myScale);
	
	u = -2.0*(floor(y) % 2) + 1;
	v = -2.0*(floor(x) % 2) + 1;

	//u = sin(2.0*y - x);
  //v = cos(2.0*x + y);

  return createVector(u,v);
}


function generateColor()
{
	  let temp   =  myRandom(colors,weights);
    
	  myColor = color(hue(temp) + randomGaussian()*10,
		              saturation(temp) + randomGaussian()*10,
		              brightness(temp) + randomGaussian(), 
									random(10,90));

	  return myColor;
}


// function to select 

function myRandom(colors,weights)
{
    let sum = 0;
 
    for(let i=0;i < colors.length; i++)
    {
      sum += weights[i];
    }
 
    let rr = random(0,sum);
 
    for(let j=0;j < weights.length;j++)
    {
 
      if (weights[j] >= rr)
      {
        return colors[j];
      }
        rr -= weights[j];
    }
 }