var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);

renderer.setClearColor(new THREE.Color(0xffffff), 1);

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
/*document.body.addEventListener('resize', resize);*/

scene.add(camera);

camera.position.z = - 100;
camera.lookAt(new THREE.Vector3());

var l = 100;
var phi = Math.floor(Math.random() * 5) + 2;
var radius = 50;
var vertices = [];

for (var i = 0; i < l; i++) {

  var pct = i / (l - 1);
  var theta = Math.PI * 2 * pct * phi;

  var taper = Math.sin(pct) * radius / 4;

  var x = taper * Math.cos(theta);
  var y = radius * EasingQuadraticIn(seat(pct)) * 2 - radius;
  var z = taper * Math.sin(theta);

  vertices.push(new THREE.Vector3(x, y, z));

}

var light = new THREE.PointLight(0xffffff, 2, 200);

var geometry = new THREE.TubeGeometry(new THREE.SplineCurve3(vertices), 250, 4, 32, false);
var material = new THREE.MeshPhongMaterial({
  color: 'rgb(255, 150, 255)',
  side: THREE.DoubleSide,
  shininess: 2500,
  emissive: new THREE.Color('rgb(0, 0, 255)'),
  metal: false
});

var mesh = new THREE.Mesh(geometry, material);
mesh.scale.multiplyScalar(2);

scene.add(mesh);
scene.add(camera);
camera.add(light);

window.addEventListener('resize', resize, false);

loop();

function loop() {
  requestAnimationFrame(loop);
  mesh.rotation.y -= 1 / 30;
  renderer.render(scene, camera);
}

function resize() {

  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

}

function EasingQuadraticIn(k) {
  return k * k;
}

function seat(t) {
  return (Math.pow(2 * t - 1, 1) + 1) / 2;
}