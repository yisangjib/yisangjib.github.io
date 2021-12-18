var container,
    renderer,
    scene,
    camera;

var rowLength = 32,
    colLength = 16,
    gridSize = rowLength * colLength,
    grid = [];

function initThree() {
    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    scene = new THREE.Scene();

    camera.position.z = 30;

    container.appendChild(renderer.domElement);
}

function createLights() {
    var light;

    light = new THREE.PointLight(0x888888, 0.25);
    light.position.set(0, 0, 0);
    scene.add(light);

    light = new THREE.PointLight(0xffffff, 0.25);
    light.position.set(0, 12, -12);
    scene.add(light);

    TweenMax.to(light.position, 12, {y:-12, repeat:-1, yoyo:true, ease:Linear.easeNone});
}

function createObjects() {
    var cubeMaterial = new THREE.MeshPhongMaterial({emissive:0x000000, specular:0x4682b4, shininess:512}),
        cubeGeometry = new THREE.BoxGeometry(1, 1, 1),
        row,
        cube;

    var spacing = 0.0,
        startX = (1 + spacing) * rowLength * -0.5 + 0.5,
        startY = (1 + spacing) * colLength * -0.5 + 0.5;

    for (var i = 0; i < rowLength; i++) {
        row = [];

        for (var j = 0; j < colLength; j++) {
            cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = startX + i + spacing * i;
            cube.position.y = startY + j + spacing * j;
            cube.locked = false;
            cube.gridIndex = {x:i, y:j};

            scene.add(cube);
            row.push(cube);
        }

        grid.push(row);
    }

    setInterval(swap, 250);
    setInterval(turn, 250);
    setInterval(sink, 100);
    setInterval(rise, 100);
}

function swap() {
    var cubeA = getRandomCube(),
        cubeB;

    if (cubeA) {
        cubeB = getRandomAdjCube(cubeA.gridIndex);
    }

    if (cubeB) {
        cubeA.locked = true;
        cubeB.locked = true;

        var tl = new TimelineMax({onComplete:function(a, b) {
            grid[a.gridIndex.x][a.gridIndex.y] = b;
            grid[b.gridIndex.x][b.gridIndex.y] = a;

            var t = a.gridIndex;
            a.gridIndex = b.gridIndex;
            b.gridIndex = t;

            a.locked = false;
            b.locked = false;
        }, onCompleteParams:[cubeA, cubeB]});

        var t = 1;

        tl.append(TweenMax.to(cubeA.position, t, {z:1}));
        tl.insert(TweenMax.to(cubeB.position, t, {x:cubeA.position.x, y:cubeA.position.y}), t);
        tl.insert(TweenMax.to(cubeA.position, t, {x:cubeB.position.x, y:cubeB.position.y}), t);
        tl.append(TweenMax.to(cubeA.position, t, {z:0}));
    }
}

function turn() {
    var cube = getRandomCube();

    if (cube) {
        cube.locked = true;

        var tl = new TimelineMax({onComplete:function(c) {
            c.locked = false;
            c.rotation.set(0, 0, 0);
        }, onCompleteParams:[cube]});

        var t = 1,
            roll = Math.random();

        tl.append(TweenMax.to(cube.position, t, {z:1}));
        if      (roll < 0.33)   tl.append(TweenMax.to(cube.rotation, t, {x:Math.PI * 0.5}));
        else if (roll < 0.66)   tl.append(TweenMax.to(cube.rotation, t, {y:Math.PI * 0.5}));
        else                    tl.append(TweenMax.to(cube.rotation, t, {z:Math.PI * 0.5}));
        tl.append(TweenMax.to(cube.position, t, {z:0}));
    }
}

function sink() {
    var cube = getRandomCube();

    if (cube) {
        cube.locked = true;

        var tl = new TimelineMax({onComplete:function(c) {
            c.locked = false;
        }, onCompleteParams:[cube]});

        tl.append(TweenMax.to(cube.position, 1, {z:-0.5}));
        tl.append(TweenMax.to(cube.position, 1, {z:0, delay: 2 + Math.random() * 5}));
    }
}

function rise() {
    var cube = getRandomCube();

    if (cube) {
        cube.locked = true;

        var tl = new TimelineMax({onComplete:function(c) {
            c.locked = false;
        }, onCompleteParams:[cube]});

        tl.append(TweenMax.to(cube.position, 1, {z:0.5}));
        tl.append(TweenMax.to(cube.position, 1, {z:0, delay: 2 + Math.random() * 5}));
    }
}

function getRandomCube() {
    var x, y, cube,
        tries = 0;

    do {
        x = Math.floor(Math.random() * rowLength);
        y = Math.floor(Math.random() * colLength);
        cube = grid[x][y];

        tries++;
    }
    while (cube.locked === true && tries < gridSize);

    return cube;
}

function getRandomAdjCube(index) {
    var unlocked = [],
        cube;
    if (index.y + 1 < colLength) {
        cube = grid[index.x][index.y + 1];
        if (cube && cube.locked === false) {
            unlocked.push(cube);
        }
    }
    if (index.x + 1 < rowLength) {
        cube = grid[index.x + 1][index.y];
        if (cube && cube.locked === false) {
            unlocked.push(cube);
        }
    }
    if (index.y - 1 >= 0) {
        cube = grid[index.x][index.y - 1];
        if (cube && cube.locked === false) {
            unlocked.push(cube);
        }
    }
    if (index.x - 1 >= 0) {
        cube = grid[index.x - 1][index.y];
        if (cube && cube.locked === false) {
            unlocked.push(cube);
        }
    }

    if (unlocked.length > 0) {
        return unlocked[Math.floor(Math.random() * unlocked.length)];
    }

    return null;
}

function draw() {
    renderer.render(scene, camera);
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

window.onload = function() {
    initThree();
    createObjects();
    createLights();

    window.addEventListener('resize', resizeHandler);
    requestAnimationFrame(loop);
};

function resizeHandler() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}