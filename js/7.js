let colonnes = 100;
let rangees = 200;
let decalageX;
let decalageY;
let tailleForme = 78;
let differenceTaille = 12;

function setup() {
  createCanvas(windowWidth, windowHeight/2);
  rectMode(CENTER);
  strokeWeight(1);
  frameRate(3);
  fill(255);
  noLoop();
}

function draw() {
  //Pour chaque rangée
  for (let r = 0; r < rangees; r++) {
    //Pour chaque colonne...
    for (var c = 0; c < colonnes; c++) {
      //Choisir un décalage des formes
      decalageX = random(-50, 20);
      decalageY = random(-20, 50);
      rect(c * tailleForme, r * tailleForme, tailleForme, tailleForme);
      for (let i = 1; i < 6; i++) {
        rect(
          c * tailleForme + i * decalageX,
          r * tailleForme + i * decalageY,
          tailleForme - i * differenceTaille,
          tailleForme - i * differenceTaille
        );
      }
    }
  }
}

function mouseMoved() {
  redraw();
}
function touchMoved() {
  redraw();
}
