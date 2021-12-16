let scene, camera, renderer, orbitControls;

const render = () => {
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('WebGL-output').appendChild(renderer.domElement);

    /* OrbitControls
    --------------------------------------*/
    orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = false;

    /* Mesh
    --------------------------------------*/
    const vertices = 100000; // Number of vertices
    const axes = 3; // The number of axes
    const geometory = new THREE.BufferGeometry();
    const positions = new Float32Array(vertices * axes);
    const colors = new Float32Array(vertices * axes);
    const distance = 50;
    for(let i = 0, len = positions.length; i < len; i+=3) {
        let halfDistance = distance / 2;
        let x = distance * Math.random() - halfDistance;
        let y = distance * Math.random() - halfDistance;
        let z = distance * Math.random() - halfDistance;
        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        let r = (Math.abs(x) / (halfDistance));
        let g = (Math.abs(y) / (halfDistance));
        let b = (Math.abs(z) / (halfDistance));
        colors[i] = r;
        colors[i + 1] = g;
        colors[i + 2] = b;
    }
    geometory.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometory.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({size: 0.2, vertexColors: true});
    const points = new THREE.Points(geometory, pointsMaterial);
	scene.add( points );

    /* OrbitControls
    -------------------------------------------------------------*/
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.2;

    /* resize
    -------------------------------------------------------------*/
    window.addEventListener('resize', onResize);

    /* rendering start
    -------------------------------------------------------------*/
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    render();

}

window.onload = init;