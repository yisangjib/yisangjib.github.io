/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/948590

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Original artwork "Gravité centrale" from Milan Dobeš (1929)
//Source: milandobes.com

let size, tile, grid;
let col1, col2, col3;
const border = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);
    size = min(width-border*2, height-border*2) / 4;

    col1 = color(255, 255, 255);
    col2 = color(0);
    col3 = color(255);

    tile = createGraphics(size, size);
    tile.noStroke();

    tile.fill(col2);
    tile.beginShape();
        for(let a = HALF_PI; a <= PI+HALF_PI; a+=TWO_PI/30){
            let x = sin(a) * size/2.01 + size/2;
            let y = cos(a) * size/2.01 + size/2;
            tile.vertex(x, y);
        }
    tile.endShape();

    tile.fill(col3);
    tile.beginShape();
        for(let a = -HALF_PI; a <= HALF_PI; a+=TWO_PI/30){
            let x = sin(a) * size/2.01 + size/2;
            let y = cos(a) * size/2.01 + size/2;
            tile.vertex(x, y);
        }
    tile.endShape();

    grid = [];
    let w = width - border * 2;
    let h = height - border * 2;
    let alignX = (w - floor(w/size) * size) / 2;
    let alignY = (h - floor(h/size) * size) / 2;
    for(let y = size/2 + alignY + border; y < h; y += size){
        for(let x = size/2 + alignX + border; x < w; x += size){
            grid.push({x, y});
        }
    }
}

function draw() {
    background(col1);
    grid.forEach((g, index) => {
        push();
            translate(g.x, g.y);
            rotate(atan2(g.y - mouseY, g.x - mouseX));
            image(tile, - size / 2, - size / 2);
        pop();
    });
}
