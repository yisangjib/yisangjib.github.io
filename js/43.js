let numAttractors = 2;
let numParticles = 500;

let attractors = [];
let particlePos = [];
let particleVel = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  reset();
  strokeWeight(1);
  stroke(0);
}

function draw() {
  for (let i = 0; i < numParticles; i++) {
    for (let j = 0; j < numAttractors; j++) {
      particleVel[i].add(attract(j, particlePos[i].x, particlePos[i].y));
    }

    particlePos[i].add(particleVel[i]);
    particleVel[i].mult(0.9);

    line(
      particlePos[i].x,
      particlePos[i].y,
      particlePos[i].x - particleVel[i].x,
      particlePos[i].y - particleVel[i].y
    );
  }
  removeAdd();
}

function attract(attractIndex, posX, posY) {
  let attractionForce = createVector(
    posX - attractors[attractIndex].x,
    posY - attractors[attractIndex].y
  );
  attractionForce.normalize();

  let amp =
    1 /
    sqrt(
      dist(
        posX,
        posY,
        attractors[attractIndex].x,
        attractors[attractIndex].y
      )
    );
  amp *= attractors[attractIndex].z;
  attractionForce.mult(-amp);

  return attractionForce;
}

function reset() {
  background(255);

  for (let i = 0; i < numAttractors; i++) {
    attractors[i] = createVector(
      random(width),
      random(height),
      random(-1, 2)
    );
  }

  for (let i = 0; i < numParticles; i++) {
    particlePos[i] = createVector(random(width), random(height));
    particleVel[i] = createVector(0, 0);
  }
}

function touchEnded() {

  numParticles = constrain(numParticles, 1, 1000);
  numAttractors = constrain(numAttractors, 1, 100);
  reset();
}

function removeAdd() {
  for (let i = 0; i < numParticles; i++) {
    var remove = false;
    for (let j = 0; j < numAttractors; j++) {
      if (
        dist(
          attractors[j].x,
          attractors[j].y,
          particlePos[i].x,
          particlePos[i].y
        ) < 20
      ) {
        remove = true;
        break;
      }
    }
    if (remove) {
      let newX = random(-width, 2 * width);
      let newY = random(-height, 2 * height);
      while (newY > 0 && newY < height && newX < width && newX > 0) {
        newX = random(-width, 2 * width);
        newY = random(-height, 2 * height);
      }

      particlePos[i].x = newX;
      particlePos[i].y = newY;
      particleVel[i].x = 0;
      particleVel[i].y = 0;
    }
  }
}
