let cells = [];
let blocks = [];
let easing = 0.07;
let bgcolor = [];
let boxcolor = [];
let interimcolor = [];
let newFlag = false;

function setup() {
	noStroke();
	initColors();
	createCanvas(windowWidth, windowHeight);
	reset();
}

function draw() {
	if (second() == 0 && newFlag == false) {
		reset();
		for (let i = 0; i < 3; i++) {
			bgcolor[i] = int(boxcolor[i]);
		}
		for (let i = 0; i < 3; i++) {
			boxcolor[i] = interimcolor[i];
			interimcolor[i] = 255;
		}
		newFlag = true;
	}
	background(color(bgcolor[0], bgcolor[1], bgcolor[2]));
	while (blocks.length <= second()) {
		createBlock(color(boxcolor[0], boxcolor[1], boxcolor[2]));
	}
	for (let i = 0; i < blocks.length; i++) {
		if (i == 30) newFlag = false;
		blocks[i].update();
		blocks[i].display();
	}
}

function initColors() {
	for (let i = 0; i < 30; i++) {
		bgcolor[i] = 255;
		boxcolor[i] = 0;
		interimcolor[i] = 255;
	}
}

function mousePressed() {
  reset();
	initColors();
}

function reset() {
	blocks = [];
	cells = [];
}

function createBlock(color) {
	  let index = int(random(0, 10));
	  while (cells[index] == 1) index = int(random(0, 10));
		let index2 = index;
	  while (true) {
			index2 += 10;
			if (index2 >= 60 || cells[index2] == 1) break;
			index = index2;
		}
		let blockpos = (index % 10) * (windowWidth / 10);
		blocks[blocks.length] = new Block(blockpos, -windowHeight / 6, color, index);
	  cells[index] = 1;
}

function Block(x, y, c, i) {
  this.position = createVector(x, y);
  this.color = c;
	this.index = i;
}

Block.prototype.update = function() {
	let pos = ((windowHeight / 6) * int(this.index / 10)) - this.position.y - 2;
	let dy = pos * easing;
	let vec = createVector(0, dy);
	this.position.add(vec);
};

Block.prototype.display = function() {
  fill(this.color);
	var bwidth = windowWidth / 10;
	var bheight = windowHeight / 6;
  rect(this.position.x, this.position.y, bwidth + 1, bheight + 1);
};
