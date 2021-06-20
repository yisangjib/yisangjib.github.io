function setup() {
    sys = new LCurveSystem();
    sys.init();
    createCanvas(windowWidth + 10, windowHeight + 10);
    smooth();
    sys.draw();
}

function draw() {
}


function LCurveSystem() {
    this.weight = 2;
    this.detail = 0.01;
    this.num = 1000;
    this.curves = [];

    this.init = function() {
        var pos = 0;
        for (var i = 0; i < this.num; i++) {
            this.curves.push(new LCurve(pos, this.detail, color(random(255), random(255), random(255))));
            pos = pos + this.weight;
        }
    }

    this.draw = function() {
        noFill();
        strokeWeight(this.weight);

        for (var i = 0; i < this.curves.length; i++) {
            this.curves[i].display();
        }
    }

}





function LCurve(_ystart, _detail, _c) {
    this.yoff = 0.0;
    this.detail = _detail;
    this.c = _c;
    this.range = 500;
    this.ystart = _ystart - this.range;

    this.display = function() {

        stroke(this.c);
        beginShape();

        for (var x = 0; x < width; x += 2) {
            this.yoff = this.yoff + this.detail;
            var y = (noise(this.yoff) * this.range);
            curveVertex(x, this.ystart + y);
        }
        endShape();
    }
}
