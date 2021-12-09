var n = 256;
var dx, dy;
var xoff, yoff;
var ias, ibs;
var xScale, yScale;
var somethingChanged = true;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
	createCanvas(windowWidth, windowHeight);
	stroke(0);
	strokeWeight(0.1);

	dy = 3;
	dx = dy * width / height;
	yoff = -2;
	xoff = -dx/2;

	xScale = width / dx;
	yScale = height / dy;

	ias = new Array(height);
	ibs = new Array(width);
}

function draw() {
	if (somethingChanged) {
		somethingChanged = false;

		background(255, 50);

		for (var y = 0; y < height; y++) {
			ias[y] = yoff + y * dy / height;
		}
		for (var x = 0; x < width; x++) {
			ibs[x] = xoff + x * dx / width;
		}

		for (var x = 0; x < width; x+=256) {
			for (var y = 0; y < height; y+=256) {
				var ia = ias[y];
				var ib = ibs[x];
				var a = ia;
				var b = ib;
				var aa = a*a;
				var bb = b*b;
				var prescreena = (a-yoff)*yScale;
				var prescreenb = (b-xoff)*xScale;
				var i = 0;

				while (i < n    &&    aa + bb < 4) {
					b = 2*a*b + ib;
					a = aa - bb + ia;
					aa = a*a;
					bb = b*b;
					i++;

					var screena = (a-yoff)*yScale;
					var screenb = (b-xoff)*xScale;

					line(prescreenb, prescreena, screenb, screena);

					prescreena = screena;
					prescreenb = screenb;
				}
			}
		}
	}
}

function touchMoved() {
	xoff = map(mouseX, 0, width, 0, -6);
	yoff = map(mouseY, 0, height, 0, -4);

	somethingChanged = true;
}