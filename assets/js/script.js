/*
 * NEUMORPHISM TYPO
 * Made with ThreeJS - Enjoy!
 *
 * Experimenting with neumorphism in typography.
 * Use cursor to move around the shiny effect.
 * On mobile touch + drag screen.
 *
 * #034 - #100DaysOfCode
 * By ilithya | 2020
 * https://www.ilithya.rocks/
 * https://twitter.com/ilithya_rocks
 */

const colorBg = "white";
const colorTypo = "black";

const nearDist = 0.1;
const farDist = 10000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  nearDist,
  farDist
);

camera.position.z = Math.round(farDist / 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(colorBg);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffdffd, 0);
light.position.set(-15, 0, 70);
scene.add(light);

// CREATE TYPOGRAPHY
const group = new THREE.Group();
const typoLoader = new THREE.FontLoader();
const createTypo = (font) => {
  const word = `Ohoi`;
  const typoSize = 300;
  const typoHeight = Math.round(typoSize / 4);
  const typoProperties = {
    font: font,
    size: typoSize,
    height: 0,
    curveSegments: 20,
    bevelEnabled: false,
    bevelThickness: 0.1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 10,
  };

  const textMesh = new THREE.Mesh();
  textMesh.geometry = new THREE.TextBufferGeometry(word, typoProperties);
  textMesh.material = new THREE.MeshStandardMaterial({
    color: colorBg,
    emissive: colorTypo,
    roughness: 0,
    metalness: 1,
    // side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });

  textMesh.geometry.computeBoundingBox();
  textMesh.geometry.boundingBox.getCenter(textMesh.position).multiplyScalar(-1);

  textMesh.matrixAutoUpdate = false;
  textMesh.updateMatrix();

  group.add(textMesh);
};
typoLoader.load("https://assets.codepen.io/7604869/font_regular.json", createTypo);

scene.add(group);

// CREATE PART OF THE MOUSE/TOUCH OVER EFFECT
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
  windowX: Math.round(window.innerWidth / 2),
  windowY: Math.round(window.innerHeight / 2),
  coordinates: function (cX, cY) {
    mouseX = cX - this.windowX;
    mouseY = cY - this.windowY;
  },
  onMouseMove: function (e) {
    mouseFX.coordinates(e.clientX, e.clientY);
  },
  onTouchMove: function (e) {
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    mouseFX.coordinates(touchX, touchY);
  },
};

document.addEventListener("mousemove", mouseFX.onMouseMove);
document.addEventListener("touchmove", mouseFX.onTouchMove);

// RENDERING
const render = () => {
  const ct = 0.05;
  camera.position.x += (mouseX - camera.position.x) * ct;
  camera.position.y += (mouseY - camera.position.y) * ct;
  camera.lookAt(scene.position);

  const r = Date.now() * 0.0018;
  const rot = Math.sin(r) * 0.12;
  group.rotation.x = rot * 1.4;
  group.rotation.y = rot;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
};
render();
