

var cols, rows;
var scl = 10;
var w = 916;
var h = 812;

let rangoY1 = 125;
let rangoY2 = 43;

var volandoUWU = 0;

var terrain = [];

let diverse = [];
function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;
  angleMode(DEGREES);
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  
  for(let i = 0; i < cols; i++){
    diverse[i] = round(random(10));
  }
}

function draw() {
  volandoUWU -= 0.008;
  
  var yoff = volandoUWU;
  let blend;
  let additional; 
  var mapIzq;
  var mapDer;
  
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      let randomRango = diverse[x];
      let noiseNormal = map(noise(xoff, yoff), 0, 1, -100, 100);
      let noiseRange = map(noiseNormal, -100, 200, 0, 300);
      terrain[x][y] = noiseNormal * 0.3
      if(y >= rangoY1+randomRango && y <= rangoY2+randomRango){
        mapIzq = map(y, rangoY1+randomRango, (rangoY1+randomRango + rangoY2+randomRango) / 2,             0, 1)
        mapDer = map(y,          (rangoY1+randomRango + rangoY2+randomRango) / 2, rangoY2+randomRango,    1, 0)
        blend = mapIzq * mapDer;
        additional = (noiseNormal + (noiseRange+randomRango)) * blend
        terrain[x][y] = additional;
      }
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  background(255);
  translate(0, 50);
  rotateZ(180);
  rotateY(-180);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(QUAD_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}