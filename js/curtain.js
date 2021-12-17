var scene = new THREE.Scene();
var viewport, renderer, camera, controls, particleDistance, centerPoint = {};
var transitionDuration = 1000;
var baseURL = '';
var mountainGeometry, mountainParticles;
var loader = new THREE.JSONLoader();
var pointsPlot = new Array();
var geoname;
THREE.ImageUtils.crossOrigin = ""
THREE.ImageUtils.crossOrigin = "anonymous"
init();


function init() {
  baseURL = 'https://s3.ca-central-1.amazonaws.com/kevinnewcombe/three-terrain/';
  // set up the scene and camera
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  viewport = document.getElementById('viewport');

  renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer({ antialias: 0, clearAlpha: 0, alpha:true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.shadowMap.enabled = true;
  viewport.appendChild(renderer.domElement);
  window.addEventListener( 'resize', onWindowResize, false );

  scene.fog = new THREE.Fog( 0x111111, 22000, 25000 );


  /*                */
  /*     camera     */




  camera = new THREE.PerspectiveCamera(8, WIDTH / HEIGHT, 0.1, 200000);
  camera.position.set(0, 10000, -1000 );
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.15; 
  createGroundPlane();
  animate();
}

function createGroundPlane(){
  mountainGeometry = new THREE.Geometry();
  mountainGeometry.dynamic = true;
  mountainGeometry.__dirtyVertices = true;
  mountainGeometry.verticesNeedUpdate = true;

  var material = new THREE.PointsMaterial();
  material.sizeAttenuation = false;
  centerX = 0;
  centerZ = 0;

  totalX = 150;
  totalZ = 150;

  particleDistance = 15;
  for ( var x = 0; x < totalX; x ++ ) {
    xplot = x - Math.round((totalX-1)/2);
    zArray = new Array();
    for ( var z = 0; z < totalZ; z ++ ) {
      var vertex = new THREE.Vector3();
      vertex.x = x*particleDistance - particleDistance*(totalX-1)/2;
      vertex.z = z*particleDistance - particleDistance*(totalZ-1)/2;
      zplot = z - Math.round((totalZ-1)/2);
      zArray[zplot] = vertex;
      mountainGeometry.vertices.push( vertex );
    }
    pointsPlot[xplot] = zArray;
  }
  
  mountainParticles = new THREE.Points( mountainGeometry, material );
  mountainParticles.sortParticles = true;
  mountainParticles.position.y = -700;
  scene.add( mountainParticles );
  loadGeography('everest');
}

function loadGeography(filename){
  e = document.querySelector('select[name="geo"]');
  select = e.options[e.selectedIndex].value;
  if(select){
    filename = select;
  } 
  var request = new XMLHttpRequest();
  request.open('GET', baseURL+'_terrain/'+filename+'.json?v=2');
  request.onprogress = function(evt){
    document.getElementById('loading').innerHTML = Math.round((evt.loaded / evt.total)*100)+'%';
  }
  request.onload = function() {
    document.getElementById('loading').innerHTML = '';
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      centerPoint.lat = data.boundaries[2] + (data.boundaries[0] - data.boundaries[2]) / 2;
      centerPoint.lng = data.boundaries[3] + (data.boundaries[1] - data.boundaries[3]) / 2;
      document.getElementById('map-link').setAttribute('href', 'https://www.google.ca/maps/place/'+centerPoint.lat+','+centerPoint.lng);
      console.log(centerPoint.lat+','+centerPoint.lng);
      for(var i = 0; i<data.coords.length; i++){
        m = data.coords[i];
        x = m[0];
        y = m[1];
        z = m[2];

        v = pointsPlot[x][z];

        target = { 
          y:(y - data.lowest_point)*particleDistance, 
          ease:Power3.easeOut
        }

        tween = TweenMax.to(v, 1.5, target );
        target.onUpdate = function () {
         mountainGeometry.verticesNeedUpdate = true;
        };  
      }
    } else {
      alert('there was an error loading the geography.');
    }
  };

  request.onerror = function() {
    alert('there was an error loading the geography.');
  };
  request.send();
}

function onWindowResize( event ) {
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_WIDTH  = window.innerWidth;
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

document.addEventListener('DOMContentLoaded',function() {
 document.querySelector('select[name="geo"]').onchange=loadGeography;
},false);