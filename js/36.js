let bubbles = [];
let x = 255;

function setup() {
		createCanvas(windowWidth, windowHeight);
	background(x);
	for(let i = 0; i < 2; i++){
		let x = random(width);
		let y = random(height);
		let s = 200;
							 
		let b = new Bubble(x, y, s);
		bubbles.push(b);
	}

}


function touchEnded() {
	for(let b of bubbles){
		b.divide(mouseX,mouseY);
	}
}
function touchMoved() {
	for(let b of bubbles){
		b.divide(mouseX,mouseY);
	}
}

function draw() {
	background(x);
	for(let b of bubbles){
		b.move();
		b.show();
		for(let other of bubbles){
			if (b != other && b.intersect(other)){
				b.flee(other.x,other.y);
			}
		}
	}
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
		this.r = r;
		
		this.a = 0;
		this.b = 0;
		this.c = 0;
  }

  move() {
		let m = 10;
		
		if(this.x < width && this.x > 0){
			this.x = this.x + random(-5, 5);
		}
		else{
			if(this.x <= 0){
				this.x +=m;
			}
			else{
				this.x -=m;
			}
		}
		if(this.y < height && this.y > 0){
    	this.y = this.y + random(-5, 5);
		}
		else{
			if(this.y <= 0){
				this.y +=m;
			}
			else{
				this.y -=m;
			}
		}
  }

  show() {
    noStroke();
    strokeWeight(1);
    fill(this.a, this.b, this.c);
    ellipse(this.x, this.y, this.r, this.r);
  }
	
	intersect(other) {
		let d = dist(this.x, this.y, other.x, other.y);
		return (d < (this.r/2 + other.r/2));
	}
	
	divide(px, py) {
			let d = dist(px, py, this.x, this.y);
			if(d < this.r/2){
				this.r -= 5;
								
				let x = this.x + 50;
				let y = this.y;
				let s = this.r;
							
				let b = new Bubble(x, y, s);
				bubbles.push(b);
			}
		}
	
	flee(px, py) {
		let d = dist(px, py, this.x, this.y);
		if(d < (this.r + 100)){
			if(this.x < width && this.x > 0){
					if(this.x < px){
						this.x -= 10;
					}
					else{
						this.x += 10;
					}
				}
			
				if(this.y < height && this.y > 0){
					if(this.y < py){
						this.y -= 10;
					}
					else{
						this.y += 10;
					}
				}			
			}		
		}
	
}