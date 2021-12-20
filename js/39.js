var camera,
    scene,
    render,
    mouseX = 0,
    mouseY = 0,
    particles = [];

function init() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  
  var fieldOfView = 80; // Angle for the field of view
  var aspectRatio = width / height;
  var minDistClip = 1; // everything closer than this is not rendered
  var maxDistClip = 4000; // everything further than this is not rendered 
  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, minDistClip, maxDistClip);
  
  camera.position.z = 1000; // Move camera backwards to (0, 0, 1000)
  
  scene = new THREE.Scene();
  scene.add(camera);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement); // Insert the <canvas> element onto the page
  
  makeParticles();
  
  document.addEventListener( 'mousemove', onMouseMove, false );
  
  renderFrames(update);
}

function update() {
  updateParticles();
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

function onMouseMove(event) {
  mouseX = event.clientX;
	mouseY = event.clientY;
}

function makeParticles() {
  var particle, material;
  
  // we're gonna move from z position -1000 (far away) 
	// to 1000 (where the camera is) and add a random particle at every pos. 
	for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {
 
		// we make a particle material and pass through the 
		// colour and custom particle render function we defined. 
		//material = new THREE.ParticleCanvasMaterial( { color: 0xffffff, program: particleRender } );
		// make the particle
		// particle = new THREE.Particle(material);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.0});
    var radius = 0.9;
    var segments = 30;
    var particle = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
 
    
		// give it a random x and y position between -500 and 500
		particle.position.x = Math.random() * 1000 - 500;
		particle.position.y = Math.random() * 1000 - 500;
 
		// set its z position
		particle.position.z = zpos;
 
		// scale it up a bit
		particle.scale.x = particle.scale.y = 10;
 
		// add it to the scene
		scene.add( particle );
 
		// and to the array of particles. 
		particles.push(particle); 
	}
}

function particleRender( context ) {
 
	// we get passed a reference to the canvas context
	context.beginPath();
	// and we just have to draw our shape at 0,0 - in this
	// case an arc from 0 to 2Pi radians or 360º - a full circle!
	context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
	context.fill();
}

function updateParticles() { 
	// iterate through every particle
	for(var i=0; i<particles.length; i++) {
		var particle = particles[i]; 
    var material = particle.material;
    
		// and move it forward dependent on the mouseY position. 
		particle.position.z +=  (mouseY + 3) * 0.1;
   
		// if the particle is too close move it to the back
		if(particle.position.z>1000) {
      particle.position.z-=2000; 
    }
    
    material.opacity = Math.min(Math.max((particle.position.z + 1000) / 2000, 0), 1);
	}
  
  var width = window.innerWidth;
  camera.position.x = mouseX - (width/2);
}

function renderFrames(callback) {
  // TODO use requestAnimationFrame
  //setInterval(callback, 1000/30);
  function step() {
    callback();
    window.requestAnimationFrame(step);
  }
  step();
} 

init();