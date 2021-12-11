var classifier;

function setup() {
  createCanvas(windowWidth, windowHeight);

  classifier = new Classifier(0.4, 1);
  translate(width/2, height/2);
  classifier.display();
}


function draw() {
  translate(width/2, height/2);
  
  var x = random(-width/2, width/2);
  var y = random(-height/2, height/2);
  
  var category = classifier.classify(x, y);
  noStroke();
  fill(0);
  if (category > 0) {
    fill(255);
  } else {
    fill(0);
  }
  ellipse(x, y, 80, 80)
}

function Classifier(a, b) {
  
  this.a = a;
  this.b = b;
  
  this.f = function(x) {
    return this.a * x + this.b;
  }
  
  this.display = function() {
    strokeWeight(1);
    stroke(0);
    var x1 = -width/2;
    var y1 = this.f(x1);
    var x2 = width/2;
    var y2 = this.f(x2);
    line(x1, y1, x2, y2);
  }
  
  this.classify = function(x, y) {
    if (y < this.f(x)) {
      return -1;
    } else {
      return 1;
    }
  }
}