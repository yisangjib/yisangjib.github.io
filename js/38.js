const step = 2;
const smoothing = 4;
const weight = 1;

function setup() {
		createCanvas(windowWidth, windowHeight);
		colorMode(HSB, 360, 100, 100, 1.0);
}

function draw() {

	//background(200, 100, 80);
	background(255);
		noFill();
		stroke(0, 0, 0);
		strokeWeight( weight );

		for ( let radius = 0.05; radius < 0.3; radius += 0.05) {	
				var circle_ = makeCircle(step, radius);
				circle_ = distortPolygon(circle_);
				circle_ = chaikin(circle_, smoothing);
			
				beginShape();
						circle_.forEach( 
							point => 
							{
								vertex( w(point[0]), h(point[1]) );
							});
				endShape(CLOSE);
		}
}

function chaikin(arr, num) {
		if (num === 0) return arr;
		const l = arr.length;
		const smooth = arr.map((c,i) => {
			return [[0.75*c[0] + 0.25*arr[(i + 1)%l][0],
							 0.75*c[1] + 0.25*arr[(i + 1)%l][1]],
							[0.25*c[0] + 0.75*arr[(i + 1)%l][0],
							0.25*c[1] + 0.75*arr[(i + 1)%l][1]]];
			}).flat();
		return num === 1 ? smooth : chaikin(smooth, num - 1)
}

function distortPolygon(polygon) {
		return polygon.map(
			point => 
					{
						const x = point[0];
						const y = point[1];
						const distance = dist(0.1, 0.1, x, y);
						
						const p = frameCount / 20;
						const p2 = frameCount / 20;

						const noiseFn = (x, y) => {
								const noiseX = (x + 0.31) * distance * 2 + p2;
								const noiseY = (y - 1.73) * distance * 2 + p2;
								return noise(noiseX, noiseY, p);
						};

						const theta = noiseFn(x, y) * Math.PI * 3;

						const amountToNudge = 0.08 - (Math.cos(p) * 0.08);
						const newX = x + (amountToNudge * Math.cos(theta));
						const newY = y + (amountToNudge * Math.sin(theta));

						return [newX, newY];
					}
			);
}

function makeCircle(numSides, radius) {
		const points = [];
		const radiansPerStep = (Math.PI * 2) / numSides;
		for ( let theta = 0; theta < 2 * Math.PI; theta += radiansPerStep) {
				const x = 0.5 + radius * Math.cos(theta);
				const y = 0.5 + radius * Math.sin(theta);
				points.push( [x, y] );
		}
		return points;
}

function w(val) {
		if(val == null) return width;
		return width * val;
}

function h(val) {
		if(val == null) return height;
		return height * val;
}