var mouse = {x:0, y:0};
var isMobile = typeof window.orientation !== 'undefined'

var bufferScene, bufferCamera, bufferTexture;
var scene, camera, renderer, directionalLight;
var mesh;
var controls;
var WIDTH = isMobile ? 256 : 1024;
var BOUNDS = 1024;


function init(){
  console.clear()
  
  setup();
  setupBuffer()
  elements();
  render();
}

function setup(){

  renderer = new THREE.WebGLRenderer( {antialias:true} );
  renderer.setPixelRatio = devicePixelRatio;
  renderer.setSize(window.innerWidth, window.innerHeight);
  // var gl = renderer.getContext();
  // var suportFloatTexture = !!gl.getExtension('OES_texture_half_float');
  // if(!suportFloatTexture){
  //   alert("No OES_texture_half_float support!")
  // }
  
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  
  light = new THREE.PointLight(0xffffff,1.1, 50);
  light.position.set( 0, 10, 0 );
  scene.add(light)

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
  
  
  
  //controls = new OrbitControls(camera, renderer.domElement)
  
  camera.position.y = 3;
  camera.position.z = 25; 
  //controls.update();
  

  document.body.appendChild(renderer.domElement)

  if(isMobile)
    window.addEventListener("touchmove", mousemove)
  else
    window.addEventListener("mousemove", mousemove)
  
  window.addEventListener("resize", resize)
  resize()
}

function setupBuffer(){
  bufferScene = new THREE.Scene();
  bufferCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  bufferTexture = new THREE.WebGLRenderTarget( WIDTH, WIDTH, { 
    minFilter: THREE.NearestFilter, 
    magFilter: THREE.NearestFilter,
    format: THREE.RGBFormat,
    // type:THREE.FloatType
  });
  
  var geom = new THREE.PlaneBufferGeometry(2, 2);
  simulationMaterial = new THREE.ShaderMaterial({
    uniforms:{
      resolution:{ value: new THREE.Vector2(WIDTH, WIDTH) },
      time:{ value:0.0}
    },
    fragmentShader: document.getElementById("simulation-shader").textContent,
  })
  box = new THREE.Mesh(geom, simulationMaterial);
  bufferScene.add(box);
}

function elements(){
  var geometry = new THREE.PlaneBufferGeometry(120, 120, WIDTH-1, WIDTH-1);
  
  
  var displaceBuffer = new Float32Array( geometry.attributes.position.count );
  for ( var i = 0; i < displaceBuffer.length; i++ ) {
    displaceBuffer[ i ] = i*0.1
  }
  
  geometry.addAttribute( 'vDisplace', new THREE.BufferAttribute( displaceBuffer, 1 ) );
  var material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.ShaderLib.phong.uniforms,
      {
        time: { value: 0.0 },
        heightMap: { value:bufferTexture.texture },
        maxHeight:{ value: 2.0 }
      }
    ]),
    vertexShader: document.getElementById("vertex-shader").textContent,
    fragmentShader: document.getElementById("fragment-shader").textContent
  });
  
  material.lights = true;
  material.uniforms.diffuse.value = new THREE.Color(0xffffff);
  material.uniforms.shininess.value = 300;
  material.defines.WIDTH = WIDTH.toFixed( 1 );
  material.defines.BOUNDS = BOUNDS.toFixed( 1 );
  
  
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.z = -Math.PI / 4
  mesh.rotation.x = -Math.PI / 2
  scene.add(mesh)
}


function render(){
  requestAnimationFrame(render)
  //controls.update();
  
  var time = performance.now() * 0.001

  var rotX = mouse.y * 2;
  var rotY = mouse.x * 2;
  // mesh.rotation.x += (rotX - mesh.rotation.x) * 0.05;
  // mesh.rotation.y += (rotY - mesh.rotation.y) * 0.05;
  // mesh.material.uniforms.time.value = time;
  // mesh.material.uniforms.displaceAmount.value = (mouse.y * mouse.x) * 2 ;
  
  mesh.material.uniforms.heightMap.value = bufferTexture.texture;
  
  
  simulationMaterial.uniforms.time.value = time;


  
  renderer.render(bufferScene, bufferCamera, bufferTexture);

  renderer.render(scene, camera)
  
}


function mousemove(e){
  var x, y
  if(e.type == "mousemove"){
    x = e.clientX;
    y = e.clientY;
  }else{
    x = e.changedTouches[0].clientX
    y = e.changedTouches[0].clientY
  }
  
  mouse.x = (x / window.innerWidth) - 0.5
  mouse.y = (y / window.innerHeight) - 0.5
  
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

window.onload = init