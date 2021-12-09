//Alessandro Valentino 2020
//A generative art piece based on an edge splitting algorithm.
//GitHub: github.com/alessvale/
//Website: kimri.org 


var edge_list = [];
var start = true;

function setup(){
canvas = createCanvas(windowWidth, windowHeight);
background(200);

var vertices = [];

var r = height * 0.4;
var num = 120;

//Create initial nodes;

for (var i = 0; i < num ; i ++){
var pos = new p5.Vector(width * 0.5 + r * cos(2 * 3.14 * i * 1.0/num), height * 0.5 + r * sin(2 * 3.14 * i * 1.0/num));
vertices.push(new Part(pos.x, pos.y));
}

//Add edges;

for (var i = 0; i < vertices.length - 1;  i++){
  edge_list.push(new Edge(vertices[i], vertices[i+1]));
}

//Add last edge;

edge_list.push(new Edge(vertices[vertices.length - 1], vertices[0]));

}

function draw(){
//  background(255);

  if (start){
  //This holds the edges to be removed after a split;
  var toRemove = [];

  //Thi holds the new edges to be added;
  var toAdd = [];

  for (var i = 0; i < edge_list.length; i++){
    var edge = edge_list[i];
    edge.display();
    edge.update();
    var l = edge.getLen();

    if (edge_list.length < 500){
        if ( random(0, 1) < 0.001){
          var adds = edge.split();
          toAdd.push(adds[0]);
          toAdd.push(adds[1]);
          edge.remove = true;
       }
      }

     }

//Remove the edges;

for (var i = edge_list.length-1; i>=0; i--){
  var e = edge_list[i];
  if (e.remove){
    edge_list.splice(i, 1);
  }
}

//Add the new edges;
toAdd.forEach( edge => edge_list.push(edge) )

//Get all the vertices;
var vertices = [];
toAdd.forEach( edge => vertices.push(edge.p2) );

//Apply forces between each vertices;

for (var i = 0; i < vertices.length; i++){
  var p = vertices[i];
  for (var j = i + 1 ; j < vertices.length; j++){
    var q = vertices[j];
    p.check(q);
  }
}

edge_list.forEach(edge => edge.move());



  }
}

function mouseClicked(){
	background(255);
var vertices = [];
edge_list = [];
var r = height * 0.4;
var num = 120;

//Create initial nodes;

for (var i = 0; i < num ; i ++){
var pos = new p5.Vector(width * 0.5 + r * cos(2 * 3.14 * i * 1.0/num), height * 0.5 + r * sin(2 * 3.14 * i * 1.0/num));
vertices.push(new Part(pos.x, pos.y));
}

//Add edges;

for (var i = 0; i < vertices.length - 1;  i++){
  edge_list.push(new Edge(vertices[i], vertices[i+1]));
}

//Add last edge;

edge_list.push(new Edge(vertices[vertices.length - 1], vertices[0]));
}

///Part class  



//Node class

function Part(x, y) {

  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(random(-1, 1), random(-1, 1));
  this.vel.normalize();
  this.vel.mult(random(1.0, 2.0));
  //Used only for testing reasons;

  this.rad = random(5, 150);

  //Initialize the force vector;
  
  this.forceApplied = new p5.Vector(0.0, 0.0);


  this.applyForce = function(force){
    this.forceApplied.add(force);
  }

  this.move = function(){
    this.forceApplied.limit(0.3);
    this.vel.add(this.forceApplied);
    this.vel.limit(0.4);
    this.pos.add(this.vel);
    this.forceApplied = new p5.Vector(0.0, 0.0);
  }

  //For testing reasons

  this.display = function(){
    noStroke();
    fill(0, 2);
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
  }

  //Check distance condition with other vertices

  this.check = function(other){
    var p = other.pos;
    var d = this.pos.dist(p);

    if (d < 10){
      var force = new p5.Vector(p.x - this.pos.x, p.y - this.pos.y);
      force.normalize();
      force.mult(-0.5);
      this.applyForce(force);
      force.mult(1.0);
      other.applyForce(force);
    }
  }

  //Bounce on the wall

  this.bounce = function(){
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x = - this.vel.x;
    }
    if (this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = - this.vel.x;
    }
    if (this.pos.y > height){
      this.pos.y = height;
      this.vel.y = - this.vel.y;
    }
    if (this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = - this.vel.y;
    }

  }
}

//Edge class



function Edge(p1, p2){
  this.p1 = p1;
  this.p2 = p2;
  this.remove = false;

  this.split = function(){
    var middle = new p5.Vector(0.5 * (this.p1.pos.x + this.p2.pos.x), 0.5 * (this.p1.pos.y + this.p2.pos.y));
    var newpoint = new Part(middle.x, middle.y);
    return [new Edge(this.p1, newpoint), new Edge(newpoint, this.p2)];
  }

  this.display = function(){
    //this.p1.display();
    //this.p2.display();
    stroke(0, 20);
    line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
  }






  this.update = function(){
    var l = this.p2.pos.dist(this.p1.pos) - 10;
    var force = new p5.Vector(this.p2.pos.x - this.p1.pos.x, this.p2.pos.y - this.p1.pos.y);
    force.normalize();
    force.mult(l * 0.099);
    this.p1.applyForce(force);
    force.mult(-1.0);
    this.p2.applyForce(force);
  }

  this.move = function(){
    this.p1.bounce();
    this.p2.bounce();
    this.p1.move();
    this.p2.move();
  }

  this.getLen = function(){
    return this.p1.pos.dist(this.p2.pos);
  }
}