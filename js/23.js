function deg(degree) {
  return degree / 180 * Math.PI;
}

function main() {
  const canvas = document.querySelector('#c');

  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.shadowMap.enabled = true;

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 50;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = 15;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#B4B4B4');

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  //add light
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
  scene.add(ambientLight);


  function createShadowLight(shadowLightAngle, shadowLightRadius) {
    const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    const shadowLightPositionX = Math.cos(deg(shadowLightAngle)) * shadowLightRadius;
    const shadowLightPositionZ = Math.sin(deg(shadowLightAngle)) * shadowLightRadius;
    shadowLight.position.set(shadowLightPositionX, 3, shadowLightPositionZ);
    shadowLight.target.position.set(0, 0, 0);
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 2000;
    shadowLight.shadow.mapSize.height = 2000;

    shadowLight.shadow.camera.left = -8;
    shadowLight.shadow.camera.right = 8;
    shadowLight.shadow.camera.far = 30;

    scene.add(shadowLight);
    scene.add(shadowLight.target);
    
    return shadowLight;
  }

  let shadowLightAngle = 0;
  let shadowLightRadius = 8;

  const shadowLight1 = createShadowLight(shadowLightAngle, shadowLightRadius);
  
  function createCube(radius, degree) {
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.MeshLambertMaterial({color: 'white'});
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.x = Math.cos(deg(degree)) * radius;
    cube.position.z = Math.sin(deg(degree)) * radius;
    cube.position.y = 0.5;
    cube.rotation.y = deg(-degree);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
  }

  for (let degree = 0; degree<=360; degree+=30) {
    createCube(5, degree);
  }

  // plane
  const planeSize = 20;
  const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshLambertMaterial({
    color: 'lightgray',
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.receiveShadow = true;
  plane.rotation.x = deg(-90);
  scene.add(plane);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;          
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    time *= 0.001;
    shadowLightAngle += 0.3;
    const shadowLightPositionX = Math.cos(deg(shadowLightAngle)) * shadowLightRadius;
    const shadowLightPositionZ = Math.sin(deg(shadowLightAngle)) * shadowLightRadius;
    shadowLight1.position.set(shadowLightPositionX, 3, shadowLightPositionZ);


    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
  
main();